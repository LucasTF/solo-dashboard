"use client";

import React, { AnchorHTMLAttributes } from "react";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { VariantProps, tv } from "tailwind-variants";

const navLink = tv({
  base: "flex items-center pl-2 gap-2 rounded-md hover:text-sky-800 dark:hover:text-purple-500 ease-in-out duration-300",
  variants: {
    selected: {
      true: "py-1 font-bold text-white bg-sky-600 bg-opacity-90 dark:bg-purple-500 dark:bg-opacity-50 hover:text-white dark:hover:text-white",
    },
  },
});

type NavLinkProps = VariantProps<typeof navLink> &
  LinkProps &
  AnchorHTMLAttributes<HTMLAnchorElement>;

const NavLink = ({ children, href, selected, ...rest }: NavLinkProps) => {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={navLink({ selected: pathname === href })}
      {...rest}
    >
      {children}
    </Link>
  );
};

export default NavLink;
