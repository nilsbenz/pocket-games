import type { Player } from "../-lib/types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function PlayerDialog({ player }: { player: Player }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="w-full justify-between">
          <span>{player.name}</span>
          <span>{player.score.reduce((acc, curr) => acc + curr, 0)}</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{player.name}</DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
