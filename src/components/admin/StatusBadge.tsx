import { cn } from "@/lib/utils";
import type { CarStatus } from "@/data/admin-cars";

interface StatusBadgeProps {
  status: CarStatus;
  className?: string;
}

const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const isAvailable = status === "Available";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide",
        isAvailable
          ? "bg-emerald-500/10 text-emerald-700 ring-1 ring-emerald-500/20"
          : "bg-red-500/10 text-red-700 ring-1 ring-red-500/20",
        className,
      )}
    >
      <span
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          isAvailable ? "bg-emerald-500 animate-pulse" : "bg-red-500",
        )}
      />
      {isAvailable ? "Available" : "Sold Out"}
    </span>
  );
};

export default StatusBadge;
