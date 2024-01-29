import { create } from "zustand";

type BackdropState = {
  backdrop: boolean;
  toggleBackdrop: () => void;
};

export const useBackdrop = create<BackdropState>((set) => ({
  backdrop: false,
  toggleBackdrop: () => set((state) => ({ backdrop: !state.backdrop })),
}));
