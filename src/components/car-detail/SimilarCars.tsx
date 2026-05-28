import React from "react";
import CarCard from "@/components/cars/CarCard";
import { useQuery } from "@tanstack/react-query";
import { fetchPublicCars } from "@/lib/supabase/cars";
import { toCarCard } from "@/lib/supabase/mappers";
import PageLoader from "@/components/loaders/PageLoader";

export const SimilarCars = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["similar-cars"],
    queryFn: fetchPublicCars,
  });
  const recommendedCars = (data ?? []).map(toCarCard).slice(0, 4);

  return (
    <div className="py-6 sm:py-8 mt-4 border-t border-border/60">
      <div className="flex justify-between items-center mb-6 sm:mb-8">
        <h2 className="text-2xl font-extrabold text-foreground tracking-tight">
          Similar Cars You May Like
        </h2>
        <button className="text-sm font-bold text-primary hover:underline underline-offset-4 hidden sm:block">
          View All Inventory
        </button>
      </div>

      {isLoading ? (
        <PageLoader label="Loading similar cars..." />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {recommendedCars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      )}

      <button className="w-full mt-6 py-3.5 rounded-xl border-2 border-primary text-primary font-bold hover:bg-primary/5 transition-colors sm:hidden">
        View All Inventory
      </button>
    </div>
  );
};
