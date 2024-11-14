import { create } from "zustand";

type TableData = {
  data: (Record<"id", number> & Record<string, unknown>)[];
  pages: number;
  totalEntries: number;
};

type State = {
  tableData: TableData;
};

type Action = {
  setTableData: (tableData: TableData) => void;
};

export const useTableStore = create<State & Action>((set) => ({
  tableData: {
    data: [],
    pages: 1,
    totalEntries: 0,
  },
  setTableData: (newTableData) => set(() => ({ tableData: newTableData })),
}));
