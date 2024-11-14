"use client";

import Image from "next/image";
import { useEffect, useState, useTransition } from "react";
import { tv } from "tailwind-variants";
import { useRouter } from "next/navigation";

import {
  ArrowLeftEndOnRectangleIcon,
  BuildingOffice2Icon,
  ChevronDoubleRightIcon,
  HomeIcon,
  UserCircleIcon,
  UsersIcon,
} from "@heroicons/react/24/solid";

import { useSessionStore } from "@/lib/stores/session";
import ThemeSwitcher from "@/components/ui/Navigation/ThemeSwitcher";
import NavLink from "@/components/ui/Navigation/NavLink";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Backdrop from "../ui/Backdrop";
import Spinner from "../ui/Spinner";
import { useScrollDirection } from "@/lib/hooks/scrollDirection";
import { toast } from "react-toastify";

const drawerNav = tv({
  base: "max-md:py-4 md:mt-4 md:flex-grow space-y-4 ease-out duration-300 max-md:fixed max-md:bg-slate-300 max-md:dark:bg-slate-800 max-md:w-full max-md:z-30",
  variants: {
    open: {
      true: "max-md:translate-y-16",
      false: "max-md:-translate-y-full",
    },
  },
});

const header = tv({
  base: "max-md:fixed max-h-16 p-4 flex items-center justify-between md:justify-center gap-2 shadow-lg bg-bar-gradient max-md:min-w-full max-md:z-40 ease-in-out transition-all duration-300",
  variants: {
    down: {
      true: "max-md:-top-16",
      false: "max-md:top-0",
    },
  },
});

const list = tv({
  slots: {
    ul: "space-y-4 px-2 [&>li]:text-sm",
    ulTitle:
      "flex gap-1 ml-2 text-zinc-600 dark:text-zinc-400 font-semibold select-none",
  },
});

const icon = tv({
  base: "size-5",
  variants: {
    item_icon: {
      true: "size-3",
    },
  },
});

const Navigation = () => {
  const [drawer, toggleDrawer] = useState(false);

  const [isPending, startTransition] = useTransition();
  const { session, restoreSession, dropSession } = useSessionStore();

  const router = useRouter();

  const scrollDirection = useScrollDirection();

  const { ul, ulTitle } = list();

  useEffect(() => {
    restoreSession();
  }, []);

  const logoutHandler = () => {
    startTransition(async () => {
      const response = await fetch(process.env.NEXT_PUBLIC_API_URI + "/logout");

      if (response.ok) {
        const data = await response.json();
        toast(data.message, { type: "success" });

        dropSession();
        router.push("/dashboard/login");
      }
    });
  };

  const onNavigationHandler = () => {
    toggleDrawer(false);
  };

  return (
    <aside className="md:fixed flex flex-col max-md:w-full md:min-h-screen md:min-w-52 md:border-r border-sky-600 dark:border-indigo-700 bg-slate-300 dark:bg-slate-800">
      <header
        className={header({ down: !drawer && scrollDirection === "down" })}
      >
        <button
          className="border border-slate-200 dark:border-slate-500 rounded-md p-2 md:hidden text-white"
          type="button"
          onClick={() => toggleDrawer((prevState) => !prevState)}
        >
          {drawer ? (
            <XMarkIcon className="size-6" />
          ) : (
            <Bars3Icon className="size-6" />
          )}
        </button>
        <div className="flex items-center gap-2">
          <Image
            src="/img/solo-logo-light.png"
            alt="Solo"
            width="32"
            height="32"
            priority
          />
          <span className="font-bold text-white select-none">
            Solo Dashboard
          </span>
        </div>
        <div className="md:hidden text-white">
          <ThemeSwitcher size={6} />
        </div>
      </header>

      <nav className={drawerNav({ open: drawer })}>
        {session && !isPending ? (
          <ul className={ul()}>
            <li className="flex items-center gap-2 pl-2 select-none">
              <UserCircleIcon className={icon()} />
              <span>{session.name}</span>
            </li>
            <li>
              <button
                type="button"
                onClick={() => logoutHandler()}
                className="w-full flex items-center gap-2 pl-2 hover:text-red-600 ease-in-out duration-300"
              >
                <ArrowLeftEndOnRectangleIcon className={icon()} />
                <span>Sair</span>
              </button>
            </li>
          </ul>
        ) : (
          <div className="flex items-center justify-center">
            <Spinner size="sm" />
          </div>
        )}

        <hr className="border-slate-400 dark:border-slate-700" />

        <p className="mx-2" onClick={() => onNavigationHandler()}>
          <NavLink href="/dashboard">
            <HomeIcon className={icon()} />
            <span>Início</span>
          </NavLink>
        </p>

        <p className={ulTitle()}>
          <BuildingOffice2Icon className={icon()} />
          <span>Obras</span>
        </p>

        <ul className={ul()}>
          <li onClick={() => onNavigationHandler()}>
            <NavLink href="/dashboard/obras">
              <ChevronDoubleRightIcon className={icon({ item_icon: true })} />
              <span>Listagem</span>
            </NavLink>
          </li>
          <li onClick={() => onNavigationHandler()}>
            <NavLink href="/dashboard/obras/new">
              <ChevronDoubleRightIcon className={icon({ item_icon: true })} />
              <span>Cadastro</span>
            </NavLink>
          </li>
        </ul>

        {session && session.isAdmin && (
          <>
            <p className={ulTitle()}>
              <UsersIcon className={icon()} />
              <span>Usuários</span>
            </p>
            <ul className={ul()}>
              <li onClick={() => onNavigationHandler()}>
                <NavLink href="/dashboard/usuarios">
                  <ChevronDoubleRightIcon
                    className={icon({ item_icon: true })}
                  />
                  <span>Listagem</span>
                </NavLink>
              </li>
            </ul>
          </>
        )}
      </nav>
      <div className="max-md:hidden mx-auto my-2">
        <ThemeSwitcher />
      </div>
      <footer className="max-md:hidden p-2 text-center bg-bar-gradient">
        <span className="font-bold select-none text-sm text-white">
          Solo Engenharia Ltda.
        </span>
      </footer>
      <Backdrop visible={drawer} onClick={() => toggleDrawer(false)} />
    </aside>
  );
};

export default Navigation;
