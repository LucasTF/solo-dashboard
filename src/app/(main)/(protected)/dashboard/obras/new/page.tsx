import { Obras } from "@/components/Dashboard/Obras/Pages";
import { getUfs } from "@/lib/actions/data/external/ibge";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nova Obra",
};

export default async function NewObraPage() {
  const ufReq = await getUfs();
  const ufData = ufReq.success ? ufReq.data : [];

  return (
    <>
      <Obras.New.Header />

      <Obras.New.Main ufs={ufData} />
    </>
  );
}
