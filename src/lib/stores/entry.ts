import { create } from "zustand";
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
    // TODO: Get entry from Flask API
  },
  refreshEntry: () => {
    const currEntry = get().entry;
    if (!currEntry) return;
    get().setEntry(currEntry.table, currEntry.id, currEntry.tableIndex);
  },
  clearEntry: () => set((state) => ({ entry: null })),
}));
