import { Entry } from "@/types/Entry";
import { create } from "zustand";
import { getEntryData } from "../actions/data";
import { Tables } from "@/lib/structures";

type EntryState = {
  entry: Entry | null;
  setEntry: (table: Tables, id: number, tableIndex: number) => void;
  updateEntry: (fn: (prevState: Entry | null) => Entry | null) => void;
  clearEntry: () => void;
};

export const useEntryStore = create<EntryState>((set, get) => ({
  entry: null,
  setEntry: async (table, id, tableIndex) => {
    set({ entry: { id, table, tableIndex } });
    const data = await getEntryData(table, id);
    if (data) set({ entry: { id, table, tableIndex, data } });
  },
  updateEntry: (fn) => set((state) => ({ entry: fn(state.entry) })),
  clearEntry: () => set((state) => ({ entry: null })),
}));
