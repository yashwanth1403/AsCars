import { Pencil, Trash2, CheckCircle, RotateCcw } from "lucide-react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import StatusBadge from "./StatusBadge";
import { formatPrice, formatKm } from "@/data/cars";
import type { AdminCar } from "@/data/admin-cars";
import { resolveActiveOffer } from "@/lib/offers";

interface CarRowProps {
  car: AdminCar;
  onEdit: (car: AdminCar) => void;
  onDelete: (car: AdminCar) => void;
  onToggleStatus: (car: AdminCar) => void;
}

const CarRow = ({ car, onEdit, onDelete, onToggleStatus }: CarRowProps) => {
  const isSold = car.status === "SoldOut";
  const offerPreview =
    car.offerActive && car.offerTitle && car.offerPrice
      ? resolveActiveOffer(car.price, [
          { title: car.offerTitle, offerprice: car.offerPrice, isactive: true },
        ])
      : null;

  return (
    <TableRow className="group transition-colors hover:bg-muted/30">
      <TableCell>
        <div className="h-14 w-20 shrink-0 overflow-hidden rounded-xl bg-muted ring-1 ring-border/50 transition group-hover:ring-primary/20">
          {car.image ? (
            <img src={car.image} alt={car.name} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-[10px] text-muted-foreground">
              No photo
            </div>
          )}
        </div>
      </TableCell>
      <TableCell>
        <p className="font-semibold text-foreground">{car.name}</p>
        <p className="text-xs text-muted-foreground">{car.brand}</p>
      </TableCell>
      <TableCell className="font-medium">{car.year}</TableCell>
      <TableCell className="text-muted-foreground">{formatKm(car.km)}</TableCell>
      <TableCell>{car.fuel}</TableCell>
      <TableCell className="font-bold text-primary">{formatPrice(car.price)}</TableCell>
      <TableCell>
        {car.financePercent != null && car.financePercent > 0 ? (
          <span className="rounded-full bg-accent/10 px-2 py-0.5 text-xs font-semibold text-accent">
            {car.financePercent}%
          </span>
        ) : (
          <span className="text-muted-foreground">—</span>
        )}
      </TableCell>
      <TableCell>
        {offerPreview ? (
          <div className="space-y-0.5">
            <span className="inline-flex rounded-full bg-secondary/15 px-2 py-0.5 text-xs font-bold text-secondary">
              {offerPreview.discountPercent}% off
            </span>
            <p className="text-xs font-medium text-foreground line-clamp-1">
              {offerPreview.title}
            </p>
          </div>
        ) : (
          <span className="text-muted-foreground">—</span>
        )}
      </TableCell>
      <TableCell>
        <StatusBadge status={car.status} />
      </TableCell>
      <TableCell>
        <TooltipProvider delayDuration={200}>
          <div className="flex items-center justify-end gap-0.5">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 rounded-xl opacity-70 transition group-hover:opacity-100"
                  onClick={() => onEdit(car)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Edit listing</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 rounded-xl text-emerald-600 opacity-70 transition group-hover:opacity-100 hover:bg-emerald-500/10"
                  onClick={() => onToggleStatus(car)}
                >
                  {isSold ? (
                    <RotateCcw className="h-4 w-4" />
                  ) : (
                    <CheckCircle className="h-4 w-4" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>{isSold ? "Mark Available" : "Mark Sold Out"}</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 rounded-xl text-destructive opacity-70 transition group-hover:opacity-100 hover:bg-destructive/10"
                  onClick={() => onDelete(car)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Delete</TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
      </TableCell>
    </TableRow>
  );
};

export default CarRow;
