import { tv, VariantProps } from "tailwind-variants";

const spinner = tv({
  base: "border-gray-300 animate-spin rounded-full border-8 border-t-sky-400",
  variants: {
    size: {
      sm: "size-10",
      md: "size-16",
      lg: "size-24",
    },
  },
  defaultVariants: {
    size: "sm",
  },
});

type SpinnerProps = VariantProps<typeof spinner>;

const Spinner = ({ size }: SpinnerProps) => {
  return <div className={spinner({ size })} />;
};

export default Spinner;
