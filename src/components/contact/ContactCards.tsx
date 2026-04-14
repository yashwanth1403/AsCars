import React from "react";
import { PhoneCall, MapPin } from "lucide-react";

export const ContactCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
      {/* Phone Card */}
      <a
        href="tel:+919848015809"
        className="group bg-card border border-border rounded-xl p-8 flex flex-col items-center text-center shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
      >
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
          <PhoneCall size={28} className="text-primary" />
        </div>
        <h3 className="text-xl font-bold text-foreground mb-2">Phone Number</h3>
        <p className="text-muted-foreground font-medium text-lg">
          +91 98480 15809
        </p>
      </a>

      {/* WhatsApp Card */}
      <a
        href="https://wa.me/919848015809"
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
        href="https://www.google.com/maps/place/National+Motors+Ameerpet/@17.4312794,78.4472248,17z/data=!3m1!4b1!4m6!3m5!1s0x3bcb90ca2c62b629:0x9193e5bad699b0a0!8m2!3d17.4312743!4d78.4497997!16s%2Fg%2F12hm75vj1!18m1!1e1?entry=ttu&g_ep=EgoyMDI2MDQwOC4wIKXMDSoASAFQAw%3D%3D"
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
        <p className="text-muted-foreground font-medium text-lg whitespace-pre-line">
          Opp. Big Bazar Lane, Ameerpet,
          <br />
          Hyderabad, T.S
        </p>
      </a>
    </div>
  );
};
