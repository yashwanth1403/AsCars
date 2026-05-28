export interface CarOffer {
  title: string;
  offerPrice: number;
  listPrice: number;
  savings: number;
  discountPercent: number;
}

export interface Car {
  id: string;
  name: string;
  brand: string;
  year: number;
  km: number;
  fuel: "Petrol" | "Diesel" | "CNG" | "Electric";
  transmission: "Manual" | "Automatic";
  price: number;
  financePercent: number | null;
  offer: CarOffer | null;
  image: string;
}

export const CARS: Car[] = [
  // Demo data intentionally removed. Cars are loaded from Supabase.
];

export const BRANDS = [
  "All",
  "Hyundai",
  "Maruti",
  "Honda",
  "Toyota",
  "Tata",
  "Kia",
  "Mahindra",
];
export const FUEL_TYPES = ["All", "Petrol", "Diesel", "CNG", "Electric"];
export const TRANSMISSIONS = ["All", "Manual", "Automatic"];
export const YEARS = ["All", "2023", "2022", "2021", "2020", "2019", "2018"];

export function formatPrice(price: number): string {
  if (price >= 100000) {
    return `₹${(price / 100000).toFixed(1)}L`;
  }
  return `₹${price.toLocaleString("en-IN")}`;
}

export function formatKm(km: number): string {
  return `${km.toLocaleString("en-IN")} km`;
}
