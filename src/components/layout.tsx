import Footer from "./footer";
import Header from "./_header";

export default function Layout({ children }: { children?: React.ReactNode }) {
  return (
    <div className="flex grow flex-col">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
