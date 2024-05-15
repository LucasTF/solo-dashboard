"use client";

import { useTransition } from "react";
import { toast } from "react-toastify";
import { TrashIcon } from "@heroicons/react/24/outline";

import { useEntryStore } from "@/lib/stores/entry";
import Button from "@/components/ui/Button";
import Loading from "@/components/ui/Loading";

type DeleteFileProps = {
  file: any; //TODO: Replace with Arquivo Type
  closeModal: Function;
};

const DeleteFile = ({ file, closeModal }: DeleteFileProps) => {
  const [isPending, startTransition] = useTransition();

  const { refreshEntry } = useEntryStore();

  const deleteFileHandler = () => {
    startTransition(async () => {
      // TODO: Use Flask API implementation
      toast("Arquivo deletado com sucesso.");
      closeModal();
    });
  };

  const modalBuilder = () => {
    if (isPending) return <Loading />;
    return (
      <div className="p-4 space-y-4">
        <p>
          Você tem certeza que deseja deletar o arquivo{" "}
          <span className="font-semibold underline">{file.nome}</span>? Essa
          ação não pode ser revertida.
        </p>
        <Button
          color="red"
          fontStrength="semibold"
          className="ml-auto"
          onClick={() => deleteFileHandler()}
        >
          <TrashIcon className="size-6" />
          Deletar
        </Button>
      </div>
    );
  };

  return modalBuilder();
};

export default DeleteFile;
