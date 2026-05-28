import { useMemo, useState } from "react";
import Container from "@/components/Container";
import AdminHeader from "@/components/admin/AdminHeader";
import InventoryTable from "@/components/admin/InventoryTable";
import AdminStatCard from "@/components/admin/AdminStatCard";
import AdminLeadsPanel from "@/components/admin/AdminLeadsPanel";
import AddCarModal, { type AdminCarFormData } from "@/components/admin/AddCarModal";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { type AdminCar } from "@/data/admin-cars";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createCar,
  createOffer,
  deleteCar,
  deleteCarMediaByCarId,
  deleteOffer,
  fetchAdminCars,
  insertCarMediaBatch,
  updateCar,
  updateCarStatus,
  updateOffer,
} from "@/lib/supabase/cars";
import { toAdminCar } from "@/lib/supabase/mappers";
import { fetchLeads, updateLeadStatus } from "@/lib/supabase/leads";
import { uploadCarImages, uploadCarVideos } from "@/lib/supabase/storage";
import { signOutAdmin } from "@/lib/supabase/auth";
import { useToast } from "@/hooks/use-toast";
import type { LeadStatus } from "@/types/domain";
import { Car, CheckCircle2, MessageSquare, Search, XCircle } from "lucide-react";

const Admin = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCar, setEditingCar] = useState<AdminCar | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<AdminCar | null>(null);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("inventory");

  const carsQuery = useQuery({
    queryKey: ["admin-cars"],
    queryFn: fetchAdminCars,
  });

  const leadsQuery = useQuery({
    queryKey: ["admin-leads"],
    queryFn: fetchLeads,
  });

  const cars = useMemo(() => (carsQuery.data ?? []).map(toAdminCar), [carsQuery.data]);

  const filteredCars = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return cars;
    return cars.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.brand.toLowerCase().includes(q) ||
        String(c.year).includes(q),
    );
  }, [cars, search]);

  const invalidateAdmin = async () => {
    await queryClient.invalidateQueries({ queryKey: ["admin-cars"] });
    await queryClient.invalidateQueries({ queryKey: ["admin-leads"] });
  };

  const upsertMutation = useMutation({
    mutationFn: async ({ data, id }: { data: AdminCarFormData; id?: string }) => {
      const payload = {
        name: data.name,
        brand: data.brand,
        year: data.year,
        km: data.km,
        fuel: data.fuel,
        transmission: data.transmission,
        price: data.price,
        emi: null,
        financepercent: data.financePercent ?? null,
        description: data.description ?? null,
        status: (data.status === "SoldOut" ? "sold" : "available") as const,
        ispublished: true,
      };

      const car = id ? await updateCar(id, payload) : await createCar(payload);

      await deleteCarMediaByCarId(car.id);
      const imageMedia = (data.images ?? []).map((url, index) => ({
        carid: car.id,
        mediatype: "image" as const,
        storagepath: url,
        publicurl: url,
        sortorder: index,
        iscover: index === 0,
      }));
      const videoMedia = (data.videos ?? []).map((url, index) => ({
        carid: car.id,
        mediatype: "video" as const,
        storagepath: url,
        publicurl: url,
        sortorder: index,
        iscover: false,
      }));
      await insertCarMediaBatch([...imageMedia, ...videoMedia]);

      const offerPayload = {
        carid: car.id,
        title: data.offerTitle || "Offer",
        description: null,
        offerprice: data.offerPrice ?? null,
        discountamount: null,
        startsat: null,
        endsat: null,
        isactive: !!data.offerActive,
      };
      const existingOffer = (carsQuery.data ?? []).find((c) => c.id === car.id)?.offers?.[0];
      if (data.offerActive && data.offerTitle) {
        if (existingOffer) {
          await updateOffer(existingOffer.id, offerPayload);
        } else {
          await createOffer(offerPayload);
        }
      } else if (existingOffer) {
        await deleteOffer(existingOffer.id);
      }
      return car;
    },
    onSuccess: async () => {
      await invalidateAdmin();
      setModalOpen(false);
      setEditingCar(null);
      toast({ title: "Saved", description: "Car listing updated successfully." });
    },
    onError: (error) => {
      toast({
        title: "Save failed",
        description: error instanceof Error ? error.message : "Please try again.",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteCar,
    onSuccess: async () => {
      await invalidateAdmin();
      toast({ title: "Deleted", description: "Car listing removed." });
    },
  });

  const statusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: "available" | "sold" }) =>
      updateCarStatus(id, status),
    onSuccess: async () => {
      await invalidateAdmin();
      toast({ title: "Status updated" });
    },
  });

  const leadStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: LeadStatus }) => updateLeadStatus(id, status),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["admin-leads"] });
    },
  });

  const handleAddCar = () => {
    setEditingCar(null);
    setModalOpen(true);
  };

  const handleEdit = (car: AdminCar) => {
    setEditingCar(car);
    setModalOpen(true);
  };

  const handleModalSubmit = (data: AdminCarFormData, id?: string) => {
    upsertMutation.mutate({ data, id });
  };

  const handleDelete = (car: AdminCar) => setDeleteTarget(car);

  const confirmDelete = () => {
    if (deleteTarget) {
      deleteMutation.mutate(deleteTarget.id);
      setDeleteTarget(null);
    }
  };

  const handleToggleStatus = (car: AdminCar) => {
    const nextStatus = car.status === "SoldOut" ? "available" : "sold";
    statusMutation.mutate({ id: car.id, status: nextStatus });
  };

  const handleSignOut = async () => {
    await signOutAdmin();
    window.location.href = "/admin/login";
  };

  const totalCars = cars.length;
  const availableCars = cars.filter((car) => car.status === "Available").length;
  const soldOutCars = totalCars - availableCars;
  const newLeads = (leadsQuery.data ?? []).filter((l) => l.status === "new").length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-muted/80 via-background to-background">
      <Container className="space-y-6 py-6 sm:py-8">
        <AdminHeader onAddCar={handleAddCar} onSignOut={handleSignOut} />

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <AdminStatCard label="Total Listings" value={totalCars} icon={Car} />
          <AdminStatCard label="Available" value={availableCars} icon={CheckCircle2} accent="success" />
          <AdminStatCard label="Sold Out" value={soldOutCars} icon={XCircle} accent="danger" />
          <AdminStatCard label="New Leads" value={newLeads} icon={MessageSquare} accent="gold" />
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid h-12 w-full grid-cols-2 rounded-2xl bg-muted/60 p-1 sm:w-auto sm:inline-flex">
            <TabsTrigger value="inventory" className="rounded-xl font-semibold">
              Inventory
            </TabsTrigger>
            <TabsTrigger value="leads" className="rounded-xl font-semibold">
              Leads
              {newLeads > 0 && (
                <span className="ml-2 rounded-full bg-secondary px-2 py-0.5 text-[10px] font-bold text-secondary-foreground">
                  {newLeads}
                </span>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="inventory" className="mt-0 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, brand, or year..."
                className="h-11 rounded-xl border-border/60 bg-card pl-10 shadow-sm"
              />
            </div>
            <InventoryTable
              cars={filteredCars}
              loading={carsQuery.isLoading}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onToggleStatus={handleToggleStatus}
            />
          </TabsContent>

          <TabsContent value="leads" className="mt-0">
            <AdminLeadsPanel
              leads={(leadsQuery.data ?? []).slice(0, 50)}
              loading={leadsQuery.isLoading}
              onStatusChange={(id, status) => leadStatusMutation.mutate({ id, status })}
            />
          </TabsContent>
        </Tabs>
      </Container>

      <AddCarModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        initialCar={editingCar}
        onSubmit={handleModalSubmit}
        onUploadImage={async (files) => {
          const uploaded = await uploadCarImages(files);
          return uploaded.map((item) => item.publicUrl);
        }}
        onUploadVideo={async (files) => {
          const uploaded = await uploadCarVideos(files);
          return uploaded.map((item) => item.publicUrl);
        }}
        saving={upsertMutation.isPending}
      />

      <AlertDialog open={!!deleteTarget} onOpenChange={() => setDeleteTarget(null)}>
        <AlertDialogContent className="rounded-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this listing?</AlertDialogTitle>
            <AlertDialogDescription>
              {deleteTarget
                ? `"${deleteTarget.name}" will be permanently removed from your inventory.`
                : ""}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-xl">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="rounded-xl bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Admin;
