import { useForm } from "@tanstack/react-form";
import { Navigate, createFileRoute } from "@tanstack/react-router";
import {
  AlertTriangleIcon,
  PlusIcon,
  RocketIcon,
  Trash2Icon,
} from "lucide-react";
import { useGameStore } from "./-lib/store";
import Layout from "@/components/layout";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/(tutto)/")({
  component: Start,
});

export default function Start() {
  const { players, addPlayer, deletePlayer, newGame, currentCard } =
    useGameStore();

  const form = useForm({
    defaultValues: { newPlayer: "" },
    onSubmit: ({ value }) => {
      addPlayer(value.newPlayer);
      form.reset();
    },
  });

  if (currentCard !== null) {
    return <Navigate to="/spiel" replace />;
  }

  return (
    <Layout>
      <div className="mx-auto w-full max-w-md space-y-8">
        <h2 className="text-center text-4xl font-medium">Tutto</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit(e);
          }}
          className="flex items-start gap-2"
        >
          <form.Field
            name="newPlayer"
            validators={{
              onChange: ({ value }) =>
                !value
                  ? "Bitte gib einen Namen ein."
                  : value.length < 2
                    ? "Der Name muss mindestens 2 Zeichen lang sein."
                    : undefined,
              onChangeAsyncDebounceMs: 500,
            }}
            children={(field) => (
              <div className="grow">
                <div className="space-y-1">
                  <Label htmlFor={field.name}>Spielername</Label>
                  <Input
                    id={field.name}
                    name={field.name}
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
          />
          <Button type="submit" size="icon" className="mt-4.5">
            <PlusIcon strokeWidth={2.25} />
          </Button>
        </form>

        <div className="divide-y-2">
          {players.map((player) => (
            <div
              key={player.name}
              className="flex items-center justify-between"
            >
              <p>{player.name}</p>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => deletePlayer(player.name)}
              >
                <span className="sr-only">Spieler {player.name} entfernen</span>
                <Trash2Icon strokeWidth={2.25} />
              </Button>
            </div>
          ))}
        </div>

        {players.length >= 2 ? (
          <Button onClick={newGame} className="w-full">
            <RocketIcon strokeWidth={2.25} />
            Spiel starten
          </Button>
        ) : (
          <Alert variant="destructive">
            <AlertTriangleIcon strokeWidth={2.5} />
            <AlertTitle>Zu wenige Spieler</AlertTitle>
            <AlertDescription>
              Füge mindestens zwei Spieler hinzu, um ein Spiel starten zu
              können.
            </AlertDescription>
          </Alert>
        )}
      </div>
    </Layout>
  );
}
