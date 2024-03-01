"use client";

import { tv } from "tailwind-variants";
import {
  LockClosedIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

import Button from "@/components/ui/Button";

import { useEntryStore } from "@/lib/stores/entry";
import { usePathname, useSearchParams } from "next/navigation";
import { TitledDivider } from "@/components/ui/TitledDivider";
import { useTheme } from "next-themes";
import { User } from "@/types/data/User";

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
  const { resolvedTheme } = useTheme();

  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { entry } = useEntryStore();

  const user = entry?.data as User;

  return (
    <aside className={options({ visible: entry !== null })}>
      {entry && searchParams.size > 0 && entry?.table === pathname && (
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
    </aside>
  );
};
