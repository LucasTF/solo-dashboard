import { Dashboard } from "@/components/Dashboard";
import { getObras } from "@/lib/actions/data/obras";

export default async function ObrasPage() {
  return (
    <>
      <Dashboard.Title title="Obras" />

      <Dashboard.MainContainer>
        <Dashboard.Search />

        <Dashboard.Table
          columnNames={[
            "ID",
            "Nome",
            "Ano",
            "Tipo Logradouro",
            "Logradouro",
            "Bairro",
            "Cidade",
            "UF",
            "Cliente",
            "Proprietário",
          ]}
          data={await getObras()}
        />

        <Dashboard.Options />
      </Dashboard.MainContainer>
    </>
  );
}
