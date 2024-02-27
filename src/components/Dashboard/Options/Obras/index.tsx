"use client";

import { Suspense, lazy, useEffect, useState } from "react";
import { tv } from "tailwind-variants";
import {
  ArrowUpOnSquareStackIcon,
  DocumentIcon,
  DocumentTextIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";

import Button, { ButtonLink } from "@/components/ui/Button";

import { useEntryStore } from "@/lib/stores/entry";
import { usePathname, useSearchParams } from "next/navigation";
import { Obra, ObraWithFiles } from "@/types/data/Obra";
import { getObraById } from "@/lib/actions/data/obras";
import { TitledDivider } from "@/components/ui/TitledDivider";
import Modal from "@/components/ui/Modal";
import Loading from "../Loading";

const EditObraForm = lazy(() => import("./Form/EditObra"));
const Archives = lazy(() => import("./Form/Archives"));

enum ModalState {
  Off,
  Edit = "Editar Obra",
  Archives = "Gerenciar arquivos",
}

const options = tv({
  base: "max-lg:mb-4 lg:ml-8",
  variants: {
    visible: {
      true: "lg:col-span-1 order-2",
      false: "hidden",
    },
  },
});

export const ObrasOptions = () => {
  const [modal, setModal] = useState<ModalState>(ModalState.Off);
  const [obra, setObra] = useState<ObraWithFiles>();

  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { entry } = useEntryStore();

  useEffect(() => {
    const fetchObra = async () => {
      if (entry) {
        const obraData = (await getObraById(
          Number(entry.data.id)
        )) as ObraWithFiles;
        setObra(obraData);
      }
    };
    fetchObra().catch((err) => console.log(err));
  }, [entry]);

  const modalBuilder = () => {
    switch (modal) {
      case ModalState.Edit:
        return <EditObraForm obra={obra as Obra} />;
      case ModalState.Archives:
        return <Archives obra={obra as ObraWithFiles} />;
    }
  };

  return (
    <div className={options({ visible: entry !== null })}>
      {entry && searchParams.size > 0 && entry.table === pathname && (
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-center font-semibold">Obra</p>
            <h2 className="font-bold text-center sm:text-2xl xl:text-4xl">
              {obra?.sp}
            </h2>
          </div>

          <TitledDivider title="Opções" />

          <Button
            color="lightblue"
            fontStrength="semibold"
            type="button"
            onClick={() => setModal(ModalState.Edit)}
          >
            <PencilSquareIcon className="size-6" />
            Editar obra
          </Button>

          <Button
            color="red"
            fontStrength="semibold"
            type="button"
            onClick={() => setModal(ModalState.Archives)}
          >
            <ArrowUpOnSquareStackIcon className="size-6" />
            Gerenciar arquivos
          </Button>

          <TitledDivider title="Detalhes" />

          <ButtonLink
            fontStrength="semibold"
            href={`/report/obra/${entry.data.id}`}
            target="_blank"
          >
            <DocumentTextIcon className="size-6" />
            Relatório
          </ButtonLink>

          {obra && obra.arquivos.length > 0 && (
            <>
              <TitledDivider title="Arquivos" />

              <ul>
                {obra?.arquivos.map((arquivo) => (
                  <li className="flex gap-2 p-1 odd:bg-slate-300 even:bg-slate-100">
                    <DocumentIcon className="size-6" />
                    <span
                      className="cursor-pointer underline text-sky-800 hover:text-sky-700 font-semibold text-sm"
                      onClick={() =>
                        window.open(
                          `${process.env.NEXT_PUBLIC_STATIC_SERVER_URI}/${obra.ano}/${arquivo.nome}`
                        )
                      }
                    >
                      {arquivo.nome}
                    </span>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}

      <Modal
        title={`Obra ${obra?.sp} - ${modal.toString()}`}
        visible={modal !== ModalState.Off}
        onClose={() => setModal(ModalState.Off)}
      >
        <Suspense fallback={<Loading />}>{modalBuilder()}</Suspense>
      </Modal>
    </div>
  );
};
