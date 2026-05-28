import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import CarRow from "./CarRow";
import type { AdminCar } from "@/data/admin-cars";
import { formatKm, formatPrice } from "@/data/cars";
import StatusBadge from "./StatusBadge";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, RotateCcw, CheckCircle, Car, ImageIcon } from "lucide-react";
import { resolveActiveOffer, formatSavings } from "@/lib/offers";

interface InventoryTableProps {
  cars: AdminCar[];
  onEdit: (car: AdminCar) => void;
  onDelete: (car: AdminCar) => void;
  onToggleStatus: (car: AdminCar) => void;
  loading?: boolean;
}

const InventoryTable = ({
  cars,
  onEdit,
  onDelete,
  onToggleStatus,
  loading,
}: InventoryTableProps) => {
  if (loading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-24 animate-pulse rounded-2xl bg-muted" />
        ))}
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm">
      {/* Desktop table */}
      <div className="hidden lg:block overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40 hover:bg-muted/40">
              <TableHead className="w-24 font-bold">Photo</TableHead>
              <TableHead className="font-bold">Vehicle</TableHead>
              <TableHead className="font-bold">Year</TableHead>
              <TableHead className="font-bold">KM</TableHead>
              <TableHead className="font-bold">Fuel</TableHead>
              <TableHead className="font-bold">Price</TableHead>
              <TableHead className="font-bold">Finance</TableHead>
              <TableHead className="font-bold">Offer</TableHead>
              <TableHead className="font-bold">Status</TableHead>
              <TableHead className="w-36 text-right font-bold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cars.length === 0 ? (
              <TableRow>
                <TableCell colSpan={10} className="h-40 text-center">
                  <EmptyInventory />
                </TableCell>
              </TableRow>
            ) : (
              cars.map((car) => (
                <CarRow
                  key={car.id}
                  car={car}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  onToggleStatus={onToggleStatus}
                />
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Mobile + tablet cards */}
      <div className="space-y-3 p-2 sm:p-3 lg:hidden">
        {cars.length === 0 ? (
          <EmptyInventory />
        ) : (
          cars.map((car) => {
            const isSold = car.status === "SoldOut";
            const mediaCount = (car.images?.length ?? 0) + (car.videos?.length ?? 0);
            const offer =
              car.offerActive && car.offerPrice && car.price > car.offerPrice
                ? resolveActiveOffer(car.price, [
                    {
                      title: car.offerTitle || "Offer",
                      offerprice: car.offerPrice,
                      isactive: true,
                    },
                  ])
                : null;

            return (
              <article
                key={car.id}
                className="overflow-hidden rounded-2xl border border-border/60 bg-background shadow-sm"
              >
                <div className="flex gap-3 p-3">
                  <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-muted sm:h-28 sm:w-28">
                    {car.image ? (
                      <img src={car.image} alt={car.name} className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full items-center justify-center text-muted-foreground">
                        <ImageIcon className="h-7 w-7 opacity-40" />
                      </div>
                    )}
                    {mediaCount > 1 && (
                      <span className="absolute bottom-1.5 left-1.5 rounded bg-black/65 px-1.5 py-0.5 text-[9px] font-bold text-white">
                        +{mediaCount - 1}
                      </span>
                    )}
                  </div>

                  <div className="min-w-0 flex-1 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="line-clamp-2 font-bold leading-snug text-foreground">
                          {car.name}
                        </p>
                        <p className="mt-0.5 text-[11px] text-muted-foreground sm:text-xs">
                          {car.year} · {car.fuel} · {formatKm(car.km)}
                        </p>
                      </div>
                      <StatusBadge status={car.status} className="shrink-0 scale-[0.92] origin-top-right" />
                    </div>

                    <div>
                      {offer ? (
                        <>
                          <p className="text-lg font-extrabold leading-none text-primary">
                            {formatPrice(offer.offerPrice)}
                          </p>
                          <p className="mt-1 text-xs text-muted-foreground">
                            <span className="line-through">{formatPrice(car.price)}</span>
                            <span className="ml-1.5 font-medium text-emerald-700">
                              Save {formatSavings(offer.savings)}
                            </span>
                          </p>
                        </>
                      ) : (
                        <p className="text-lg font-extrabold text-primary">{formatPrice(car.price)}</p>
                      )}
                    </div>

                    {(offer || (car.financePercent != null && car.financePercent > 0)) && (
                      <div className="flex flex-wrap gap-1.5">
                        {offer && (
                          <span className="inline-flex rounded-full bg-secondary/15 px-2 py-0.5 text-[10px] font-bold text-secondary">
                            {offer.discountPercent}% off
                          </span>
                        )}
                        {car.financePercent != null && car.financePercent > 0 && (
                          <span className="inline-flex rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-bold text-accent">
                            {car.financePercent}% finance
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-3 divide-x divide-border/60 border-t border-border/60 bg-muted/20">
                  <Button
                    variant="ghost"
                    className="h-auto min-w-0 flex-col gap-1 rounded-none px-1 py-2.5 text-[10px] font-semibold sm:flex-row sm:gap-1.5 sm:py-3 sm:text-xs"
                    onClick={() => onEdit(car)}
                  >
                    <Pencil className="h-4 w-4 shrink-0" />
                    Edit
                  </Button>
                  <Button
                    variant="ghost"
                    className="h-auto min-w-0 flex-col gap-1 rounded-none px-1 py-2.5 text-[10px] font-semibold text-emerald-700 sm:flex-row sm:gap-1.5 sm:py-3 sm:text-xs"
                    onClick={() => onToggleStatus(car)}
                  >
                    {isSold ? (
                      <>
                        <RotateCcw className="h-4 w-4 shrink-0" />
                        Active
                      </>
                    ) : (
                      <>
                        <CheckCircle className="h-4 w-4 shrink-0" />
                        Sold
                      </>
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    className="h-auto min-w-0 flex-col gap-1 rounded-none px-1 py-2.5 text-[10px] font-semibold text-destructive sm:flex-row sm:gap-1.5 sm:py-3 sm:text-xs"
                    onClick={() => onDelete(car)}
                  >
                    <Trash2 className="h-4 w-4 shrink-0" />
                    Delete
                  </Button>
                </div>
              </article>
            );
          })
        )}
      </div>
    </div>
  );
};

const EmptyInventory = () => (
  <div className="flex flex-col items-center justify-center py-12 text-center">
    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-muted">
      <Car className="h-8 w-8 text-muted-foreground" />
    </div>
    <p className="mt-4 font-semibold text-foreground">No listings yet</p>
    <p className="mt-1 max-w-xs text-sm text-muted-foreground">
      Add your first car to start selling on your showroom website.
    </p>
  </div>
);

export default InventoryTable;
