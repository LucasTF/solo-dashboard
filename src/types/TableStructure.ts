import { Tables } from "@/lib/structures";

export type Column = {
  name: string;
  value: string;
};

export type TableStructure = {
  table: Tables;
  overrideSearchOrder?: number[];
  columns: Column[];
};
