import { TableStructure } from "@/types/TableStructure";

export enum Tables {
  Obras = "/dashboard/obras",
  Users = "/dashboard/usuarios",
  Clientes = "/dashboard/clientes",
}

export const obrasStructure: TableStructure = {
  table: Tables.Obras,
  endpoint: "/obras",
  columns: [
    { name: "SP", values: ["cod_obra"] },
    { name: "Ano", values: ["ano"] },
    { name: "Endereço", values: ["tipo_logo", "logradouro", "complemento"] },
    { name: "UF", values: ["uf"] },
    { name: "Cidade", values: ["cidade"] },
    { name: "Bairro", values: ["bairro"] },
    { name: "Cliente", values: ["cliente"] },
    { name: "Proprietário", values: ["proprietario"] },
  ],
};

export const usersStructure: TableStructure = {
  table: Tables.Users,
  endpoint: "/usuarios",
  columns: [
    { name: "Nome", values: ["name"] },
    { name: "Email", values: ["email"] },
    { name: "Administrador", values: ["is_admin"] },
  ],
};

export const clientesStructure: TableStructure = {
  table: Tables.Clientes,
  endpoint: "/clientes",
  columns: [],
};
