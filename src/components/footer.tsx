import { Link, useLocation } from "@tanstack/react-router";
import { DicesIcon } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { JSX } from "react";
import { cn } from "@/lib/utils";

type NavElement = {
  path: string;
  text: string;
  icon: (() => JSX.Element) | LucideIcon;
};

function NavigationElement({ element }: { element: NavElement }) {
  const location = useLocation();

  const isActive =
    location.pathname === element.path ||
    location.pathname.startsWith(`${element.path}/`);
  const Icon = element.icon;

  return (
    <li className="px-3 sm:px-1.5 sm:py-2">
      <Link
        to={element.path}
        className="focus-visible:ring-ring focus-visible:ring-offset-background block rounded-sm transition-shadow focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
      >
        <span
          className={cn(
            "flex flex-col items-center gap-y-[3px] text-sm transition-colors [&_img]:transition-shadow",
            "lg:flex-row lg:gap-x-3.5 lg:pl-3 lg:text-base",
            isActive
              ? "text-foreground font-semibold"
              : "text-muted-foreground"
          )}
        >
          <Icon className="size-6" strokeWidth={isActive ? 2.5 : 2} />
          <span className="max-w-full truncate">{element.text}</span>
        </span>
      </Link>
    </li>
  );
}

export default function Footer() {
  return (
    <>
      <nav className="bg-background/80 pb-safe-bottom fixed top-auto right-0 bottom-0 left-0 z-30 border-t-2 pr-[calc(env(safe-area-inset-right,0px)+1rem)] pl-[calc(env(safe-area-inset-left,0px)+1rem)] backdrop-blur">
        <ul className="mx-auto grid h-16 max-w-sm auto-cols-fr grid-flow-col items-center">
          <NavigationElement
            element={{
              icon: DicesIcon,
              path: "/",
              text: "Tutto",
            }}
          />
        </ul>
      </nav>
      <div className="mb-safe-bottom row-start-3 mt-[2px] h-16 w-full shrink-0" />
    </>
  );
}
