import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getShuffledCards } from "./cards";
import type { Card, Player } from "./types";

interface TuttoState {
  players: Array<Player>;
  cards: Array<Card>;
  currentCard: number | null;
  addPlayer: (name: string) => void;
  deletePlayer: (name: string) => void;
  newGame: () => void;
  updateCurrentCard: (index: number) => void;
  endGame: () => void;
}

export const useGameStore = create<TuttoState>()(
  persist(
    (set) => ({
      players: [],
      cards: [],
      currentCard: null,
      addPlayerError: "",
      addPlayer: (name) => {
        set((state) => ({
          players: [...state.players, { name, score: [] }],
        }));
      },
      deletePlayer: (name) =>
        set((state) => ({
          players: state.players.filter((p) => p.name !== name),
        })),
      newGame: () => {
        set({ cards: getShuffledCards(), currentCard: 0 });
      },
      updateCurrentCard: (index) => {
        set({
          currentCard: index,
        });
      },
      endGame: () => {
        set({ cards: [], currentCard: null });
      },
    }),
    {
      name: "tutto",
    }
  )
);
