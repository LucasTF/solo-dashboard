"use client";

import Image from "next/image";
import { useEffect, useState, useTransition } from "react";
import { tv } from "tailwind-variants";
import { useRouter } from "next/navigation";

import {
  ArrowLeftEndOnRectangleIcon,
  BuildingOffice2Icon,
  GlobeAmericasIcon,
  HomeIcon,
  UserCircleIcon,
  UsersIcon,
} from "@heroicons/react/24/solid";

import { useSessionStore } from "@/lib/stores/session";
import { logout } from "@/lib/actions/auth/logout";
import { DEFAULT_UNAUTHENTICATED_REDIRECT } from "@/routes";
import ThemeSwitcher from "../ui/ThemeSwitcher";
import NavLink from "./Header/NavLink";
import { Bars3Icon } from "@heroicons/react/24/outline";
import Backdrop from "../ui/Backdrop";

const drawerNav = tv({
  base: "max-md:py-4 md:mt-4 md:flex-grow space-y-4 ease-out duration-300 max-md:fixed max-md:bg-slate-300 max-md:dark:bg-slate-800 max-md:w-full max-md:z-30",
  variants: {
    open: {
      true: "max-md:translate-y-16",
      false: "max-md:-translate-y-full",
    },
  },
});

const list = tv({
  slots: {
    ul: "space-y-4 px-2",
    ulTitle:
      "ml-2 text-sm text-zinc-600 dark:text-zinc-400 font-semibold select-none",
  },
});

const Navigation = () => {
  const [drawer, toggleDrawer] = useState(false);

  const [isPending, startTransition] = useTransition();
  const { session, restoreSession, dropSession } = useSessionStore();

  const router = useRouter();

  const { ul, ulTitle } = list();

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

  const onNavigationHandler = () => {
    toggleDrawer(false);
  };

  return (
    <aside className="flex flex-col max-md:w-full md:min-h-screen md:min-w-fit md:border-r border-sky-600 dark:border-slate-700 bg-slate-300 dark:bg-slate-800">
      <header className="p-4 flex items-center justify-between md:justify-center gap-2 shadow-lg bg-sky-600 dark:bg-slate-700 max-md:fixed max-md:min-w-full max-md:z-40 max-md:max-h-16">
        <button
          className="border border-slate-200 dark:border-slate-500 rounded-md p-2 md:hidden text-white"
          type="button"
          onClick={() => toggleDrawer((prevState) => !prevState)}
        >
          <Bars3Icon className="size-6" />
        </button>
        <div className="flex items-center gap-2">
          <Image
            src="/img/solo-logo-light.png"
            alt="Solo"
            width="32"
            height="32"
            priority
          />
          <span className="font-bold text-white">Solo Dashboard</span>
        </div>
        <div className="md:hidden">
          <ThemeSwitcher />
        </div>
      </header>
      <nav className={drawerNav({ open: drawer })}>
        {session && (
          <>
            <p className={ulTitle()}>Sessão</p>
            <ul className={ul()}>
              <li className="flex items-center gap-2 pl-2">
                <UserCircleIcon className="size-5" />
                <span>{session.name}</span>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => logoutHandler()}
                  className="flex items-center gap-2 pl-2 hover:text-red-600 ease-in-out duration-300"
                >
                  <ArrowLeftEndOnRectangleIcon className="size-5" />
                  <span>Sair</span>
                </button>
              </li>
            </ul>
          </>
        )}
        <p className={ulTitle()}>Navegação</p>
        <ul className={ul()}>
          <li onClick={() => onNavigationHandler()}>
            <NavLink href="/dashboard">
              <HomeIcon className="size-5" />
              <span>Início</span>
            </NavLink>
          </li>
          <li onClick={() => onNavigationHandler()}>
            <NavLink href="/dashboard/obras">
              <BuildingOffice2Icon className="size-5" />
              <span>Obras</span>
            </NavLink>
          </li>
          <li onClick={() => onNavigationHandler()}>
            <NavLink href="/dashboard/clientes">
              <GlobeAmericasIcon className="size-5" />
              <span>Clientes</span>
            </NavLink>
          </li>
        </ul>
        {session && session.isAdmin && (
          <>
            <p className={ulTitle()}>Administrativo</p>
            <ul className={ul()}>
              <li onClick={() => onNavigationHandler()}>
                <NavLink href="/dashboard/usuarios">
                  <UsersIcon className="size-5" />
                  <span>Usuários</span>
                </NavLink>
              </li>
            </ul>
          </>
        )}
      </nav>
      <div className="max-md:hidden mx-auto my-2">
        <ThemeSwitcher />
      </div>
      <footer className="max-md:hidden p-2 text-center bg-sky-600 dark:bg-slate-700">
        <span className="font-bold select-none text-sm text-white">
          Solo Engenharia Ltda.
        </span>
      </footer>
      <Backdrop visible={drawer} onClick={() => toggleDrawer(false)} />
    </aside>
  );
};

export default Navigation;
