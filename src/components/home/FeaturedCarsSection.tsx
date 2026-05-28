import { Link } from "react-router-dom";
import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { WHATSAPP_NUMBER } from "@/config/business";
import { formatPrice } from "@/data/cars";
import { useQuery } from "@tanstack/react-query";
import { fetchPublicCars } from "@/lib/supabase/cars";
import { toCarCard } from "@/lib/supabase/mappers";
import PageLoader from "@/components/loaders/PageLoader";
import { OfferPricing, OfferRibbon } from "@/components/offers/OfferDisplay";

const FeaturedCarsSection = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["featured-cars"],
    queryFn: fetchPublicCars,
  });
  const cars = (data ?? []).map(toCarCard).slice(0, 4);

  return (
    <section className="py-12 sm:py-16">
      <Container className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold sm:text-3xl">Featured Cars</h2>
          <p className="text-muted-foreground">
            Hand-picked deals ready for you
          </p>
        </div>

        {isLoading ? (
          <PageLoader label="Loading featured cars..." />
        ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cars.map((car) => (
            <Card key={car.id} className="overflow-hidden">
              <AspectRatio ratio={16 / 10}>
                <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-muted">
                  <img
                    src={car.image}
                    alt={car.name}
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  {car.offer && <OfferRibbon offer={car.offer} />}
                </div>
              </AspectRatio>
              <CardContent className="space-y-3 p-4">
                <div>
                  <h3 className="text-base font-semibold">{car.name}</h3>
                  <p className="text-xs text-muted-foreground">
                    {car.year} · {car.km.toLocaleString("en-IN")} km · {car.fuel} · {car.transmission}
                  </p>
                </div>
                {car.offer ? (
                  <OfferPricing offer={car.offer} size="sm" />
                ) : (
                  <p className="text-xl font-extrabold text-primary">
                    {formatPrice(car.price)}
                  </p>
                )}
                <div className="flex gap-2">
                  <Button
                    asChild
                    variant="default"
                    size="sm"
                    className="flex-1 text-xs"
                  >
                    <Link to={`/cars/${car.id}`}>View {car.brand || car.name.split(' ')[0]}</Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="flex-1 text-xs border-[#25D366] bg-[#25D366] hover:bg-[#20bd5a] hover:border-[#20bd5a] text-white gap-1.5"
                  >
                    <a
                      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hi, I'm interested in ${car.name} (${car.year})`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5"
                    >
                      <img src="/whatsapp-color-svgrepo-com.svg" alt="" className="h-4 w-4 invert brightness-0" aria-hidden />
                      WhatsApp
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        )}

        <div className="text-center pt-2">
          <Button asChild variant="secondary" size="lg">
            <Link to="/cars">View All Cars →</Link>
          </Button>
        </div>
      </Container>
    </section>
  );
};

export default FeaturedCarsSection;
