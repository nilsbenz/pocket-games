import { DicesIcon } from "lucide-react";

export default function Header() {
  return (
    <>
      <header className="bg-secondary/70 text-secondary-foreground fixed top-0 z-40 flex h-14 w-full items-center gap-2 border-b-2 px-4 backdrop-blur-md">
        <DicesIcon strokeWidth={2.5} className="text-primary" />
        <h1 className="text-lg font-bold">Taschenspiele</h1>
      </header>
      <div className="mb-0.5 h-14" />
    </>
  );
}
