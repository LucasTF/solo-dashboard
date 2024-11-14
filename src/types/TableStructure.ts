import { Tables } from "@/lib/structures";

export type Column = {
  name: string;
  values: string[];
};

export type TableStructure = {
  table: Tables;
  endpoint: string;
  overrideSearchOrder?: number[];
  columns: Column[];
};
