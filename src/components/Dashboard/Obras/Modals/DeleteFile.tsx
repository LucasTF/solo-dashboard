"use client";

import Button from "@/components/ui/Button";
import { deleteFile } from "@/lib/actions/data/arquivos";
import { Arquivo } from "@/types/data/Arquivo";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useTransition } from "react";
import Loading from "@/components/ui/Loading";
import { toast } from "react-toastify";
import { useEntryStore } from "@/lib/stores/entry";
import { ObraWithFiles } from "@/types/data/Obra";

type DeleteFileProps = {
  file: Arquivo;
  closeModal: Function;
};

const DeleteFile = ({ file, closeModal }: DeleteFileProps) => {
  const [isPending, startTransition] = useTransition();

  const { updateEntry } = useEntryStore();

  const deleteFileHandler = () => {
    startTransition(async () => {
      const response = await deleteFile(file.id);
      if (response.success) {
        updateEntry((prevState) => {
          if (prevState) {
            const data = prevState.data as ObraWithFiles;
            const index = data.arquivos.indexOf(file);
            data.arquivos.splice(index, 1);
            return { ...prevState, data };
          } else return prevState;
        });
        toast(response.message, { type: "success" });
      } else toast(response.error, { type: "error" });
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
