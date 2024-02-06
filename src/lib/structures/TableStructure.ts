export type SearchColumn = {
  name: string;
  value: string;
};

export enum TablesEnum {
  Obras = "/dashboard/obras",
  Clientes = "/dashboard/clientes",
  Proprietarios = "/dashboard/proprietarios",
}

export type TableStructure = {
  searchColumns: SearchColumn[];
  columnNames: string[];
  type: TablesEnum;
};
