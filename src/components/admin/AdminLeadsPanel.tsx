import { MessageSquare, Phone } from "lucide-react";
import type { LeadRecord, LeadStatus } from "@/types/domain";
import { cn } from "@/lib/utils";

const STATUS_OPTIONS: { value: LeadStatus; label: string; color: string }[] = [
  { value: "new", label: "New", color: "bg-blue-100 text-blue-800" },
  {
    value: "contacted",
    label: "Contacted",
    color: "bg-violet-100 text-violet-800",
  },
  {
    value: "negotiation",
    label: "Negotiation",
    color: "bg-amber-100 text-amber-800",
  },
  {
    value: "closed_won",
    label: "Won",
    color: "bg-emerald-100 text-emerald-800",
  },
  { value: "closed_lost", label: "Lost", color: "bg-red-100 text-red-800" },
];

interface AdminLeadsPanelProps {
  leads: LeadRecord[];
  loading?: boolean;
  onStatusChange: (id: string, status: LeadStatus) => void;
}

const AdminLeadsPanel = ({
  leads,
  loading,
  onStatusChange,
}: AdminLeadsPanelProps) => {
  if (loading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-20 animate-pulse rounded-2xl bg-muted" />
        ))}
      </div>
    );
  }

  if (leads.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed py-16 text-center">
        <MessageSquare className="h-10 w-10 text-muted-foreground/50" />
        <p className="mt-3 font-semibold text-foreground">No leads yet</p>
        <p className="text-sm text-muted-foreground">
          Inquiries from your site will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {leads.map((lead) => {
        const statusMeta = STATUS_OPTIONS.find((s) => s.value === lead.status);
        return (
          <div
            key={lead.id}
            className="flex flex-col gap-3 rounded-2xl border border-border/60 bg-card p-4 shadow-sm transition hover:border-primary/20 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="min-w-0 flex-1 space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-semibold text-foreground">{lead.name}</p>
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide",
                    statusMeta?.color,
                  )}
                >
                  {lead.source}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Phone className="h-3.5 w-3.5 shrink-0" />
                {lead.phone}
              </div>
              <p className="truncate text-xs text-muted-foreground">
                {lead.subject || lead.message || "No message"}
              </p>
            </div>
            <select
              value={lead.status}
              onChange={(e) =>
                onStatusChange(lead.id, e.target.value as LeadStatus)
              }
              className="h-10 w-full shrink-0 rounded-xl border border-input bg-background px-3 text-sm font-medium sm:w-40"
            >
              {STATUS_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        );
      })}
    </div>
  );
};

export default AdminLeadsPanel;
