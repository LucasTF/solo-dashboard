import { create } from "zustand";

type UserDataType = {
  name: string;
  surname: string;
  email: string;
  isAdmin: boolean;
};

type SessionState = {
  session: UserDataType | null;
  restoreSession: () => void;
  createSession: (credentials: UserDataType) => void;
  dropSession: () => void;
};

export const useSessionStore = create<SessionState>((set) => ({
  session: null,
  restoreSession: () =>
    set((state) => ({
      session: JSON.parse(localStorage.getItem("userData")!),
    })),
  createSession: (credentials: UserDataType) => {
    localStorage.setItem("userData", JSON.stringify(credentials));
    set((state) => ({ session: credentials }));
  },
  dropSession: () => {
    localStorage.removeItem("userData");
    set((state) => ({ session: null }));
  },
}));
