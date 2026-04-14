import React from "react";
import { PhoneCall, MapPin } from "lucide-react";
import {
  BUSINESS_ADDRESS,
  MAPS_URL,
  PHONE_DISPLAY,
  PHONE_E164,
  WHATSAPP_NUMBER,
} from "@/config/business";

export const ContactCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
      {/* Phone Card */}
      <a
        href={`tel:${PHONE_E164}`}
        className="group bg-card border border-border rounded-xl p-8 flex flex-col items-center text-center shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
      >
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
          <PhoneCall size={28} className="text-primary" />
        </div>
        <h3 className="text-xl font-bold text-foreground mb-2">Phone Number</h3>
        <p className="text-muted-foreground font-medium text-lg">
          {PHONE_DISPLAY}
        </p>
      </a>

      {/* WhatsApp Card */}
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}`}
        target="_blank"
        rel="noopener noreferrer"
        className="group bg-card border border-border rounded-xl p-8 flex flex-col items-center text-center shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
      >
        <div className="w-16 h-16 bg-[#25D366]/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#25D366]/20 transition-all duration-300">
          <img src="/whatsapp-color-svgrepo-com.svg" alt="" className="h-7 w-7" aria-hidden />
        </div>
        <h3 className="text-xl font-bold text-foreground mb-2">WhatsApp</h3>
        <p className="text-muted-foreground font-medium text-lg">
          Chat on WhatsApp
        </p>
      </a>

      {/* Address Card */}
      <a
        href={MAPS_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="group bg-card border border-border rounded-xl p-8 flex flex-col items-center text-center shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer"
      >
        <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-secondary/30 transition-all duration-300">
          <MapPin size={28} className="text-secondary-foreground" />
        </div>
        <h3 className="text-xl font-bold text-foreground mb-2">
          Showroom Address
        </h3>
        <p className="text-muted-foreground font-medium text-lg">{BUSINESS_ADDRESS}</p>
      </a>
    </div>
  );
};
