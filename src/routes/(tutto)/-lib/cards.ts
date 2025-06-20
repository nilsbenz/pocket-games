import { CardVariant } from "./types";
import type { Card } from "./types";

const street: Card = {
  displayName: "Strasse",
  description:
    "Achtung! Bei dieser Karte gibt es andere Regeln für gültige Würfel. Du musst versuchen eine Straße zu erzielen und darfst nicht vorher aufhören. Eine Straße besteht aus allen sechs Augenzahlen . Du musst wie gewohnt nach jedem Wurf mindestens einen gültigen Würfel herauslegen. Als gültiger Würfel zählt dabei ein Würfel mit einer Augenzahl, die du noch nicht herausgelegt hast. Enthält der Wurf keinen einzigen gültigen Würfel zählt das als Niete und du erhältst keine Punkte. Hast du die Straße geschafft, erhältst du dafür 2'000 Punkte. Eine Straße gilt als »TUTTO« – du darfst also weitermachen, wenn du möchtest",
  variant: CardVariant.Street,
};
const stop: Card = {
  displayName: "Stop",
  description:
    "Pech gehabt! Du musst aussetzen, und die Person rechts von dir kommt an die Reihe.",
  variant: CardVariant.Stop,
};
const firework: Card = {
  displayName: "Feuerwerk",
  description:
    "Du musst so lange würfeln, bis du eine Niete wirfst. Du musst bei jedem Wurf alle gültigen Würfel und Drillinge herauslegen. Bei einem »TUTTO« musst du weitermachen, ohne eine neue Karte aufzudecken. Dein Zug endet erst, wenn du eine Niete würfelst. Du bekommst jedoch alle Punkte gutgeschrieben, die du in diesem Zug erwürfelt hast.",
  variant: CardVariant.Firework,
};
const plusMinus: Card = {
  displayName: "Plus / Minus",
  description:
    "Du musst versuchen ein »TUTTO« zu erreichen und darfst nicht vorher aufhören. Wirfst du eine Niete, erhältst du keine Punkte. Schaffst du es, erhältst du genau 1'000 Punkte, unabhängig davon wieviele Punkte du erwürfelt hast. Zusätzlich werden der führenden Person 1'000 Punkte abgezogen. Man kann jedoch nie weniger als 0 Punkte haben. Führen mehrere Personen mit der gleichen Punktzahl, bekommt jede*r von ihnen 1'000 Punkte abgezogen. Die würfelnde Person erhält aber trotzdem nur 1'000 Punkte gutgeschrieben. Deckt die führende Person selbst diese Karte auf, muss sie sich natürlich keine Punkte abziehen, wenn sie ein »TUTTO« erreicht.",
  variant: CardVariant.PlusMinus,
};
const timesTwo: Card = {
  displayName: "Verdoppler",
  description:
    "Erzielst du ein »TUTTO«, werden alle bisher in diesem Zug erwürfelten Punkte verdoppelt. Hörst du auf und hast kein »TUTTO« erreicht, erhältst du nur die erwürfelten Punkte.",
  variant: CardVariant.TimesTwo,
};
const bonus: Card = {
  displayName: "Bonus",
  description:
    "Erzielst du ein »TUTTO«, erhältst du zusätzlich zu den erwürfelten Punkten die auf der Karte angegebenen Bonuspunkte. Hörst du auf und hast kein »TUTTO« erreicht, erhältst du nur die erwürfelten Punkte ohne den Bonus.",
  variant: CardVariant.Bonus200,
};
const shamrock: Card = {
  displayName: "Kleeblatt",
  description:
    "Du musst versuchen, in diesem Zug zweimal hintereinander »TUTTO« zu erzielen und darfst nicht vorher aufhören. Wirfst du eine Niete, erhältst du keine Punkte. Schafft du es, ist das Spiel sofort beendet und du hast gewonnen – unabhängig vom Punktestand!",
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
