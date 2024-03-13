import { tv } from "tailwind-variants";

type TitledDividerProps = {
  title: string;
};

const titledDivider = tv({
  slots: {
    base: "relative flex items-center",
    divider: "flex-grow border-t-4 border-slate-400 dark:border-zinc-700",
    text: "flex-shrink mx-4 font-semibold select-none",
  },
});

const { base, text, divider } = titledDivider();

export const TitledDivider = ({ title }: TitledDividerProps) => {
  return (
    <div className={base()}>
      <div className={divider()}></div>
      <span className={text()}>{title}</span>
      <div className={divider()}></div>
    </div>
  );
};
