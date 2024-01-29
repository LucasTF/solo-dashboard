"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();

  return (
    <header className="py-4 flex justify-around bg-slate-200 sticky top-0 left-0">
      <h1 className="font-bold">Solo Dashboard</h1>
      <nav className="flex gap-4">
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
        <Link href="#">Obras Executadas</Link>
        <Link href="#">Orçamentos</Link>
        <Link href="#">Histórico</Link>
      </nav>
    </header>
  );
};
export default Header;
