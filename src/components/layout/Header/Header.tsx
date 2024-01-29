"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Bars3Icon } from "@heroicons/react/24/outline";
import { useState } from "react";
import Backdrop from "@/components/Backdrop/Backdrop";

const Header = () => {
  const pathname = usePathname();

  const [isDrawerOpen, toggleDrawer] = useState(false);

  let drawerAnimation = isDrawerOpen
    ? "max-lg:translate-x-0"
    : "max-lg:-translate-x-full";

  return (
    <header className="py-4 flex justify-between px-10 lg:px-0 lg:justify-around bg-slate-200 sticky top-0 left-0">
      <button className="lg:hidden" onClick={() => toggleDrawer(true)}>
        <Bars3Icon className="w-6 h-6" />
      </button>

      <h1 className="font-bold">Solo Dashboard</h1>

      <nav
        className={
          "max-lg:absolute max-lg:top-0 max-lg:left-0 max-md:w-3/5 max-lg:h-screen max-lg:bg-slate-200 max-lg:border-r-2 max-lg:border-slate-300 max-lg:z-40 transition ease-in duration-300" +
          " " +
          drawerAnimation
        }
      >
        <ul className="flex flex-col lg:flex-row gap-4 lg:gap-2 my-16 mx-4 lg:m-0">
          <li>
            <Link
              href="/dashboard/clientes"
              className={
                pathname.startsWith("/dashboard/clientes")
                  ? "font-bold text-sky-800"
                  : ""
              }
            >
              Clientes
            </Link>
          </li>
          <li>
            <Link href="#">Obras Executadas</Link>
          </li>
          <li>
            <Link href="#">Orçamentos</Link>
          </li>
          <li>
            <Link href="#">Histórico</Link>
          </li>
        </ul>
      </nav>
      <Backdrop visible={isDrawerOpen} onClick={() => toggleDrawer(false)} />
    </header>
  );
};
export default Header;
