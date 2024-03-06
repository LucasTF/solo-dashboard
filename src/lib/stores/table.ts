import { TableData } from "@/types/data/TableData";
import { create } from "zustand";

type TableState = {
  tableData: TableData;
  setTableData: (fn: (prevState: TableData) => TableData) => void;
};

export const useTableStore = create<TableState>((set) => ({
  tableData: [],
  setTableData: (fn) => set((state) => ({ tableData: fn(state.tableData) })),
}));
