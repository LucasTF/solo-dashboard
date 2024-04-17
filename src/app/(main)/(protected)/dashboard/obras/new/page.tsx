import { Obras } from "@/components/Dashboard/Obras/Pages";
import { getUfs } from "@/lib/actions/data/external/ibge";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nova Obra",
};

export default async function NewObraPage() {
  const ufData = await getUfs();

  return (
    <>
      <Obras.New.Header />

      <Obras.New.Main ufs={ufData} />
    </>
  );
}
