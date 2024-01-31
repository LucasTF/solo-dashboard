"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type NavLinkProps = {
  children?: React.ReactNode;
  href: string;
};

const NavLink = ({ children, href }: NavLinkProps) => {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={
        "hover:text-sky-800 ease-in-out duration-300" +
        " " +
        (pathname.startsWith(href) ? "font-bold text-sky-800" : "")
      }
    >
      {children}
    </Link>
  );
};

export default NavLink;
