"use client";

import { useTransition } from "react";
import { toast } from "react-toastify";
import { TrashIcon } from "@heroicons/react/24/outline";

import { useEntryStore } from "@/lib/stores/entry";
import { useTableStore } from "@/lib/stores/table";

import Button from "@/components/ui/Button";
import Loading from "@/components/ui/Loading";

type DeleteUserProps = {
  closeModal: Function;
};

const DeleteUser = ({ closeModal }: DeleteUserProps) => {
  const [isPending, startTransition] = useTransition();

  const { entry, clearEntry } = useEntryStore();
  const { setTableData } = useTableStore();

  const deleteUserHandler = () => {
    startTransition(async () => {
      // TODO: Use Flask API to delete user
    });
  };

  const modalBuilder = () => {
    if (isPending) return <Loading />;
    return (
      <div className="p-4 space-y-4">
        {/* TODO: Replace 'email_placeholder' with email from User Type */}
        <p>
          Você tem certeza que deseja deletar o usuário{" "}
          <span className="font-semibold underline">email_placeholder</span>?
          Essa ação não pode ser revertida.
        </p>
        <Button
          color="red"
          fontStrength="semibold"
          className="ml-auto"
          onClick={() => deleteUserHandler()}
        >
          <TrashIcon className="size-6" />
          Deletar
        </Button>
      </div>
    );
  };

  return modalBuilder();
};

export default DeleteUser;
