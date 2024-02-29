"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import {
  Bars3Icon,
  SunIcon,
  MoonIcon,
  UserCircleIcon,
  ArrowLeftStartOnRectangleIcon,
} from "@heroicons/react/24/outline";

import { logout } from "@/lib/actions/auth/logout";

import Backdrop from "@/components/ui/Backdrop";
import NavLink from "./NavLink";
import { useSessionStore } from "@/lib/stores/session";
import { DEFAULT_UNAUTHENTICATED_REDIRECT } from "@/routes";
import { tv } from "tailwind-variants";

const drawer = tv({
  base: "max-lg:absolute max-lg:top-0 max-lg:left-0 max-lg:w-2/5 max-lg:h-screen max-lg:bg-slate-200 max-lg:z-40 flex max-lg:flex-col lg:items-center lg:h-full lg:justify-around transition ease-in duration-300",
  variants: {
    open: {
      true: "max-lg:translate-x-0",
      false: "max-lg:-translate-x-full",
    },
  },
});

const Header = () => {
  const [isDrawerOpen, toggleDrawer] = useState(false);
  const [isPending, startTransition] = useTransition();

  const { session, restoreSession, dropSession } = useSessionStore();

  const router = useRouter();

  useEffect(() => {
    restoreSession();
  }, []);

  const logoutHandler = () => {
    startTransition(async () => {
      await logout();
      dropSession();
      router.push(DEFAULT_UNAUTHENTICATED_REDIRECT);
    });
  };

  return (
    <header className="h-14 max-h-14 border-b-2 border-slate-400 bg-slate-200 sticky top-0 left-0 z-10">
      <div className="lg:hidden h-full w-full flex justify-between items-center px-5">
        <button
          className="bg-slate-200 rounded-md p-2"
          type="button"
          onClick={() => toggleDrawer(true)}
        >
          <Bars3Icon className="size-6" />
        </button>
        <button
          type="button"
          className="bg-slate-200 rounded-md p-2 hover:shadow-md ease-in-out duration-300"
        >
          <MoonIcon className="size-6" />
        </button>
      </div>

      <nav className={drawer({ open: isDrawerOpen })}>
        <h1 className="font-bold select-none max-lg:hidden">Solo Dashboard</h1>

        <div className="lg:hidden bg-slate-300 border-b-slate-400 border-[1px] p-4 flex flex-col gap-4 justify-center items-center">
          <div className="flex flex-col items-center gap-1">
            <UserCircleIcon className="size-12" />
            {!isPending && (
              <span className="font-semibold text-sm select-none">
                {session?.name}
              </span>
            )}
          </div>
          {isPending ? (
            <p className="font-bold">Saindo...</p>
          ) : (
            <button
              type="button"
              className="font-bold bg-red-600 px-2 py-1 flex rounded-md text-white border-red-700 shadow-lg border-2"
              onClick={() => logoutHandler()}
            >
              <ArrowLeftStartOnRectangleIcon className="size-6" />
              <span>Sair</span>
            </button>
          )}
        </div>

        <ul className="flex max-lg:flex-col gap-4 lg:gap-3 max-lg:m-5">
          <li>
            <NavLink href="/dashboard/clientes">Clientes</NavLink>
          </li>
          <li>
            <NavLink href="/dashboard/obras">Obras</NavLink>
          </li>
          <li>
            <NavLink href="#">Orçamentos</NavLink>
          </li>
        </ul>

        {isPending ? (
          <p className="font-bold">Saindo...</p>
        ) : (
          <ul className="flex gap-4 items-center max-lg:hidden">
            <li>
              <p className="flex gap-1">
                <UserCircleIcon className="size-6" />
                <span className="font-bold select-none">{session?.name}</span>
              </p>
            </li>

            <li>
              <button
                type="button"
                className="flex gap-1 p-2 hover:text-red-600 hover:shadow-md ease-in-out duration-300"
                onClick={() => logoutHandler()}
              >
                <ArrowLeftStartOnRectangleIcon className="size-6" />
                <span className="font-bold">Sair</span>
              </button>
            </li>

            <li>
              <button
                type="button"
                className="bg-slate-200 rounded-md p-2 hover:shadow-md ease-in-out duration-300"
              >
                <MoonIcon className="size-6" />
              </button>
            </li>
          </ul>
        )}
      </nav>

      <Backdrop visible={isDrawerOpen} onClick={() => toggleDrawer(false)} />
    </header>
  );
};
export default Header;
