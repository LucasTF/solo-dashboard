import type { Metadata } from "next";

import Footer from "@/components/layout/Footer/Footer";
import Header from "@/components/layout/Header/Header";
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
    <div className="flex flex-col min-h-screen justify-between">
      <Header />
      {children}
      <Footer />
      <ScrollButton />
    </div>
  );
}
