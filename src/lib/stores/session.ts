import { create } from "zustand";

import { logout } from "../actions/auth/logout";
import { login } from "../actions/auth/login";

type UserDataType = {
  name: string;
  surname: string;
  email: string;
};

type SessionState = {
  session: UserDataType | null;
  restoreSession: () => void;
  createSession: (credentials: { email: string; password: string }) => void;
  dropSession: () => void;
};

export const useSessionStore = create<SessionState>((set) => ({
  session: null,
  restoreSession: () =>
    set((state) => ({
      session: JSON.parse(localStorage.getItem("userData")!),
    })),
  createSession: async (credentials) => {
    const response = await login(credentials);
    if (response.success) {
      localStorage.setItem("userData", JSON.stringify(response.user));

      set((state) => ({ session: response.user }));
    }
  },
  dropSession: () => {
    logout();
    localStorage.removeItem("userData");
    set((state) => ({ session: null }));
  },
}));
