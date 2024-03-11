import { Tables } from "@/enums/Tables";
import { TableStructure } from "@/types/TableStructure";

export const obrasStructure: TableStructure = {
  table: Tables.Obras,
  overrideSearchOrder: [3],
  columns: [
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

export const usersStructure: TableStructure = {
  table: Tables.Users,
  columns: [
    { name: "ID", value: "id", searchable: false },
    { name: "Nome", value: "name", searchable: true },
    { name: "Sobrenome", value: "surname", searchable: true },
    { name: "Email", value: "email", searchable: true },
    { name: "Administrador", value: "isAdmin", searchable: false },
  ],
};
