import React from "react";

type BaseHeaderProps = {
  title: string;
  children?: React.ReactNode;
};

export const BaseHeader = ({ title, children }: BaseHeaderProps) => {
  return (
    <header className="px-4 min-h-16 flex items-center gap-4 bg-gradient-to-b from-slate-300 to-slate-200 dark:bg-none">
      <h1 className="text-black font-bold grow text-4xl dark:text-white select-none">
        {title}
      </h1>
      {children}
    </header>
  );
};
