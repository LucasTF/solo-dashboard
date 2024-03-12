import type { Metadata } from "next";
import "../../../globals.css";

export const metadata: Metadata = {
  title: "Solo Engenharia | Login",
  description: "Solo Engenharia | Tela de Login",
};

export default function AuthLayout({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  return (
    <div className="w-screen h-screen flex justify-center bg-gradient">
      {children}
    </div>
  );
}
