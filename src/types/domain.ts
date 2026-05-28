export type InventoryStatus = "available" | "sold";
export type FuelType = "Petrol" | "Diesel" | "CNG" | "Electric";
export type TransmissionType = "Manual" | "Automatic";
export type MediaType = "image" | "video";
export type LeadSource = "contact" | "sell" | "cardetail";
export type LeadStatus =
  | "new"
  | "contacted"
  | "negotiation"
  | "closed_won"
  | "closed_lost";

export interface CarRecord {
  id: string;
  name: string;
  brand: string;
  year: number;
  km: number;
  fuel: FuelType;
  transmission: TransmissionType;
  price: number;
  emi: number | null;
  financepercent: number | null;
  description: string | null;
  status: InventoryStatus;
  ispublished: boolean;
  createdat: string;
  updatedat: string;
}

export interface CarMediaRecord {
  id: string;
  carid: string;
  mediatype: MediaType;
  storagepath: string;
  publicurl: string;
  sortorder: number;
  iscover: boolean;
  createdat: string;
}

export interface OfferRecord {
  id: string;
  carid: string;
  title: string;
  description: string | null;
  offerprice: number | null;
  discountamount: number | null;
  startsat: string | null;
  endsat: string | null;
  isactive: boolean;
  createdat: string;
  updatedat: string;
}

export interface LeadRecord {
  id: string;
  carid: string | null;
  source: LeadSource;
  status: LeadStatus;
  name: string;
  phone: string;
  email: string | null;
  subject: string | null;
  message: string | null;
  payload: Record<string, unknown> | null;
  createdat: string;
  updatedat: string;
}

export interface CarWithRelations extends CarRecord {
  media: CarMediaRecord[];
  offers: OfferRecord[];
}
