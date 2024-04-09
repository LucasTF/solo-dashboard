import { TableStructure } from "@/types/TableStructure";

export enum Tables {
  Obras = "/dashboard/obras",
  Users = "/dashboard/usuarios",
  Clientes = "/dashboard/clientes",
}

export const obrasStructure: TableStructure = {
  table: Tables.Obras,
  columns: [
    { name: "SP", value: "cod_obra" },
    { name: "Ano", value: "ano" },
    { name: "Endereço", value: "endereco" },
    { name: "UF", value: "uf" },
    { name: "Cidade", value: "cidade" },
    { name: "Bairro", value: "bairro" },
    { name: "Cliente", value: "cliente" },
    { name: "Proprietário", value: "proprietario" },
  ],
};

export const usersStructure: TableStructure = {
  table: Tables.Users,
  columns: [
    { name: "Nome", value: "name" },
    { name: "Email", value: "email" },
    { name: "Administrador", value: "isAdmin" },
  ],
};

export const clientesStructure: TableStructure = {
  table: Tables.Clientes,
  columns: [],
};
