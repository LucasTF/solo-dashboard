import { Tables } from "@/lib/structures";

export type Column = {
  name: string;
  value: string;
  searchable: boolean;
};

export type TableStructure = {
  table: Tables;
  overrideSearchOrder?: number[];
  columns: Column[];
};
