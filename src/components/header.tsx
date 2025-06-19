import { DicesIcon } from "lucide-react";

export default function Header({ title }: { title?: string }) {
  return (
    <>
      <header className="bg-secondary/70 pt-safe-top pl-safe-left pr-safe-right text-secondary-foreground fixed top-0 right-0 left-0 z-40 border-b-2 backdrop-blur-md">
        <div className="flex h-14 items-center gap-2 px-4">
          <DicesIcon strokeWidth={2.5} className="text-primary" />
          <h1 className="text-lg font-bold">{title || "Taschenspiele"}</h1>
        </div>
      </header>
      <div className="mt-safe-top mb-0.5 h-14" />
    </>
  );
}
