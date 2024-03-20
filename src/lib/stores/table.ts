import { create } from "zustand";

type TableState = {
  tableData: (Record<"id", number> & Record<string, unknown>)[];
  setTableData: (
    fn: (
      prevState: (Record<"id", number> & Record<string, unknown>)[]
    ) => (Record<"id", number> & Record<string, unknown>)[]
  ) => void;
};

export const useTableStore = create<TableState>((set) => ({
  tableData: [],
  setTableData: (fn) => set((state) => ({ tableData: fn(state.tableData) })),
}));
