import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import { Phone, MapPin } from "lucide-react";

const PHONE = "+919848015809";
const WHATSAPP = "919848015809";
const MAPS_URL = "https://www.google.com/maps/place/National+Motors+Ameerpet/@17.4312794,78.4472248,17z/data=!3m1!4b1!4m6!3m5!1s0x3bcb90ca2c62b629:0x9193e5bad699b0a0!8m2!3d17.4312743!4d78.4497997!16s%2Fg%2F12hm75vj1!18m1!1e1?entry=ttu&g_ep=EgoyMDI2MDQwOC4wIKXMDSoASAFQAw%3D%3D";

const LocationCTASection = () => {
  return (
    <section className="py-12 sm:py-16">
      <Container className="text-center space-y-6">
        <h2 className="text-2xl font-bold sm:text-3xl">Visit Our Hyderabad Showroom Today</h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          Walk in anytime to explore our latest collection. We're open 7 days a week.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
          <Button asChild size="lg" className="w-full sm:w-auto gap-2">
            <a href={`tel:${PHONE}`}>
              <Phone className="h-4 w-4" /> Call Now
            </a>
          </Button>
          <Button asChild variant="outline" size="lg" className="w-full sm:w-auto gap-2">
            <a href={MAPS_URL} target="_blank" rel="noopener noreferrer">
              <MapPin className="h-4 w-4" /> Get Directions
            </a>
          </Button>
          <Button asChild size="lg" className="w-full sm:w-auto gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white">
            <a href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Hi, I'd like to visit your showroom.")}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
              <img src="/whatsapp-color-svgrepo-com.svg" alt="" className="h-5 w-5 invert brightness-0" aria-hidden />
              WhatsApp
            </a>
          </Button>
        </div>
      </Container>
    </section>
  );
};

export default LocationCTASection;
