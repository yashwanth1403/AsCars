import {
  MapPin,
  Calendar,
  Gauge,
  Fuel,
  Settings,
  Share2,
  Heart,
  PhoneCall,
} from "lucide-react";
import { formatPrice, formatKm } from "@/data/cars";
import React from "react";
import { PHONE_E164, WHATSAPP_NUMBER } from "@/config/business";

interface CarOverviewProps {
  car: {
    name: string;
    price: number;
    year: number;
    km: number;
    fuel: string;
    transmission: string;
    owner: string;
  };
}

export const CarOverview = ({ car }: CarOverviewProps) => {
  const waMessage = encodeURIComponent(
    `Hi, I'm interested in ${car.name} (${car.year}) priced at ${formatPrice(car.price)}. Is it still available?`,
  );
  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`;

  return (
    <div className="bg-card rounded-xl border border-border p-4 sm:p-6 shadow-sm flex flex-col gap-4 sm:gap-6">
      {/* Title & Actions */}
      <div className="flex justify-between items-start gap-3 sm:gap-4">
        <div>
          <h1 className="text-xl sm:text-3xl font-extrabold text-foreground tracking-tight leading-tight">
            {car.name}
          </h1>
          <p className="text-muted-foreground text-xs sm:text-sm mt-1 sm:mt-1.5 flex items-center gap-1 sm:gap-1.5 font-medium">
            <MapPin size={14} className="text-primary" /> Hyderabad
          </p>
        </div>
        <div className="flex gap-2">
          <button className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 text-muted-foreground transition-colors shrink-0">
            <Share2 size={18} />
          </button>
          <button className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 text-muted-foreground transition-colors shrink-0">
            <Heart size={18} />
          </button>
        </div>
      </div>

      {/* Price Section */}
      <div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-primary tracking-tight">
          {formatPrice(car.price)}
        </h2>
        <p className="text-xs sm:text-sm text-muted-foreground mt-1 sm:mt-1.5 font-medium">
          Fixed price, inclusive of all taxes
        </p>
      </div>

      {/* Key Specs Chips */}
      <div className="flex flex-wrap gap-2.5">
        <SpecChip icon={<Calendar size={14} />} label={`${car.year}`} />
        <SpecChip icon={<Gauge size={14} />} label={formatKm(car.km)} />
        <SpecChip icon={<Fuel size={14} />} label={car.fuel} />
        <SpecChip icon={<Settings size={14} />} label={car.transmission} />
        <div className="bg-muted/50 text-foreground px-3 py-1.5 rounded-md text-xs font-semibold flex items-center gap-1.5 border border-border shrink-0">
          {car.owner} Owner
        </div>
      </div>

      {/* Call to Actions (Hidden on mobile; Sticky bar used instead) */}
      <div className="hidden sm:flex gap-3 mt-2 sm:mt-4">
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 bg-[#25D366] hover:bg-[#20bd5a] text-white flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-sm font-bold transition-colors shadow-sm"
        >
          <img src="/whatsapp-color-svgrepo-com.svg" alt="" className="h-5 w-5 invert brightness-0" aria-hidden />
          WhatsApp Dealer
        </a>
        <a
          href={`tel:${PHONE_E164}`}
          className="flex-1 bg-secondary hover:bg-secondary/90 text-secondary-foreground flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-sm font-bold transition-colors shadow-sm"
        >
          <PhoneCall size={18} />
          Call Dealer
        </a>
      </div>
    </div>
  );
};

const SpecChip = ({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) => (
  <div className="bg-muted/50 text-foreground px-3 py-1.5 rounded-md text-xs font-semibold flex items-center gap-1.5 border border-border shrink-0">
    <span className="text-muted-foreground">{icon}</span>
    {label}
  </div>
);
