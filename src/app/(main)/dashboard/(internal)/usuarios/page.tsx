import { Metadata } from "next";

import { Dashboard } from "@/components/Dashboard";
import { usersStructure } from "@/lib/structures";

export const metadata: Metadata = {
  title: "Usuários",
};

export default async function UsersPage() {
  return (
    <>
      <Dashboard.Header.Users />

      <Dashboard.Manager.Users />

      <Dashboard.Options.Users />

      <h1>Under Construction</h1>
    </>
  );
}
