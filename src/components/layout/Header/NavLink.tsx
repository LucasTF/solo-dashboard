"use client";

import React, { AnchorHTMLAttributes } from "react";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { VariantProps, tv } from "tailwind-variants";

const navLink = tv({
  base: "hover:text-sky-800 ease-in-out duration-300",
  variants: {
    selected: {
      true: "font-bold text-sky-800",
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
      className={navLink({ selected: pathname.startsWith(href) })}
      {...rest}
    >
      {children}
    </Link>
  );
};

export default NavLink;
