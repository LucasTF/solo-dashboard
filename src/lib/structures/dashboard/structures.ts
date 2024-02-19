import { TableStructure, TablesEnum } from "../TableStructure";

export const obrasStructure: TableStructure = {
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
    { name: "Cod SP", value: "nome" },
    { name: "Cidade", value: "cidade" },
    { name: "Bairro", value: "bairro" },
    { name: "Logradouro", value: "logradouro" },
    { name: "Cliente", value: "cliente" },
    { name: "Proprietário", value: "proprietario" },
  ],
  type: TablesEnum.Obras,
};
