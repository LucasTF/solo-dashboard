"use client";

import { Suspense, lazy, useState } from "react";
import { tv } from "tailwind-variants";
import {
  ArrowUpOnSquareStackIcon,
  DocumentIcon,
  DocumentTextIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";

import Button, { ButtonLink } from "@/components/ui/Button";

import { useEntryStore } from "@/lib/stores/entry";
import { usePathname } from "next/navigation";
import { Obra, ObraWithFiles } from "@/types/data/Obra";
import { TitledDivider } from "@/components/ui/TitledDivider";
import Modal from "@/components/ui/Modal";
import Loading from "@/components/ui/Loading";
import { TrashIcon } from "@heroicons/react/24/solid";
import { Arquivo } from "@/types/data/Arquivo";
import { useTheme } from "next-themes";
import { useSessionStore } from "@/lib/stores/session";

const DeleteFile = lazy(() => import("./Modals/DeleteFile"));
const EditObraForm = lazy(() => import("./Modals/EditObra"));
const Upload = lazy(() => import("./Modals/Upload"));

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

  const { resolvedTheme } = useTheme();

  const pathname = usePathname();

  const { session } = useSessionStore();
  const { entry } = useEntryStore();

  const obra = entry?.data as ObraWithFiles;

  const modalBuilder = () => {
    switch (modal) {
      case ModalState.Edit:
        return (
          <EditObraForm
            obra={obra as Obra}
            closeModal={() => setModal(ModalState.Off)}
          />
        );
      case ModalState.Upload:
        return (
          <Upload obra={obra} closeModal={() => setModal(ModalState.Off)} />
        );
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
      {entry && entry?.table === pathname && (
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-center font-semibold">Obra</p>
            <h2 className="font-bold text-center text-4xl lg:text-2xl xl:text-3xl">
              {obra ? (
                obra.sp
              ) : (
                <div className="animate-pulse bg-slate-300 dark:bg-zinc-700 h-8 w-full rounded-md"></div>
              )}
            </h2>
          </div>

          {session?.isAdmin && (
            <>
              <TitledDivider title="Opções" />

              <Button
                color={resolvedTheme === "dark" ? "lightindigo" : "lightblue"}
                fontStrength="semibold"
                type="button"
                disabled={!obra}
                onClick={() => setModal(ModalState.Edit)}
              >
                <PencilSquareIcon className="size-6" />
                Editar obra
              </Button>

              <Button
                color="red"
                fontStrength="semibold"
                type="button"
                disabled={!obra}
                onClick={() => setModal(ModalState.Upload)}
              >
                <ArrowUpOnSquareStackIcon className="size-6" />
                Upload de arquivos
              </Button>
            </>
          )}

          <TitledDivider title="Detalhes" />

          <ButtonLink
            color={resolvedTheme === "dark" ? "indigo" : "blue"}
            fontStrength="semibold"
            href={`/report/obra/${entry.id}`}
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
                  <li className="flex justify-between p-1" key={arquivo.id}>
                    <div className="flex gap-2">
                      <DocumentIcon className="size-6" />
                      <span
                        className="cursor-pointer underline text-sky-800 dark:text-purple-500 hover:text-sky-700 dark:hover:text-purple-400 font-semibold text-sm"
                        onClick={() =>
                          window.open(
                            `${process.env.NEXT_PUBLIC_STATIC_SERVER_URI}/${obra.ano}/${arquivo.nome}`
                          )
                        }
                      >
                        {arquivo.nome}
                      </span>
                    </div>
                    {session?.isAdmin && (
                      <TrashIcon
                        className="size-6 text-red-600 cursor-pointer"
                        onClick={() => {
                          setFile(arquivo);
                          setModal(ModalState.DeleteFile);
                        }}
                      />
                    )}
                  </li>
                ))}
              </ul>
            </>
          )}
          <hr className="m-2 border-slate-300 dark:border-zinc-700 border-2 lg:hidden" />
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
