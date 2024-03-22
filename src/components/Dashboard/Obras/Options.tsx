"use client";

import { Suspense, lazy, useState } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import { tv } from "tailwind-variants";
import { useTheme } from "next-themes";
import {
  ArrowLeftIcon,
  ArrowUpOnSquareStackIcon,
  DocumentTextIcon,
  MapPinIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import { TrashIcon } from "@heroicons/react/24/solid";

import { Arquivo, Obra } from "@prisma/client";

import { useEntryStore } from "@/lib/stores/entry";
import { useSessionStore } from "@/lib/stores/session";

import Button, { ButtonLink } from "@/components/ui/Button";
import Loading from "@/components/ui/Loading";
import Modal from "@/components/ui/Modal";
import { FileLink } from "@/components/ui/FileLink";
import { Skeleton } from "@/components/ui/Skeleton";
import { TitledDivider } from "@/components/ui/TitledDivider";
import { EntryObra } from "@/types/data/Obra";

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
  base: "fixed h-full top-16 md:top-0 left-0 md:min-w-52 md:max-w-52 ease-in-out duration-300 bg-slate-300 dark:bg-slate-800",
  variants: {
    open: {
      true: "translate-x-0",
      false: "-translate-x-full",
    },
  },
});

export const ObrasOptions = () => {
  const [modal, setModal] = useState<ModalState>(ModalState.Off);
  const [file, setFile] = useState<Arquivo>();

  const { resolvedTheme } = useTheme();

  const pathname = usePathname();

  const { session } = useSessionStore();
  const { entry, clearEntry } = useEntryStore();

  const obra = entry?.data as EntryObra;

  const modalBuilder = () => {
    switch (modal) {
      case ModalState.Edit:
        return (
          <EditObraForm
            obra={obra}
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
    <aside className={options({ open: entry !== null })}>
      {entry && entry?.table === pathname && (
        <div className="flex flex-col gap-4 m-4">
          <button type="button" className="w-fit" onClick={() => clearEntry()}>
            <ArrowLeftIcon className="size-6" />
          </button>

          <div>
            <p className="text-center font-semibold">Obra</p>
            <h2 className="font-bold text-center text-4xl lg:text-2xl xl:text-3xl">
              {obra ? obra.cod_obra : <Skeleton className="w-full" />}
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
            color="green"
            fontStrength="semibold"
            disabled={!obra}
            href={`https://maps.google.com/?q=${encodeURIComponent(
              obra?.tipo_logo + " " + obra?.logradouro
            )}`}
            rel="noopener noreferrer"
            target="_blank"
          >
            <MapPinIcon className="size-6" />
            Abrir no Maps
          </ButtonLink>

          <ButtonLink
            color={resolvedTheme === "dark" ? "indigo" : "blue"}
            fontStrength="semibold"
            href={`/report/obra/${entry.id}`}
            target="_blank"
          >
            <DocumentTextIcon className="size-6" />
            Relatório
          </ButtonLink>

          {obra.arquivos && obra.arquivos.length > 0 && (
            <>
              <TitledDivider title="Arquivos" />

              <ul>
                {obra?.arquivos.map((arquivo) => (
                  <li key={arquivo.id}>
                    <div className="flex justify-between items-center gap-2">
                      <FileLink
                        title={arquivo.nome}
                        href={`${process.env.NEXT_PUBLIC_STATIC_SERVER_URI}/${
                          obra.ano
                        }/${encodeURIComponent(arquivo.nome)}`}
                        className="text-xs"
                      />
                      {session?.isAdmin && (
                        <TrashIcon
                          className="size-6 text-red-600 cursor-pointer"
                          onClick={() => {
                            setFile(arquivo);
                            setModal(ModalState.DeleteFile);
                          }}
                        />
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}

      {session &&
        createPortal(
          <Modal
            title={`Obra ${obra?.cod_obra} - ${modal.toString()}`}
            visible={modal !== ModalState.Off}
            onClose={() => setModal(ModalState.Off)}
          >
            <Suspense fallback={<Loading />}>{modalBuilder()}</Suspense>
          </Modal>,
          document.body
        )}
    </aside>
  );
};
