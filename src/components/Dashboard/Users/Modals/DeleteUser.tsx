"use client";

import { useTransition } from "react";
import { toast } from "react-toastify";
import { User } from "@prisma/client";
import { TrashIcon } from "@heroicons/react/24/outline";

import { useEntryStore } from "@/lib/stores/entry";
import { deleteUser } from "@/lib/actions/data/users";
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

  const user = entry?.data as User;

  const deleteUserHandler = () => {
    startTransition(async () => {
      const response = await deleteUser(user.id);
      if (response.success) {
        setTableData((prevState) => {
          if (entry) {
            console.log(entry.tableIndex);
            prevState.splice(entry.tableIndex, 1);
          }
          return prevState;
        });
        toast(response.message, { type: "success" });
        clearEntry();
      } else toast(response.error, { type: "error" });
      closeModal();
    });
  };

  const modalBuilder = () => {
    if (isPending) return <Loading />;
    return (
      <div className="p-4 space-y-4">
        <p>
          Você tem certeza que deseja deletar o usuário{" "}
          <span className="font-semibold underline">{user.email}</span>? Essa
          ação não pode ser revertida.
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
