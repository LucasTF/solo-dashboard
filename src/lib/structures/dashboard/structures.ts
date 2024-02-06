import { TableStructure, TablesEnum } from "../TableStructure";

export const obrasStructure: TableStructure = {
  columnNames: [
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
  ],
  searchColumns: [
    { name: "Nome", value: "nome" },
    { name: "Bairro", value: "bairro" },
    { name: "Cidade", value: "cidade" },
    { name: "Cliente", value: "cliente" },
    { name: "Proprietário", value: "proprietario" },
  ],
  type: TablesEnum.Obras,
};
