import { Metadata } from "next";

import { Dashboard } from "@/components/Dashboard";

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
