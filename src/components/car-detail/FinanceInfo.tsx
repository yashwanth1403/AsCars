import { formatPrice } from "@/data/cars";
import { WHATSAPP_NUMBER } from "@/config/business";
import { BadgeIndianRupee, Percent } from "lucide-react";

interface FinanceInfoProps {
  carPrice: number;
  financePercent?: number | null;
  carName?: string;
}

export const FinanceInfo = ({ carPrice, financePercent, carName }: FinanceInfoProps) => {
  const hasFinance = financePercent != null && financePercent > 0;
  const loanAmount = hasFinance ? Math.round((carPrice * financePercent) / 100) : 0;
  const downPayment = hasFinance ? carPrice - loanAmount : carPrice;

  const waMessage = encodeURIComponent(
    `Hi, I'm interested in finance for ${carName || "a car"} (${hasFinance ? `${financePercent}% finance` : "loan options"}). Please share details.`,
  );

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card p-5 shadow-sm sm:p-6">
      <h2 className="mb-6 flex items-center gap-2 text-xl font-bold text-foreground">
        <span className="inline-block h-6 w-1.5 rounded-full bg-primary" />
        <Percent className="mb-0.5 text-primary" size={20} />
        Finance Options
      </h2>

      {hasFinance ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-5 md:items-center">
          <div className="md:col-span-3 space-y-4">
            <div className="rounded-2xl border-2 border-secondary/30 bg-secondary/5 p-5">
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Finance available up to
              </p>
              <p className="mt-1 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
                {financePercent}%
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Bank approval subject to profile and documentation.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="rounded-xl border bg-muted/30 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Est. loan amount
                </p>
                <p className="mt-1 text-xl font-bold text-primary">{formatPrice(loanAmount)}</p>
              </div>
              <div className="rounded-xl border bg-muted/30 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Est. down payment
                </p>
                <p className="mt-1 text-xl font-bold text-foreground">{formatPrice(downPayment)}</p>
              </div>
            </div>
          </div>

          <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-primary/20 bg-primary/5 p-6 text-center md:col-span-2">
            <BadgeIndianRupee className="mb-3 h-10 w-10 text-secondary" />
            <p className="text-sm font-bold uppercase tracking-widest text-primary">
              Easy approval
            </p>
            <p className="mt-2 max-w-[220px] text-xs leading-relaxed text-muted-foreground">
              Get quick finance assistance from our team for this vehicle.
            </p>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex h-11 items-center justify-center rounded-xl bg-secondary px-6 text-sm font-bold text-secondary-foreground transition hover:bg-secondary-dark"
            >
              Check Finance Eligibility
            </a>
          </div>
        </div>
      ) : (
        <div className="rounded-xl border border-dashed p-8 text-center">
          <p className="font-semibold text-foreground">Finance details on request</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Contact our team for custom finance options on this car.
          </p>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex h-11 items-center justify-center rounded-xl bg-secondary px-6 text-sm font-bold text-secondary-foreground"
          >
            Ask about finance
          </a>
        </div>
      )}
    </div>
  );
};
