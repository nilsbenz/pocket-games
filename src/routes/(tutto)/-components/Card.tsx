import {
  ArrowLeftRightIcon,
  CarIcon,
  CopyIcon,
  Dice2Icon,
  Dice3Icon,
  Dice4Icon,
  Dice5Icon,
  Dice6Icon,
  FlowerIcon,
  HandIcon,
  PartyPopperIcon,
} from "lucide-react";
import { useGameStore } from "../-lib/store";
import type { LucideIcon } from "lucide-react";
import type { CardVariant } from "../-lib/types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const colorClasses: Record<CardVariant, string> = {
  street: "bg-neutral-300 text-neutral-900",
  stop: "bg-rose-400 text-rose-950",
  firework: "bg-purple-400 text-purple-950",
  "plus-minus": "bg-cyan-600 text-cyan-950",
  "times-two": "bg-orange-400 text-orange-950",
  bonus200: "bg-amber-300 text-amber-950",
  bonus300: "bg-amber-300 text-amber-950",
  bonus400: "bg-amber-300 text-amber-950",
  bonus500: "bg-amber-300 text-amber-950",
  bonus600: "bg-amber-300 text-amber-950",
  shamrock: "bg-emerald-400 text-emerald-950",
};

const icons: Record<CardVariant, LucideIcon> = {
  street: CarIcon,
  stop: HandIcon,
  firework: PartyPopperIcon,
  "plus-minus": ArrowLeftRightIcon,
  "times-two": CopyIcon,
  bonus200: Dice2Icon,
  bonus300: Dice3Icon,
  bonus400: Dice4Icon,
  bonus500: Dice5Icon,
  bonus600: Dice6Icon,
  shamrock: FlowerIcon,
};

const values: Record<CardVariant, string> = {
  street: "2000",
  stop: "",
  firework: "",
  "plus-minus": "1000",
  "times-two": "2x",
  bonus200: "200",
  bonus300: "300",
  bonus400: "400",
  bonus500: "500",
  bonus600: "600",
  shamrock: "",
};

export default function Card({ index }: { index: number }) {
  const { cards } = useGameStore();
  const card = cards[index];

  const Icon = icons[card.variant];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className={cn(
            "bg-card text-card-foreground focus-visible:ring-ring/50 relative flex aspect-video w-full items-center justify-center rounded-lg border-4 border-current shadow-md focus:outline-none focus-visible:ring-[3px]",
            colorClasses[card.variant]
          )}
        >
          <div className="absolute top-1 left-1 flex size-9 items-center justify-center opacity-60">
            <p className="text-lg font-semibold tabular-nums">{index + 1}</p>
          </div>
          <div className="flex w-full items-center justify-between px-4">
            <p className="text-xl font-semibold">{values[card.variant]}</p>
            <Icon className="size-16 sm:size-20" strokeWidth={2.25} />
            <p className="text-xl font-semibold">{values[card.variant]}</p>
          </div>
          <p className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xl font-semibold">
            {card.displayName}
          </p>
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{card.displayName}</DialogTitle>
          <DialogDescription>{card.description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Schliessen</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
