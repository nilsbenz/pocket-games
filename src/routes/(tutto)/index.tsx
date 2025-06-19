import { createFileRoute } from "@tanstack/react-router";
import GameScreen from "./-components/game-screen";
import StartScreen from "./-components/start-screen";
import { useGameStore } from "./-lib/store";

export const Route = createFileRoute("/(tutto)/")({
  component: Start,
});

export default function Start() {
  const { currentCard } = useGameStore();

  if (currentCard !== null) {
    return <GameScreen />;
  }

  return <StartScreen />;
}
