import { notFound } from "next/navigation";
import { Metadata } from "next";

import { getUfs } from "@/lib/actions/data/external/ibge";
import { getObraByCod } from "@/lib/actions/data/obras";

import { Obras } from "@/components/Dashboard/Obras/Pages";

type EditObraProps = {
  params: {
    cod_obra: string;
  };
};

export async function generateMetadata({
  params,
}: EditObraProps): Promise<Metadata> {
  const codObra = params.cod_obra;

  const obra = await getObraByCod(decodeURIComponent(codObra));

  if (obra) {
    return {
      title: `Edição | ${obra.cod_obra}`,
    };
  }

  return { title: "Obra não encontrada" };
}

export default async function EditObraPage({ params }: EditObraProps) {
  const ufReq = getUfs();
  const obraReq = getObraByCod(decodeURIComponent(params.cod_obra));

  const [ufData, obraData] = await Promise.all([ufReq, obraReq]);

  if (!obraData) notFound();

  return (
    <>
      <Obras.Edit.Header codObra={obraData.cod_obra} />

      <Obras.Edit.Main ufs={ufData} obra={obraData} />
    </>
  );
}
