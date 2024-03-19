import { Metadata } from "next";

import LoginForm from "@/components/Login/Form";
import ThemeSwitcher from "@/components/ui/Navigation/ThemeSwitcher";

export const metadata: Metadata = {
  title: "Login",
};

export default function Login() {
  return (
    <main className="my-auto">
      <ThemeSwitcher className="p-2 m-4 border border-slate-300 rounded-md absolute top-0 right-0 text-white" />
      <LoginForm />
    </main>
  );
}
