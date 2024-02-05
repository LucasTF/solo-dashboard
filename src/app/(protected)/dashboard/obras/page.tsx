import { Dashboard } from "@/components/Dashboard";
import { ObrasSearchOptionsEnum } from "@/enums";
import { getObras } from "@/lib/actions/data/obras";
import { DashboardSearchParameters } from "@/types/dashboardSearchType";

export default async function ObrasPage() {
  const searchTargets = [
    { name: "Nome", value: ObrasSearchOptionsEnum.nome },
    { name: "Cliente", value: ObrasSearchOptionsEnum.cliente },
    { name: "Bairro", value: ObrasSearchOptionsEnum.bairro },
    { name: "Cidade", value: ObrasSearchOptionsEnum.cidade },
    { name: "Proprietário", value: ObrasSearchOptionsEnum.proprietario },
  ];

  return (
    <>
      <Dashboard.Title title="Obras" />

      <Dashboard.MainContainer>
        <Dashboard.Search searchTargets={searchTargets} />

        <Dashboard.Table
          columnNames={[
            "ID",
            "Nome",
            "Ano",
            "Tipo Logradouro",
            "Logradouro",
            "Cidade",
            "Bairro",
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
