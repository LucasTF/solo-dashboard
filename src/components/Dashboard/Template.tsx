import React from "react";

type TemplateProps = {
  title: string;
  children?: React.ReactNode;
};

export const Template = ({ title, children }: TemplateProps) => {
  return (
    <>
      <h1 className="font-bold text-4xl w-11/12 mx-auto mb-8 text-white">
        {title}
      </h1>
      <main className="p-8 bg-slate-200 w-11/12 mx-auto rounded-md shadow-lg">
        {children}
      </main>
    </>
  );
};
