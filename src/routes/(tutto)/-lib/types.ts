export type Player = {
  name: string;
  score: Array<number>;
};

export const CardVariant = {
  Street: "street",
  Stop: "stop",
  Firework: "firework",
  PlusMinus: "plus-minus",
  TimesTwo: "times-two",
  Bonus200: "bonus200",
  Bonus300: "bonus300",
  Bonus400: "bonus400",
  Bonus500: "bonus500",
  Bonus600: "bonus600",
  Shamrock: "shamrock",
} as const;
export type CardVariant = (typeof CardVariant)[keyof typeof CardVariant];

export type Card = {
  displayName: string;
  description: string;
  variant: CardVariant;
};
