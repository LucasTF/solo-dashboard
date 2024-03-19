import type { Metadata } from "next";
import "react-toastify/dist/ReactToastify.css";
import "../../globals.css";

export const metadata: Metadata = {
  title: "Relatório",
};

export default function ReportLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="bg-gray-800 grid min-h-sreen place-items-center">
        {children}
      </body>
    </html>
  );
}
