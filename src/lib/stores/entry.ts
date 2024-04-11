import { create } from "zustand";
import { getEntryData } from "../actions/data";
import { Tables } from "../structures";

export type Entry<T> = {
  table: Tables;
  id: number;
  tableIndex: number;
  data: T | null;
};

export type EntryState<T> = {
  entry: Entry<T> | null;
  setEntry: (table: Tables, id: number, tableIndex: number) => void;
  refreshEntry: () => void;
  clearEntry: () => void;
};

export const useEntryStore = create<EntryState<unknown>>((set, get) => ({
  entry: null,
  setEntry: async (table, id, tableIndex) => {
    set({ entry: { id, table, tableIndex, data: null } });
    const data = await getEntryData(table, id);
    if (data) set({ entry: { id, table, tableIndex, data } });
  },
  refreshEntry: () => {
    const currEntry = get().entry;
    if (!currEntry) return;
    get().setEntry(currEntry.table, currEntry.id, currEntry.tableIndex);
  },
  clearEntry: () => set((state) => ({ entry: null })),
}));
