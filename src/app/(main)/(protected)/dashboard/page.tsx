import { Dashboard } from "@/components/Dashboard";

export default async function HomePage() {
  return (
    <>
      <Dashboard.Header.Home />

      <Dashboard.Main.Home />
    </>
  );
}
