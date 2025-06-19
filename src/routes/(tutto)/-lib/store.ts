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
  addScore: (playerName: string, score: number) => void;
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
        set({ cards: getShuffledCards(), currentCard: -1 });
      },
      updateCurrentCard: (index) => {
        set({
          currentCard: index,
        });
      },
      addScore: (playerName, score) => {
        set((state) => {
          const playerIndex = state.players.findIndex(
            (p) => p.name === playerName
          );
          if (playerIndex === -1) return state;

          const updatedPlayers = [...state.players];
          updatedPlayers[playerIndex].score.push(score);

          return { players: updatedPlayers };
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
