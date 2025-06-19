import { DialogClose } from "@radix-ui/react-dialog";
import { useForm } from "@tanstack/react-form";
import { PlusIcon } from "lucide-react";
import { useGameStore } from "../-lib/store";
import type { Player } from "../-lib/types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export default function PlayerDialog({ player }: { player: Player }) {
  const { addScore } = useGameStore();

  const form = useForm({
    defaultValues: { scoreInput: "" },
    onSubmit: ({ value }) => {
      addScore(player.name, Number(value.scoreInput));
      form.reset();
    },
  });

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
        <div className="space-y-4">
          {player.score.length > 0 ? (
            <div className="space-y-2">
              <div className="space-y-1">
                {player.score.map((score, index) => (
                  <p key={index}>{score}</p>
                ))}
              </div>
              <Separator />
              <p className="font-medium">
                {player.score.reduce((acc, curr) => acc + curr, 0)}
              </p>
            </div>
          ) : (
            <p className="text-muted-foreground">
              Noch keine Punkte eingetragen.
            </p>
          )}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit(e);
            }}
            className="flex items-start gap-2"
          >
            <form.Field
              name="scoreInput"
              validators={{
                onChangeAsync: ({ value }) =>
                  !value
                    ? "Bitte gib einen Punktestand ein."
                    : isNaN(Number(value))
                      ? "Der Punktestand muss eine Zahl sein."
                      : undefined,
                onChangeAsyncDebounceMs: 200,
              }}
            >
              {(field) => (
                <div className="grow">
                  <div className="space-y-1">
                    <Label htmlFor={field.name}>Punkte hinzufügen</Label>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="number"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </div>
                  {field.state.meta.isTouched && !field.state.meta.isValid ? (
                    <em className="text-destructive text-sm">
                      {field.state.meta.errors.join(", ")}
                    </em>
                  ) : null}
                </div>
              )}
            </form.Field>
            <DialogClose asChild>
              <Button type="submit" size="icon" className="mt-4.5">
                <PlusIcon strokeWidth={2.25} />
              </Button>
            </DialogClose>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
