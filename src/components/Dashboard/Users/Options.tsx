"use client";

import { Suspense, lazy, useState } from "react";
import { tv } from "tailwind-variants";
import {
  LockClosedIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import Loading from "@/components/ui/Loading";

import { useEntryStore } from "@/lib/stores/entry";
import { usePathname } from "next/navigation";
import { TitledDivider } from "@/components/ui/TitledDivider";
import { useTheme } from "next-themes";
import { User } from "@/types/data/User";
import ResetPassword from "./Modals/ResetPassword";
import { createPortal } from "react-dom";
import { useSessionStore } from "@/lib/stores/session";

const EditUserForm = lazy(() => import("./Modals/EditUser"));
const DeleteUser = lazy(() => import("./Modals/DeleteUser"));

enum ModalState {
  Off,
  Edit = "Editar Usuário",
  Delete = "Deletar Usuário",
  ResetPassword = "Atualizar Senha",
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

export const UsersOptions = () => {
  const [modal, setModal] = useState<ModalState>(ModalState.Off);

  const { resolvedTheme } = useTheme();

  const pathname = usePathname();

  const { session } = useSessionStore();
  const { entry } = useEntryStore();

  const user = entry?.data as User;

  const modalBuilder = () => {
    switch (modal) {
      case ModalState.Edit:
        return (
          <EditUserForm
            user={user}
            closeModal={() => setModal(ModalState.Off)}
          />
        );
      case ModalState.Delete:
        return <DeleteUser closeModal={() => setModal(ModalState.Off)} />;
      case ModalState.ResetPassword:
        return (
          <ResetPassword
            userId={user.id}
            closeModal={() => setModal(ModalState.Off)}
          />
        );
    }
  };

  return (
    <aside className={options({ open: entry !== null })}>
      {entry && entry?.table === pathname && (
        <div className="flex flex-col gap-4 m-4">
          <div>
            <p className="text-center font-semibold">Usuário</p>
            <h2 className="font-bold text-center text-2xl">
              {user ? (
                user.name + " " + user.surname
              ) : (
                <div className="animate-pulse bg-slate-300 dark:bg-zinc-700 h-10 w-full rounded-md"></div>
              )}
            </h2>
          </div>

          <TitledDivider title="Opções" />

          <Button
            color={resolvedTheme === "dark" ? "lightindigo" : "lightblue"}
            fontStrength="semibold"
            type="button"
            disabled={!user}
            onClick={() => setModal(ModalState.Edit)}
          >
            <PencilSquareIcon className="size-6" />
            Editar usuário
          </Button>

          <Button
            color={resolvedTheme === "dark" ? "lightindigo" : "lightblue"}
            fontStrength="semibold"
            type="button"
            disabled={!user}
            onClick={() => setModal(ModalState.ResetPassword)}
          >
            <LockClosedIcon className="size-6" />
            Nova senha
          </Button>

          <Button
            color="red"
            fontStrength="semibold"
            type="button"
            disabled={!user}
            onClick={() => setModal(ModalState.Delete)}
          >
            <TrashIcon className="size-6" />
            Deletar usuário
          </Button>
        </div>
      )}

      {session &&
        createPortal(
          <Modal
            title={`${user?.email} - ${modal.toString()}`}
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
