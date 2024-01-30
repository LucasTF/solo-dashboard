import { FormEventHandler } from "react";

type BaseProps = {
  children?: React.ReactNode;
  onSubmit?: FormEventHandler<HTMLFormElement>;
};

export const Base = ({ children, onSubmit }: BaseProps) => {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-2 px-8 pb-8">
      {children}
    </form>
  );
};
