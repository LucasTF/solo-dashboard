import Link, { LinkProps } from "next/link";
import { tv } from "tailwind-variants";
import React from "react";

type TileProps = {
  icon?: React.ReactNode;
  title: string;
} & LinkProps;

const tile = tv({
  base: "p-8 text-slate-600 dark:text-white bg-slate-200 dark:bg-zinc-800 border-2 border-slate-400 dark:border-zinc-900 rounded-lg ease-in-out duration-300 hover:scale-105 hover:text-sky-700 hover:border-sky-700 hover:dark:text-purple-500 hover:dark:border-purple-500 hover:dark:bg-slate-800",
});

export const Tile = ({ icon, title, href, ...rest }: TileProps) => {
  return (
    <Link href={href} className={tile()} {...rest}>
      {icon}
      <span className="font-bold">{title}</span>
    </Link>
  );
};
