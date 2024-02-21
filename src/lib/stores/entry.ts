import { Entry } from "@/types/Entry";
import { create } from "zustand";

type EntryState = {
  entry: Entry | null;
  setEntry: (entry: Entry) => void;
  resetEntry: () => void;
};

export const useEntryStore = create<EntryState>((set) => ({
  entry: null,
  setEntry: (entry) => set((state) => ({ entry })),
  resetEntry: () => set((state) => ({ entry: null })),
}));
