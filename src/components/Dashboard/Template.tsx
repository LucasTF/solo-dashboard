"use client";

import React from "react";

type TemplateProps = {
  title: string;
  children?: React.ReactNode;
};

export const Template = ({ title, children }: TemplateProps) => {
  return (
    <>
      <h1 className="font-bold text-4xl w-11/12 mx-auto my-8 text-white select-none">
        {title}
      </h1>
      <main className="flex flex-col-reverse lg:grid lg:grid-cols-6 py-8 px-4 md:p-8 bg-slate-200 dark:bg-zinc-800 md:w-11/12 md:mx-auto md:rounded-md md:shadow-lg">
        {children}
      </main>
    </>
  );
};
