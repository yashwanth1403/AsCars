import { Car, LogOut, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BUSINESS_NAME } from "@/config/business";

interface AdminHeaderProps {
  onAddCar: () => void;
  onSignOut: () => void;
}

const AdminHeader = ({ onAddCar, onSignOut }: AdminHeaderProps) => {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-primary px-5 py-6 text-primary-foreground shadow-lg sm:px-8 sm:py-8">
      <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gold/10 blur-3xl" />
      <div className="absolute -bottom-8 left-1/3 h-24 w-24 rounded-full bg-white/5 blur-2xl" />

      <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-secondary text-secondary-foreground shadow-md">
            <Car className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-primary-foreground/60">
              {BUSINESS_NAME} · Admin
            </p>
            <h1 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
              Dealer Console
            </h1>
            <p className="mt-1 text-sm text-white/80">
              Manage inventory, media, offers, and customer leads.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:shrink-0">
          <Button
            onClick={onSignOut}
            variant="ghost"
            className="h-11 rounded-xl border border-primary-foreground/20 bg-primary-foreground/5 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
          >
            <LogOut className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:inline">Logout</span>
          </Button>
          <Button
            onClick={onAddCar}
            className="h-11 flex-1 rounded-xl bg-secondary font-bold text-secondary-foreground shadow-md hover:bg-secondary/90 sm:flex-none"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New Car
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
