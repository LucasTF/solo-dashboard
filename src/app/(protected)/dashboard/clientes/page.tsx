import { Dashboard } from "@/components/Dashboard";

export default function ClientesPage() {
  return (
    <>
      <Dashboard.Title title="Clientes" />

      <Dashboard.MainContainer>
        {/* <Dashboard.Search /> */}

        {/* <Dashboard.Table /> */}

        <Dashboard.Options />
      </Dashboard.MainContainer>
    </>
  );
}
