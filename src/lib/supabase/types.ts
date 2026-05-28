export interface TableRowMap {
  Car: {
    id: string;
    name: string;
    brand: string;
    year: number;
    km: number;
    fuel: "Petrol" | "Diesel" | "CNG" | "Electric";
    transmission: "Manual" | "Automatic";
    price: number;
    emi: number | null;
    financepercent: number | null;
    description: string | null;
    status: "available" | "sold";
    ispublished: boolean;
    createdat: string;
    updatedat: string;
  };
  Carmedia: {
    id: string;
    carid: string;
    mediatype: "image" | "video";
    storagepath: string;
    publicurl: string;
    sortorder: number;
    iscover: boolean;
    createdat: string;
  };
  Offer: {
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
  };
  Lead: {
    id: string;
    carid: string | null;
    source: "contact" | "sell" | "cardetail";
    status: "new" | "contacted" | "negotiation" | "closed_won" | "closed_lost";
    name: string;
    phone: string;
    email: string | null;
    subject: string | null;
    message: string | null;
    payload: Record<string, unknown> | null;
    createdat: string;
    updatedat: string;
  };
}
