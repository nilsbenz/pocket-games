import { CardVariant } from "./types";
import type { Card } from "./types";

const street: Card = {
  displayName: "Strasse",
  description: "",
  variant: CardVariant.Street,
};
const stop: Card = {
  displayName: "Stop",
  description: "",
  variant: CardVariant.Stop,
};
const firework: Card = {
  displayName: "Feuerwerk",
  description: "",
  variant: CardVariant.Firework,
};
const plusMinus: Card = {
  displayName: "Plus / Minus",
  description: "",
  variant: CardVariant.PlusMinus,
};
const timesTwo: Card = {
  displayName: "Verdoppler",
  description: "",
  variant: CardVariant.TimesTwo,
};
const bonus: Card = {
  displayName: "Bonus",
  description: "",
  variant: CardVariant.Bonus200,
};
const shamrock: Card = {
  displayName: "Kleeblatt",
  description: "",
  variant: CardVariant.Shamrock,
};

const streets: Array<Card> = new Array(5).fill({ ...street });
const stops: Array<Card> = new Array(10).fill({ ...stop });
const fireworks: Array<Card> = new Array(5).fill({ ...firework });
const plusMinusS: Array<Card> = new Array(5).fill({ ...plusMinus });
const timesTwos: Array<Card> = new Array(5).fill({ ...timesTwo });
const bonus200: Array<Card> = new Array(5).fill({
  ...bonus,
  variant: CardVariant.Bonus200,
});
const bonus300: Array<Card> = new Array(5).fill({
  ...bonus,
  variant: CardVariant.Bonus300,
});
const bonus400: Array<Card> = new Array(5).fill({
  ...bonus,
  variant: CardVariant.Bonus400,
});
const bonus500: Array<Card> = new Array(5).fill({
  ...bonus,
  variant: CardVariant.Bonus500,
});
const bonus600: Array<Card> = new Array(5).fill({
  ...bonus,
  variant: CardVariant.Bonus600,
});

const cards: Array<Card> = [
  ...streets,
  ...stops,
  ...fireworks,
  ...plusMinusS,
  ...timesTwos,
  ...bonus200,
  ...bonus300,
  ...bonus400,
  ...bonus500,
  ...bonus600,
  shamrock,
];

export function getShuffledCards(): Array<Card> {
  const permutation = [];
  const availableCards = new Set(
    new Array(cards.length).fill(0).map((_, i) => i)
  );

  while (availableCards.size > 0) {
    const randomIndex = Math.floor(Math.random() * availableCards.size);
    const cardIndex = Array.from(availableCards)[randomIndex];
    const card = cards[cardIndex];
    permutation.push(card);
    availableCards.delete(cardIndex);
  }

  return permutation;
}
