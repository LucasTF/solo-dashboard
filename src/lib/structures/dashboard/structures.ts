import { ObrasSearchColumnsEnum } from "@/enums/SearchColumns";
import { TableStructure, TablesEnum } from "../TableStructure";

export const obrasStructure: TableStructure = {
  table: TablesEnum.Obras,
  columnNames: [
    "ID",
    "Cod SP",
    "Ano",
    "Tipo Logradouro",
    "Logradouro",
    "Cidade",
    "Bairro",
    "UF",
    "Cliente",
    "Proprietário",
  ],
  searchColumns: [
    { name: "Cod SP", value: ObrasSearchColumnsEnum.CodSP },
    { name: "Cidade", value: ObrasSearchColumnsEnum.Cidade },
    { name: "Bairro", value: ObrasSearchColumnsEnum.Bairro },
    { name: "Logradouro", value: ObrasSearchColumnsEnum.Logradouro },
    { name: "Cliente", value: ObrasSearchColumnsEnum.Cliente },
    { name: "Proprietário", value: ObrasSearchColumnsEnum.Proprietario },
  ],
};
