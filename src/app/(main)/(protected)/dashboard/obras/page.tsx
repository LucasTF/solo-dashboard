import { Metadata } from "next";

import { Dashboard } from "@/components/Dashboard";
import { obrasStructure } from "@/lib/structures";

type PageProps = {
  searchParams: {
    search: string;
  };
};

export const metadata: Metadata = {
  title: "Obras",
};

export default async function ObrasPage({ searchParams }: PageProps) {
  return (
    <>
      <Dashboard.Header.Obras />

      <Dashboard.Manager.Obras />

      <Dashboard.Options.Obras />

      <Dashboard.TableArea
        tableStructure={obrasStructure}
        searchString={searchParams.search}
      />
    </>
  );
}
