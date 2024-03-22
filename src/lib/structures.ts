import { TableStructure } from "@/types/TableStructure";

export enum Tables {
  Obras = "/dashboard/obras",
  Users = "/dashboard/usuarios",
  Clientes = "/dashboard/clientes",
}

export const obrasStructure: TableStructure = {
  table: Tables.Obras,
  overrideSearchOrder: [3],
  columns: [
    { name: "SP", value: "cod_obra", searchable: true },
    { name: "Ano", value: "ano", searchable: false },
    { name: "Tipo Log.", value: "tipo_logo", searchable: false },
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
    { name: "Nome", value: "name", searchable: true },
    { name: "Email", value: "email", searchable: true },
    { name: "Administrador", value: "isAdmin", searchable: false },
  ],
};

export const clientesStructure: TableStructure = {
  table: Tables.Clientes,
  columns: [],
};
