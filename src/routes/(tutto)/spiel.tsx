import { Link, Navigate, createFileRoute } from "@tanstack/react-router";
import {
  BanIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PlusIcon,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import Card from "./-components/Card";
import { useGameStore } from "./-lib/store";
import PlayerDialog from "./-components/PlayerDialog";
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
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout";

export const Route = createFileRoute("/(tutto)/spiel")({
  component: RouteComponent,
});

function RouteComponent() {
  const { players, currentCard, endGame, cards, updateCurrentCard } =
    useGameStore();
  const [direction, setDirection] = useState<"forwards" | "backwards">(
    "forwards"
  );

  if (currentCard === null || cards.length === 0) {
    return <Navigate to="/" replace />;
  }

  if (currentCard >= cards.length) {
    return (
      <Layout>
        <div className="mx-auto flex w-full max-w-md grow flex-col">
          <div className="flex grow items-center justify-center">
            <p className="text-4xl font-medium">Spiel beendet</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Button
              variant="secondary"
              onClick={() => {
                setDirection("forwards");
                setTimeout(() => {
                  updateCurrentCard(currentCard - 1);
                }, 0);
              }}
              disabled={currentCard === 0}
            >
              <ChevronLeftIcon strokeWidth={2.25} />
              Zurück
            </Button>
            <Button asChild>
              <Link to="/" replace>
                <PlusIcon strokeWidth={2.25} />
                Neues Spiel
              </Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="mx-auto flex w-full max-w-md grow flex-col space-y-8">
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={currentCard}
              initial={{ opacity: 0, x: direction === "forwards" ? 160 : 0 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction === "forwards" ? 0 : 160 }}
              transition={{
                duration: 0.4,
                ease: direction === "forwards" ? "backOut" : "backIn",
              }}
            >
              <Card index={currentCard} />
            </motion.div>
          </AnimatePresence>
          <div className="grid grid-cols-2 gap-4">
            <Button
              variant="secondary"
              onClick={() => {
                setDirection("backwards");
                setTimeout(() => {
                  updateCurrentCard(currentCard - 1);
                }, 0);
              }}
              disabled={currentCard === 0}
            >
              <ChevronLeftIcon strokeWidth={2.25} />
              Zurück
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                setDirection("forwards");
                setTimeout(() => {
                  updateCurrentCard(currentCard + 1);
                }, 0);
              }}
            >
              Weiter
              <ChevronRightIcon strokeWidth={2.25} />
            </Button>
          </div>
        </div>
        <div className="flex grow flex-col divide-y-2">
          {players.map((player) => (
            <div key={player.name} className="py-0.5">
              <PlayerDialog player={player} />
            </div>
          ))}
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="secondary">
              <BanIcon strokeWidth={2.25} />
              Spiel beenden
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Spiel beenden?</DialogTitle>
              <DialogDescription className="text-balance">
                Alle Daten gehen verloren. Möchtest du das Spiel wirklich
                beenden?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="secondary">Abbrechen</Button>
              </DialogClose>
              <Button onClick={endGame} variant="destructive">
                <BanIcon strokeWidth={2.25} />
                Beenden
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
}
