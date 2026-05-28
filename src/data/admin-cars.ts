/**
 * Admin car inventory – mock data for dashboard.
 * No backend yet; uses local state.
 */

export type CarStatus = "Available" | "SoldOut";

export interface AdminCar {
  id: string;
  name: string;
  brand: string;
  year: number;
  km: number;
  fuel: "Petrol" | "Diesel" | "CNG" | "Electric";
  transmission: "Manual" | "Automatic";
  price: number;
  financePercent?: number | null;
  description?: string;
  image: string;
  images?: string[];
  videos?: string[];
  status: CarStatus;
  offerTitle?: string;
  offerPrice?: number;
  offerActive?: boolean;
}

export const INITIAL_ADMIN_CARS: AdminCar[] = [];
