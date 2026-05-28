import { Link, useParams } from "react-router-dom";
import SiteLayout from "@/components/SiteLayout";
import Container from "@/components/Container";
import { CarGallery } from "@/components/car-detail/CarGallery";
import { CarOverview } from "@/components/car-detail/CarOverview";
import { CarSpecs } from "@/components/car-detail/CarSpecs";
import { CarDescription } from "@/components/car-detail/CarDescription";
import { FinanceInfo } from "@/components/car-detail/FinanceInfo";
import { resolveActiveOffer } from "@/lib/offers";
import { SimilarCars } from "@/components/car-detail/SimilarCars";
import { StickyContactBar } from "@/components/car-detail/StickyContactBar";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchCarBySlugOrId } from "@/lib/supabase/cars";
import PageLoader from "@/components/loaders/PageLoader";

const CarDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const carQuery = useQuery({
    queryKey: ["car-detail", slug],
    queryFn: () => fetchCarBySlugOrId(slug || ""),
    enabled: !!slug,
  });

  const activeCar = carQuery.data
    ? (() => {
        const data = carQuery.data;
        const offer = resolveActiveOffer(data.price, data.offers);
        return {
        id: data.id,
        name: data.name,
        brand: data.brand,
        model: data.name,
        year: data.year,
        km: data.km,
        fuel: data.fuel,
        transmission: data.transmission,
        price: data.price,
        financePercent: data.financepercent,
        offer,
        owner: "-",
        insurance: "-",
        images: data.media
          .filter((m) => m.mediatype === "image")
          .sort((a, b) => a.sortorder - b.sortorder)
          .map((m) => m.publicurl),
        description: data.description || "No description available for this car.",
      };
      })()
    : null;

  // Reset scroll position on mounted/params changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  return (
    <SiteLayout>
      {carQuery.isLoading ? (
        <PageLoader label="Loading car details..." />
      ) : !activeCar ? (
        <div className="min-h-[50vh] flex flex-col items-center justify-center gap-3 px-4">
          <h1 className="text-2xl font-bold">Car not found</h1>
          <p className="text-muted-foreground text-sm">
            This car may be sold or unpublished.
          </p>
          <Link to="/cars" className="text-primary font-semibold hover:underline">
            Back to all cars
          </Link>
        </div>
      ) : (
        <div className="bg-muted/20 min-h-[calc(100vh-64px)] pb-32 lg:pb-16 pt-4 sm:pt-6">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
            {/* Left Column: Gallery & Details */}
            <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-6 lg:gap-8">
              {/* Image Gallery */}
              <CarGallery images={activeCar.images} />

              {/* Mobile overview */}
              <div className="lg:hidden">
                <CarOverview car={activeCar} />
              </div>

              {/* Main Information Blocks */}
              <CarSpecs car={activeCar} />
              <CarDescription description={activeCar.description} />
              <FinanceInfo
                carPrice={activeCar.offer?.offerPrice ?? activeCar.price}
                financePercent={activeCar.financePercent}
                carName={activeCar.name}
              />
            </div>

            {/* Right Column: Sticky Sidebar */}
            <div className="hidden lg:block lg:col-span-5 xl:col-span-4">
              <div className="sticky top-24">
                <CarOverview car={activeCar} />
              </div>
            </div>
          </div>

          {/* Similar Cars Section */}
          <div className="mt-10 lg:mt-16">
            <SimilarCars />
          </div>
        </Container>

        {/* Mobile Sticky Contact Bar */}
        <StickyContactBar />
        </div>
      )}
    </SiteLayout>
  );
};

export default CarDetail;
