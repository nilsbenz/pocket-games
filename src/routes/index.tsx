import { createFileRoute } from "@tanstack/react-router";
import Layout from "@/components/layout";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  return (
    <Layout>
      <div className="flex grow items-center justify-center">
        <p>Tutto</p>
      </div>
    </Layout>
  );
}
