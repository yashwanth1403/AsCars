import { Sparkles, Tag } from "lucide-react";
import { formatPrice } from "@/data/cars";
import type { OfferStats } from "@/lib/offers";
import { formatSavings } from "@/lib/offers";
import { cn } from "@/lib/utils";

/** Corner ribbon on listing images */
export const OfferRibbon = ({
  offer,
  className,
}: {
  offer: OfferStats;
  className?: string;
}) => (
  <div
    className={cn(
      "pointer-events-none absolute right-0 top-0 z-10 h-24 w-24 overflow-hidden",
      className,
    )}
  >
    <div className="absolute right-[-28px] top-[18px] w-[120px] rotate-45 bg-gradient-to-r from-secondary via-secondary to-secondary-dark py-1.5 text-center shadow-lg">
      <span className="text-[11px] font-extrabold uppercase tracking-wide text-secondary-foreground">
        {offer.discountPercent}% OFF
      </span>
    </div>
  </div>
);

/** Compact pill for cards and tables */
export const OfferPill = ({
  offer,
  className,
}: {
  offer: OfferStats;
  className?: string;
}) => (
  <span
    className={cn(
      "inline-flex items-center gap-1 rounded-full bg-secondary px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-secondary-foreground shadow-sm",
      className,
    )}
  >
    <Tag className="h-3 w-3 shrink-0" />
    {offer.discountPercent}% off
  </span>
);

/** Stacked price block with strikethrough list price */
export const OfferPricing = ({
  offer,
  size = "md",
  className,
}: {
  offer: OfferStats;
  size?: "sm" | "md" | "lg";
  className?: string;
}) => {
  if (size === "lg") {
    return (
      <div className={cn("space-y-1", className)}>
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-primary tracking-tight">
            {formatPrice(offer.offerPrice)}
          </h2>
          <OfferPill offer={offer} />
        </div>
        <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-sm">
          <span className="text-muted-foreground line-through">
            {formatPrice(offer.listPrice)}
          </span>
          <span className="font-semibold text-emerald-700">
            You save {formatSavings(offer.savings)}
          </span>
        </div>
        <p className="text-xs sm:text-sm text-muted-foreground mt-1 sm:mt-1.5 font-medium">
          Fixed price, inclusive of all taxes
        </p>
      </div>
    );
  }

  const priceClass =
    size === "sm" ? "text-xl" : "text-2xl";

  return (
    <div className={cn("space-y-1", className)}>
      <div className="flex flex-wrap items-center gap-2">
        <p
          className={cn(
            "font-extrabold tracking-tight text-primary",
            priceClass,
          )}
        >
          {formatPrice(offer.offerPrice)}
        </p>
        <OfferPill offer={offer} />
      </div>
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
        <span className="text-muted-foreground line-through decoration-destructive/60">
          {formatPrice(offer.listPrice)}
        </span>
        <span className="font-semibold text-emerald-700">
          Save {formatSavings(offer.savings)}
        </span>
      </div>
      <p className="text-xs font-medium text-secondary">{offer.title}</p>
    </div>
  );
};

/** Full-width promotional banner for car detail */
export const OfferBanner = ({
  offer,
  className,
}: {
  offer: OfferStats;
  className?: string;
}) => (
  <div
    className={cn(
      "relative overflow-hidden rounded-2xl border border-secondary/30 bg-gradient-to-br from-secondary/20 via-background to-secondary/10 p-5 shadow-sm sm:p-6",
      className,
    )}
  >
    <div className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full bg-secondary/20 blur-2xl" />
    <div className="pointer-events-none absolute -bottom-8 left-1/3 h-24 w-24 rounded-full bg-primary/5 blur-2xl" />

    <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-xs font-bold uppercase tracking-widest text-secondary-foreground">
            <Sparkles className="h-3.5 w-3.5" />
            Special Offer
          </span>
          <span className="rounded-full border border-secondary/40 bg-background/80 px-3 py-1 text-xs font-bold text-foreground backdrop-blur-sm">
            {offer.discountPercent}% discount
          </span>
        </div>
        <div>
          <h3 className="text-xl font-extrabold tracking-tight text-foreground sm:text-2xl">
            {offer.title}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Limited-time deal on this vehicle — grab it before it&apos;s gone.
          </p>
        </div>
      </div>

      <div className="shrink-0 rounded-2xl border border-secondary/25 bg-background/90 px-5 py-4 text-center shadow-sm backdrop-blur-sm sm:min-w-[200px]">
        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
          Offer price
        </p>
        <p className="mt-1 text-3xl font-extrabold text-primary">
          {formatPrice(offer.offerPrice)}
        </p>
        <p className="mt-1 text-sm text-muted-foreground line-through">
          {formatPrice(offer.listPrice)}
        </p>
        <p className="mt-2 text-sm font-bold text-emerald-700">
          You save {formatSavings(offer.savings)}
        </p>
      </div>
    </div>
  </div>
);
