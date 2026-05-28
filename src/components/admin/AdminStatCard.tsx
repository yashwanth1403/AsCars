import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface AdminStatCardProps {
  label: string;
  value: number | string;
  icon: LucideIcon;
  accent?: "default" | "success" | "danger" | "gold";
}

const accentStyles = {
  default: "from-primary/15 to-primary/5 text-primary",
  success: "from-emerald-500/15 to-emerald-500/5 text-emerald-600",
  danger: "from-red-500/15 to-red-500/5 text-red-600",
  gold: "from-gold/20 to-gold/5 text-gold-dark",
};

const AdminStatCard = ({ label, value, icon: Icon, accent = "default" }: AdminStatCardProps) => (
  <div className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card p-5 shadow-sm transition hover:shadow-md">
    <div
      className={cn(
        "absolute -right-4 -top-4 h-24 w-24 rounded-full bg-gradient-to-br opacity-60 blur-2xl transition group-hover:opacity-100",
        accentStyles[accent],
      )}
    />
    <div className="relative flex items-start justify-between gap-3">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {label}
        </p>
        <p className="mt-2 text-3xl font-extrabold tracking-tight text-foreground">{value}</p>
      </div>
      <div
        className={cn(
          "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br",
          accentStyles[accent],
        )}
      >
        <Icon className="h-5 w-5" />
      </div>
    </div>
  </div>
);

export default AdminStatCard;
