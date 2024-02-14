import { create } from "zustand";
import { TablesEnum } from "../structures/TableStructure";

type Entry = {
  id: number | string;
  table: TablesEnum;
};

type EntryState = {
  entry: Entry | null;
  setEntry: (entry: Entry) => void;
};

export const useEntryStore = create<EntryState>((set) => ({
  entry: null,
  setEntry: (entry) => set((state) => ({ entry })),
}));
