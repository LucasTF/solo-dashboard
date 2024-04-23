import { Metadata } from "next";

import { getHomeData } from "@/lib/actions/data/home";

import { Dashboard } from "@/components/Dashboard";

export const metadata: Metadata = {
  title: "Home",
};

export default async function HomePage() {
  const homeData = await getHomeData();

  return (
    <>
      <Dashboard.Header.Home />

      <Dashboard.Main.Home homeData={homeData} />
    </>
  );
}
