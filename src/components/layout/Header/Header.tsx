"use client";

import {
  Bars3Icon,
  SunIcon,
  MoonIcon,
  UserCircleIcon,
  ArrowLeftStartOnRectangleIcon,
} from "@heroicons/react/24/outline";

import { useEffect, useState } from "react";

import Backdrop from "@/components/Backdrop/Backdrop";
import NavLink from "./NavLink";
import { useSessionStore } from "@/lib/stores/session";
import { useRouter } from "next/navigation";
import { logout } from "@/lib/actions/auth/logout";

const Header = () => {
  const [isDrawerOpen, toggleDrawer] = useState(false);

  const router = useRouter();

  const { session, restoreSession, dropSession } = useSessionStore();

  useEffect(() => {
    restoreSession();
  }, []);

  const logoutHandler = async () => {
    const response = await logout();
    dropSession();
    router.push("/login");
  };

  let drawerAnimation = isDrawerOpen
    ? "max-lg:translate-x-0"
    : "max-lg:-translate-x-full";

  return (
    <header className="h-14 max-h-14 bg-slate-200 sticky top-0 left-0">
      <div className="lg:hidden h-full w-full flex justify-between items-center px-5">
        <button
          className="bg-slate-200 rounded-md p-2"
          type="button"
          onClick={() => toggleDrawer(true)}
        >
          <Bars3Icon className="w-6 h-6" />
        </button>
        <button
          type="button"
          className="bg-slate-200 rounded-md p-2 hover:shadow-md ease-in-out duration-300"
        >
          <MoonIcon className="w-6 h-6" />
        </button>
      </div>

      <nav
        className={
          "max-lg:absolute max-lg:top-0 max-lg:left-0 max-md:w-3/5 max-lg:h-screen max-lg:bg-slate-200 max-lg:z-40 flex max-lg:flex-col lg:items-center lg:h-full lg:justify-around transition ease-in duration-300" +
          " " +
          drawerAnimation
        }
      >
        <h1 className="font-bold max-lg:hidden">Solo Dashboard</h1>

        <div className="lg:hidden bg-slate-300 border-b-slate-400 border-[1px] p-4 flex flex-col gap-4 justify-center items-center">
          <div className="flex flex-col items-center gap-1">
            <UserCircleIcon className="w-12 h-12" />
            <span className="font-semibold text-sm">Usuário</span>
          </div>
          <button
            type="button"
            className="font-bold bg-red-600 px-2 py-1 flex rounded-md text-white border-red-700 shadow-lg border-2"
            onClick={() => logoutHandler()}
          >
            <ArrowLeftStartOnRectangleIcon className="w-6 h-6" />
            <span>Sair</span>
          </button>
        </div>

        <ul className="flex max-lg:flex-col gap-4 lg:gap-2 max-lg:m-5">
          <li>
            <NavLink href="/dashboard/clientes">Clientes</NavLink>
          </li>
          <li>
            <NavLink href="/dashboard/obras">Obras</NavLink>
          </li>
          <li>
            <NavLink href="#">Orçamentos</NavLink>
          </li>
          <li>
            <NavLink href="#">Histórico</NavLink>
          </li>
        </ul>

        <ul className="flex gap-4 items-center max-lg:hidden">
          <li>
            <p className="flex gap-1">
              <UserCircleIcon className="w-6 h-6" />
              <span className="font-bold">{session?.name}</span>
            </p>
          </li>

          <li>
            <button
              type="button"
              className="flex gap-1 p-2 hover:text-red-600 hover:shadow-md ease-in-out duration-300"
              onClick={() => logoutHandler()}
            >
              <ArrowLeftStartOnRectangleIcon className="w-6 h-6" />
              <span className="font-bold">Sair</span>
            </button>
          </li>

          <li>
            <button
              type="button"
              className="bg-slate-200 rounded-md p-2 hover:shadow-md ease-in-out duration-300"
            >
              <MoonIcon className="w-6 h-6" />
            </button>
          </li>
        </ul>
      </nav>

      <Backdrop visible={isDrawerOpen} onClick={() => toggleDrawer(false)} />
    </header>
  );
};
export default Header;
