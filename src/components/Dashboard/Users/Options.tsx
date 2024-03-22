"use client";

import { Suspense, lazy, useState } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { tv } from "tailwind-variants";
import {
  ArrowLeftIcon,
  LockClosedIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

import { User } from "@prisma/client";

import { useEntryStore } from "@/lib/stores/entry";
import { useSessionStore } from "@/lib/stores/session";

import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import Loading from "@/components/ui/Loading";
import { Skeleton } from "@/components/ui/Skeleton";
import { TitledDivider } from "@/components/ui/TitledDivider";

const EditUserForm = lazy(() => import("./Modals/EditUser"));
const ResetPasswordForm = lazy(() => import("./Modals/ResetPassword"));
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
  const { entry, clearEntry } = useEntryStore();

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
          <ResetPasswordForm
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
          <button type="button" className="w-fit" onClick={() => clearEntry()}>
            <ArrowLeftIcon className="size-6" />
          </button>
          <div>
            <p className="text-center font-semibold">Usuário</p>
            <h2 className="font-bold text-center text-2xl">
              {user ? user.name : <Skeleton className="h-9 w-full" />}
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
