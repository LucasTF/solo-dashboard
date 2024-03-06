import { create } from "zustand";

type TableState = {
  tableData: (object & Record<"id", number>)[];
  setTableData: (
    fn: (
      prevState: (object & Record<"id", number>)[]
    ) => (object & Record<"id", number>)[]
  ) => void;
};

export const useTableStore = create<TableState>((set) => ({
  tableData: [],
  setTableData: (fn) => set((state) => ({ tableData: fn(state.tableData) })),
}));
