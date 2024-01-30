import { Metadata } from "next/types";

import Footer from "@/components/layout/Footer/Footer";
import Header from "@/components/layout/Header/Header";

export const metadata: Metadata = {
  title: "Solo Dashboard",
  description: "Dashboard de Dados | Solo Engenharia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen justify-between">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
