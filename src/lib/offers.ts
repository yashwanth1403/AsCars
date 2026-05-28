export interface OfferStats {
  title: string;
  offerPrice: number;
  listPrice: number;
  savings: number;
  discountPercent: number;
}

type RawOffer = {
  title: string;
  offerprice: number | null;
  isactive: boolean;
};

export const resolveActiveOffer = (
  listPrice: number,
  offers: RawOffer[] = [],
): OfferStats | null => {
  const raw = offers.find(
    (o) => o.isactive && o.offerprice != null && o.offerprice > 0 && o.offerprice < listPrice,
  );
  if (!raw || raw.offerprice == null) return null;

  const savings = listPrice - raw.offerprice;
  const discountPercent = Math.round((savings / listPrice) * 100);

  return {
    title: raw.title,
    offerPrice: raw.offerprice,
    listPrice,
    savings,
    discountPercent: Math.max(1, discountPercent),
  };
};

export const formatSavings = (amount: number): string => {
  if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(2).replace(/\.?0+$/, "")}L`;
  }
  return `₹${amount.toLocaleString("en-IN")}`;
};
