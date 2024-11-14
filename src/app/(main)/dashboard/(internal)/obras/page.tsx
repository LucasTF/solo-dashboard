import { Metadata } from "next";

import { Dashboard } from "@/components/Dashboard";
import { obrasStructure } from "@/lib/structures";

export const metadata: Metadata = {
  title: "Obras",
};

export default async function ObrasPage() {
  return (
    <>
      <Dashboard.Header.Obras />

      <Dashboard.Manager.Obras />

      <Dashboard.Options.Obras />

      <Dashboard.TableArea tableStructure={obrasStructure} />
    </>
  );
}
