import {
  Eye,
  Fuel,
  Settings,
  Calendar,
  Gauge,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Car, formatPrice, formatKm } from "@/data/cars";
import { OfferPricing, OfferRibbon } from "@/components/offers/OfferDisplay";

const WHATSAPP_NUMBER = "919876543210";

interface CarCardProps {
  car: Car;
}

const CarCard = ({ car }: CarCardProps) => {
  const waMessage = encodeURIComponent(
    `Hi, I'm interested in ${car.name} (${car.year})${
      car.offer
        ? ` — special offer at ${formatPrice(car.offer.offerPrice)} (${car.offer.discountPercent}% off)`
        : ` priced at ${formatPrice(car.price)}`
    }. Is it still available?`,
  );
  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`;

  return (
    <div className="bg-card rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden flex flex-col">
      <div className="relative bg-muted h-44 sm:h-48 flex items-center justify-center overflow-hidden">
        {car.image ? (
          <img
            src={car.image}
            alt={car.name}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        ) : (
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <div className="w-16 h-16 rounded-full bg-border flex items-center justify-center">
              <svg
                viewBox="0 0 64 32"
                className="w-10 h-6 fill-muted-foreground opacity-50"
              >
                <path d="M8 24 L12 12 L52 12 L56 24 Z" />
                <circle cx="18" cy="24" r="5" />
                <circle cx="46" cy="24" r="5" />
              </svg>
            </div>
            <span className="text-xs font-medium">{car.brand}</span>
          </div>
        )}

        {car.offer && <OfferRibbon offer={car.offer} />}

        {car.financePercent != null && car.financePercent > 0 && (
          <div className="absolute top-3 left-3 rounded-full bg-secondary px-2.5 py-1 text-xs font-bold text-secondary-foreground shadow-sm">
            {car.financePercent}% Finance
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col gap-3 flex-1">
        {/* Name + Year */}
        <div>
          <h3 className="font-bold text-foreground text-base leading-tight">
            {car.name}
          </h3>
          <p className="text-muted-foreground text-sm mt-0.5">{car.year}</p>
        </div>

        {/* Specs row */}
        <div className="grid grid-cols-2 gap-x-3 gap-y-1.5">
          <SpecItem icon={<Gauge size={13} />} label={formatKm(car.km)} />
          <SpecItem icon={<Fuel size={13} />} label={car.fuel} />
          <SpecItem icon={<Settings size={13} />} label={car.transmission} />
          <SpecItem icon={<Calendar size={13} />} label={String(car.year)} />
        </div>

        {/* Price */}
        <div className="mt-auto pt-2 border-t border-border">
          {car.offer ? (
            <OfferPricing offer={car.offer} size="sm" />
          ) : (
            <>
              <p className="text-2xl font-extrabold text-primary tracking-tight">
                {formatPrice(car.price)}
              </p>
              <p className="text-xs text-muted-foreground">All-inclusive price</p>
            </>
          )}
        </div>

        {/* CTAs */}
        <div className="flex gap-2 mt-1">
          <Link
            to={`/cars/${car.id}`}
            className="flex-1 flex items-center justify-center gap-1.5 bg-primary text-primary-foreground rounded-lg h-11 text-sm font-semibold hover:bg-primary-dark transition-colors"
          >
            <Eye size={15} />
            {car.brand ? `View ${car.brand}` : 'View Details'}
          </Link>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-1.5 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-lg h-11 text-sm font-semibold transition-colors"
          >
            <img src="/whatsapp-color-svgrepo-com.svg" alt="" className="h-4 w-4 invert brightness-0" aria-hidden />
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
};

const SpecItem = ({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) => (
  <div className="flex items-center gap-1.5 text-muted-foreground">
    <span className="shrink-0">{icon}</span>
    <span className="text-xs font-medium truncate">{label}</span>
  </div>
);

export default CarCard;
