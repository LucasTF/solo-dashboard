import { TableStructure, TablesEnum } from "../TableStructure";

export const obrasStructure: TableStructure = {
  table: TablesEnum.Obras,
  columns: [
    { name: "ID", value: "id", searchable: false },
    { name: "SP", value: "sp", searchable: true },
    { name: "Ano", value: "ano", searchable: false },
    { name: "Tipo Logradouro", value: "tipo_logo", searchable: false },
    { name: "Logradouro", value: "logradouro", searchable: true },
    { name: "UF", value: "uf", searchable: false },
    { name: "Cidade", value: "cidade", searchable: true },
    { name: "Bairro", value: "bairro", searchable: true },
    { name: "Cliente", value: "cliente", searchable: true },
    { name: "Proprietário", value: "proprietario", searchable: true },
  ],
};
