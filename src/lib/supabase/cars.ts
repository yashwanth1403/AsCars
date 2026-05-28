import { supabase } from "@/lib/supabase/client";
import type {
  CarMediaRecord,
  CarRecord,
  CarWithRelations,
  OfferRecord,
  InventoryStatus,
} from "@/types/domain";

type CarInsertInput = Omit<CarRecord, "id" | "createdat" | "updatedat">;
type CarUpdateInput = Partial<CarInsertInput>;
type OfferInsertInput = Omit<OfferRecord, "id" | "createdat" | "updatedat">;
type OfferUpdateInput = Partial<OfferInsertInput>;

const withRelations = `
  *,
  media:Carmedia(*),
  offers:Offer(*)
`;

export const fetchPublicCars = async (): Promise<CarWithRelations[]> => {
  const { data, error } = await supabase
    .from("Car")
    .select(withRelations)
    .eq("ispublished", true)
    .eq("status", "available")
    .order("createdat", { ascending: false });

  if (error) throw error;
  return (data ?? []) as CarWithRelations[];
};

export const fetchAdminCars = async (): Promise<CarWithRelations[]> => {
  const { data, error } = await supabase
    .from("Car")
    .select(withRelations)
    .order("createdat", { ascending: false });
  if (error) throw error;
  return (data ?? []) as CarWithRelations[];
};

export const fetchCarBySlugOrId = async (slug: string): Promise<CarWithRelations | null> => {
  const cars = await fetchPublicCars();
  return (
    cars.find((c) => {
      const generatedSlug = `${c.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${c.year}`;
      const simpleSlug = c.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      return c.id === slug || generatedSlug === slug || simpleSlug === slug;
    }) ?? null
  );
};

export const createCar = async (input: CarInsertInput): Promise<CarRecord> => {
  const { data, error } = await supabase.from("Car").insert(input).select("*").single();
  if (error) throw error;
  return data as CarRecord;
};

export const updateCar = async (id: string, input: CarUpdateInput): Promise<CarRecord> => {
  const { data, error } = await supabase
    .from("Car")
    .update(input)
    .eq("id", id)
    .select("*")
    .single();
  if (error) throw error;
  return data as CarRecord;
};

export const deleteCar = async (id: string): Promise<void> => {
  const { error } = await supabase.from("Car").delete().eq("id", id);
  if (error) throw error;
};

export const updateCarStatus = async (id: string, status: InventoryStatus): Promise<CarRecord> => {
  return updateCar(id, { status });
};

export const createOffer = async (input: OfferInsertInput): Promise<OfferRecord> => {
  const { data, error } = await supabase.from("Offer").insert(input).select("*").single();
  if (error) throw error;
  return data as OfferRecord;
};

export const updateOffer = async (id: string, input: OfferUpdateInput): Promise<OfferRecord> => {
  const { data, error } = await supabase
    .from("Offer")
    .update(input)
    .eq("id", id)
    .select("*")
    .single();
  if (error) throw error;
  return data as OfferRecord;
};

export const deleteOffer = async (id: string): Promise<void> => {
  const { error } = await supabase.from("Offer").delete().eq("id", id);
  if (error) throw error;
};

export const upsertCarMedia = async (
  media: Omit<CarMediaRecord, "id" | "createdat">,
): Promise<CarMediaRecord> => {
  const { data, error } = await supabase.from("Carmedia").insert(media).select("*").single();
  if (error) throw error;
  return data as CarMediaRecord;
};

export const deleteCarMediaByCarId = async (carid: string): Promise<void> => {
  const { error } = await supabase.from("Carmedia").delete().eq("carid", carid);
  if (error) throw error;
};

export const insertCarMediaBatch = async (
  media: Array<Omit<CarMediaRecord, "id" | "createdat">>,
): Promise<void> => {
  if (media.length === 0) return;
  const { error } = await supabase.from("Carmedia").insert(media);
  if (error) throw error;
};
