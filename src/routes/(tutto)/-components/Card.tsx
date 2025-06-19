import type { CardVariant } from "../-lib/types";

export default function Card({ variant }: { variant: CardVariant }) {
  return (
    <div className="bg-card text-card-foreground flex aspect-video items-center justify-center rounded-lg border-4">
      {variant}
    </div>
  );
}
