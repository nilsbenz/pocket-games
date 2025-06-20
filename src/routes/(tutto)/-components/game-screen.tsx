import { Fireworks } from "@fireworks-js/react";
import { BanIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { useGameStore } from "../-lib/store";
import Card from "./card";
import PlayerDialog from "./player-dialog";
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
import cover from "@/assets/tutto/cover.jpeg";

export default function GameScreen() {
  const { players, currentCard, goal, endGame, updateCurrentCard } =
    useGameStore();
  const [direction, setDirection] = useState<"forwards" | "backwards">(
    "forwards"
  );
  const [showFireworks, setShowFireworks] = useState(false);

  useEffect(() => {
    if (showFireworks) {
      setTimeout(() => {
        setShowFireworks(false);
      }, 6000);
    }
  }, [showFireworks]);

  if (currentCard === null) {
    return null;
  }

  return (
    <Layout headerTitle="Tutto" headerInfoLink="/downloads/tutto.pdf">
      <div className="mx-auto flex w-full max-w-md grow flex-col space-y-8">
        <div className="space-y-4">
          <div className="-mx-4 -mt-4">
            <AnimatePresence mode="popLayout">
              {currentCard >= 0 ? (
                <motion.div
                  key={currentCard}
                  initial={{
                    opacity: 0,
                    x: direction === "forwards" ? 160 : 0,
                  }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction === "forwards" ? 0 : 160 }}
                  transition={{
                    duration: 0.4,
                    ease: direction === "forwards" ? "backOut" : "backIn",
                  }}
                >
                  <Card index={currentCard} />
                </motion.div>
              ) : (
                <button
                  className="focus-visible:ring-ring/50 relative flex aspect-[1024/733] w-full cursor-pointer items-center justify-center overflow-clip bg-cover bg-center transition-shadow focus:outline-none focus-visible:ring-[3px]"
                  style={{ backgroundImage: `url(${cover})` }}
                  onClick={() => {
                    setDirection("forwards");
                    updateCurrentCard(0);
                  }}
                >
                  <div className="border-background absolute -inset-[60px] rounded-[25%] border-[96px] blur-[16px]" />
                  <p className="text-7xl font-semibold text-white">Tutto</p>
                  <p className="absolute bottom-2 left-1/2 -translate-x-1/2 font-medium">
                    Tippen, um zu starten
                  </p>
                </button>
              )}
            </AnimatePresence>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Button
              variant="ghost"
              onClick={() => {
                setDirection("backwards");
                setTimeout(() => {
                  updateCurrentCard(currentCard - 1);
                }, 0);
              }}
              disabled={currentCard <= 0}
            >
              <ChevronLeftIcon strokeWidth={2.25} />
              Zurück
            </Button>
            <Button
              variant="ghost"
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
              <PlayerDialog
                player={player}
                onAchievedGoal={() => setShowFireworks(true)}
              />
            </div>
          ))}
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant={
                players.some(
                  (p) => p.score.reduce((acc, curr) => acc + curr, 0) >= goal
                )
                  ? "default"
                  : "secondary"
              }
            >
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

      <AnimatePresence>
        {showFireworks && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pointer-events-none absolute inset-0"
          >
            <Fireworks className="h-full" />
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
}
