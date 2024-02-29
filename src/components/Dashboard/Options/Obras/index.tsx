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
import { TitledDivider } from "@/components/ui/TitledDivider";
import Modal from "@/components/ui/Modal";
import Loading from "../Loading";
import { TrashIcon } from "@heroicons/react/24/solid";
import { Arquivo } from "@/types/data/Arquivo";

const DeleteFile = lazy(() => import("./Form/DeleteFile"));
const EditObraForm = lazy(() => import("./Form/EditObra"));
const Upload = lazy(() => import("./Form/Upload"));

enum ModalState {
  Off,
  Edit = "Editar Obra",
  Upload = "Upload de arquivos",
  DeleteFile = "Deletar arquivo",
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
  const [file, setFile] = useState<Arquivo>();

  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { entry } = useEntryStore();

  const obra = entry?.data as ObraWithFiles;

  const modalBuilder = () => {
    switch (modal) {
      case ModalState.Edit:
        return <EditObraForm obra={obra as Obra} />;
      case ModalState.Upload:
        return <Upload obra={obra} />;
      case ModalState.DeleteFile:
        return (
          <DeleteFile
            file={file!}
            closeModal={() => setModal(ModalState.Off)}
          />
        );
    }
  };

  return (
    <aside className={options({ visible: entry !== null })}>
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
            onClick={() => setModal(ModalState.Upload)}
          >
            <ArrowUpOnSquareStackIcon className="size-6" />
            Upload de arquivos
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
                  <li className="flex justify-between p-1 odd:bg-slate-300 even:bg-slate-100">
                    <div className="flex gap-2">
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
                    </div>
                    <TrashIcon
                      className="size-6 text-red-600 cursor-pointer"
                      onClick={() => {
                        setFile(arquivo);
                        setModal(ModalState.DeleteFile);
                      }}
                    />
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
    </aside>
  );
};
