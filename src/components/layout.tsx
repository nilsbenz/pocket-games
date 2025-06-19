import Footer from "./footer";
import Header from "./header";

export default function Layout({
  headerTitle,
  children,
}: {
  headerTitle?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex grow flex-col px-4 py-8">
      <Header title={headerTitle} />
      {children}
      <Footer />
    </div>
  );
}
