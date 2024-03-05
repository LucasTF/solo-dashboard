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

const EditUserForm = lazy(() => import("./Modals/EditUser"));

enum ModalState {
  Off,
  Edit = "Editar Usuário",
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

export const UsersOptions = () => {
  const [modal, setModal] = useState<ModalState>(ModalState.Off);

  const { resolvedTheme } = useTheme();

  const pathname = usePathname();

  const { entry } = useEntryStore();

  const user = entry?.data as User;

  const modalBuilder = () => {
    switch (modal) {
      case ModalState.Edit:
        return <EditUserForm user={user} />;
    }
  };

  return (
    <aside className={options({ visible: entry !== null })}>
      {entry && entry?.table === pathname && (
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-center font-semibold">Usuário</p>
            <h2 className="font-bold text-center sm:text-2xl xl:text-4xl">
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
          >
            <LockClosedIcon className="size-6" />
            Nova senha
          </Button>

          <Button
            color="red"
            fontStrength="semibold"
            type="button"
            disabled={!user}
          >
            <TrashIcon className="size-6" />
            Deletar usuário
          </Button>
        </div>
      )}
      <Modal
        title={`Usuário ${user?.email} - ${modal.toString()}`}
        visible={modal !== ModalState.Off}
        onClose={() => setModal(ModalState.Off)}
      >
        <Suspense fallback={<Loading />}>{modalBuilder()}</Suspense>
      </Modal>
    </aside>
  );
};
