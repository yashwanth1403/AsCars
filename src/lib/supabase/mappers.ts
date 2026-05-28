import type { CarWithRelations } from "@/types/domain";
import type { Car } from "@/data/cars";
import type { AdminCar } from "@/data/admin-cars";
import { resolveActiveOffer } from "@/lib/offers";

export const toCarCard = (car: CarWithRelations): Car => {
  const coverImage = car.media.find((m) => m.iscover && m.mediatype === "image");
  const fallbackImage = car.media.find((m) => m.mediatype === "image");
  const offer = resolveActiveOffer(car.price, car.offers);
  return {
    id: car.id,
    name: car.name,
    brand: car.brand,
    year: car.year,
    km: car.km,
    fuel: car.fuel,
    transmission: car.transmission,
    price: car.price,
    financePercent: car.financepercent ?? null,
    offer,
    image: coverImage?.publicurl || fallbackImage?.publicurl || "",
  };
};

export const toAdminCar = (car: CarWithRelations): AdminCar => {
  const imageList = car.media
    .filter((m) => m.mediatype === "image")
    .sort((a, b) => a.sortorder - b.sortorder)
    .map((m) => m.publicurl);
  const videoList = car.media
    .filter((m) => m.mediatype === "video")
    .sort((a, b) => a.sortorder - b.sortorder)
    .map((m) => m.publicurl);

  return {
    id: car.id,
    name: car.name,
    brand: car.brand,
    year: car.year,
    km: car.km,
    fuel: car.fuel,
    transmission: car.transmission,
    price: car.price,
    financePercent: car.financepercent ?? undefined,
    description: car.description ?? undefined,
    image: imageList[0] || "",
    images: imageList,
    videos: videoList,
    status: car.status === "sold" ? "SoldOut" : "Available",
    offerTitle: car.offers[0]?.title,
    offerPrice: car.offers[0]?.offerprice ?? undefined,
    offerActive: car.offers[0]?.isactive ?? false,
  };
};
