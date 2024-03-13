import type { Metadata } from "next";

import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { ScrollButton } from "@/components/ui/ScrollButton";

export const metadata: Metadata = {
  title: "Solo Engenharia | Dashboard",
  description: "Dashboard de Dados | Solo Engenharia",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex max-md:flex-col min-h-screen">
      <Navigation />
      <div className="max-md:my-16 flex-grow">{children}</div>
      <Footer />
      <ScrollButton />
    </div>
  );
}
