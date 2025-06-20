import Header from "./header";

export default function Layout({
  headerTitle,
  headerInfoLink,
  children,
}: {
  headerTitle?: string;
  headerInfoLink?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex grow flex-col px-4 py-8">
      <Header title={headerTitle} infoLink={headerInfoLink} />
      {children}
      {/* <Footer /> */}
    </div>
  );
}
