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
import bonus200 from "@/assets/tutto/bonus200.jpeg";
import bonus300 from "@/assets/tutto/bonus300.jpeg";
import bonus400 from "@/assets/tutto/bonus400.jpeg";
import bonus500 from "@/assets/tutto/bonus500.jpeg";
import bonus600 from "@/assets/tutto/bonus600.jpeg";
import firework from "@/assets/tutto/firework.jpeg";
import plusMinus from "@/assets/tutto/plusminus.jpeg";
import shamrock from "@/assets/tutto/shamrock.jpeg";
import stop from "@/assets/tutto/stop.jpeg";
import street from "@/assets/tutto/street.jpeg";
import timesTwo from "@/assets/tutto/timestwo.jpeg";
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

const images: Record<CardVariant, string> = {
  street,
  stop,
  firework,
  "plus-minus": plusMinus,
  "times-two": timesTwo,
  bonus200,
  bonus300,
  bonus400,
  bonus500,
  bonus600,
  shamrock,
};

export default function Card({ index }: { index: number }) {
  const { cards } = useGameStore();
  const card = cards[index];

  const Icon = icons[card.variant];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className="bg-card focus-visible:ring-ring/50 relative flex aspect-[1024/733] w-full cursor-pointer items-center justify-center overflow-clip bg-cover bg-center transition-shadow focus:outline-none focus-visible:ring-[3px]"
          style={{ backgroundImage: `url(${images[card.variant]})` }}
        >
          <div className="absolute inset-0 mask-radial-from-transparent mask-radial-from-50% mask-radial-to-black/80 mask-radial-to-75% backdrop-blur-xs" />
          <div className="border-background absolute -inset-[60px] rounded-[25%] border-[96px] blur-[16px]" />
          <p className="absolute bottom-2 left-1/2 -translate-x-1/2 text-3xl font-semibold">
            {card.displayName}
          </p>
          <p className="absolute top-2 right-4 font-semibold tabular-nums opacity-60">
            {index + 1} / {cards.length}
          </p>
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon className="size-6" strokeWidth={2.25} /> {card.displayName}
          </DialogTitle>
          <DialogDescription className="text-left">
            {card.description}
          </DialogDescription>
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
