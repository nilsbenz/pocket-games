import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import TanStackQueryLayout from "../integrations/tanstack-query/layout.tsx";
import type { QueryClient } from "@tanstack/react-query";
import { ThemeProvider } from "@/components/theme-provider.tsx";

interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <>
      <ThemeProvider>
        <Outlet />
      </ThemeProvider>

      <TanStackRouterDevtools />
      <TanStackQueryLayout />
    </>
  ),
});
