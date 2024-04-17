import { create } from "zustand";

type UserData = {
  name: string;
  email: string;
  isAdmin: boolean;
};

type SessionState = {
  session: UserData | null;
  restoreSession: () => void;
  createSession: (credentials: UserData) => void;
  dropSession: () => void;
};

export const useSessionStore = create<SessionState>((set) => ({
  session: null,
  restoreSession: () =>
    set((state) => ({
      session: JSON.parse(localStorage.getItem("userData")!),
    })),
  createSession: (credentials: UserData) => {
    localStorage.setItem("userData", JSON.stringify(credentials));
    set((state) => ({ session: credentials }));
  },
  dropSession: () => {
    localStorage.removeItem("userData");
    set((state) => ({ session: null }));
  },
}));
