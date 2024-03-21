"use client";

import { DocumentIcon } from "@heroicons/react/24/solid";
import React from "react";
import { tv } from "tailwind-variants";

type FileLinkProps = {
  title: string;
  href: string;
  className?: string;
};

const linkTitle = tv({
  base: "cursor-pointer underline text-sky-800 dark:text-purple-500 hover:text-sky-700 dark:hover:text-purple-400 font-semibold",
});

export const FileLink = ({ title, href, className }: FileLinkProps) => {
  return (
    <div className="flex items-center gap-1">
      <DocumentIcon className="size-4" />
      <span
        className={linkTitle({ className })}
        onClick={() => window.open(href)}
      >
        {title}
      </span>
    </div>
  );
};
