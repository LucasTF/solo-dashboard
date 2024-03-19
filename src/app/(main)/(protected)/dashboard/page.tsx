import { Dashboard } from "@/components/Dashboard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
};

export default async function HomePage() {
  return (
    <>
      <Dashboard.Header.Home />

      <Dashboard.Main.Home />
    </>
  );
}
