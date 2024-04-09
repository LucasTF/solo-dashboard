import { Metadata } from "next";

import { Dashboard } from "@/components/Dashboard";
import { usersStructure } from "@/lib/structures";

type PageProps = {
  searchParams: {
    search: string;
  };
};

export const metadata: Metadata = {
  title: "Usuários",
};

export default async function UsersPage({ searchParams }: PageProps) {
  return (
    <>
      <Dashboard.Header.Users />

      <Dashboard.Manager.Users />

      <Dashboard.Options.Users />

      <Dashboard.TableArea
        tableStructure={usersStructure}
        searchString={searchParams.search}
        showAllData={true}
      />
    </>
  );
}
