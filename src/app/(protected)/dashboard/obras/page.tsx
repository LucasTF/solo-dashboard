import { Dashboard } from "@/components/Dashboard";

export default function ObrasPage() {
  return (
    <>
      <Dashboard.Title title="Obras" />

      <Dashboard.MainContainer>
        <Dashboard.Search />

        <Dashboard.Table />

        <Dashboard.Options />
      </Dashboard.MainContainer>
    </>
  );
}
