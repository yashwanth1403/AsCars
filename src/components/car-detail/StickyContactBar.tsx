import { PhoneCall } from "lucide-react";
import React from "react";
import { PHONE_E164, WHATSAPP_NUMBER } from "@/config/business";

export const StickyContactBar = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 p-3 sm:p-4 border-t border-border shadow-[0_-8px_20px_rgba(0,0,0,0.06)] z-50 lg:hidden pb-safe backdrop-blur-xl bg-background/95">
      <div className="flex gap-2.5 h-12">
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}`}
          className="flex-1 bg-[#25D366] hover:bg-[#20bd5a] text-white flex items-center justify-center gap-2 rounded-lg text-sm font-bold transition-all shadow-sm active:scale-95"
        >
          <img src="/whatsapp-color-svgrepo-com.svg" alt="" className="h-5 w-5 invert brightness-0" aria-hidden />
          WhatsApp
        </a>
        <a
          href={`tel:${PHONE_E164}`}
          className="flex-1 bg-secondary hover:bg-secondary/90 text-secondary-foreground flex items-center justify-center gap-2 rounded-lg text-sm font-bold transition-all shadow-sm active:scale-95"
        >
          <PhoneCall size={20} className="stroke-[2.5]" />
          Call Dealer
        </a>
      </div>
    </div>
  );
};
