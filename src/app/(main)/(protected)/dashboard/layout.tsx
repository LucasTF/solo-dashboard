import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { ScrollButton } from "@/components/ui/ScrollButton";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="max-md:flex max-md:flex-col relative h-screen">
      <Navigation />
      <div className="md:ml-52 max-md:mt-16 max-md:flex-grow">{children}</div>
      <Footer />
      <ScrollButton />
    </div>
  );
}
