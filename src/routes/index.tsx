import Layout from "@/components/layout";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  return (
    <Layout>
      <div className="flex grow items-center justify-center">
        <h1>Pocket Games</h1>
      </div>
    </Layout>
  );
}
