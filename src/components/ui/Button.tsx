import React, { ButtonHTMLAttributes } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const button = tv({
  base: "flex justify-center gap-2 rounded-md text-white ease-in-out duration-300 shadow-md active:opacity-80",
  variants: {
    color: {
      blue: "bg-sky-900 hover:bg-sky-800",
      green: "bg-green-700 hover:bg-green-600",
      red: "bg-red-700 hover:bg-red-600",
      clear: "text-black hover:bg-sky-800 hover:text-white",
    },
    fontStrength: {
      normal: "font-normal",
      semibold: "font-semibold",
      bold: "font-bold",
    },
    shape: {
      square: "p-4",
      rectangle: "py-4 px-6",
    },
  },
  defaultVariants: {
    color: "blue",
    fontStrength: "normal",
    shape: "square",
  },
});

type ButtonVariants = VariantProps<typeof button>;

type ButtonProps = ButtonVariants & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({
  children,
  color,
  fontStrength,
  shape,
  ...rest
}: ButtonProps) => {
  return (
    <button className={button({ color, fontStrength, shape })} {...rest}>
      {children}
    </button>
  );
};
