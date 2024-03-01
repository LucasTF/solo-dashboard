import Link, { LinkProps } from "next/link";
import React, { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const button = tv({
  base: "flex justify-center items-center gap-2 rounded-md text-white ease-in-out duration-300 shadow-md active:opacity-80",
  variants: {
    color: {
      blue: "bg-sky-900 hover:bg-sky-800",
      lightblue: "bg-sky-700 hover:bg-sky-600",
      green:
        "bg-green-700 hover:bg-green-600 dark:bg-green-900 dark:hover:bg-green-800",
      red: "bg-red-700 hover:bg-red-600",
      purple:
        "bg-violet-700 hover:bg-violet-600 dark:bg-purple-900 dark:hover:bg-purple-800",
      lightindigo: "bg-indigo-700 hover:bg-indigo-600",
      indigo: "bg-indigo-800 hover:bg-indigo-700",
      clear:
        "text-black dark:text-white dark:bg-zinc-900 hover:bg-sky-800 dark:hover:bg-indigo-800 hover:text-white",
    },
    fontStrength: {
      normal: "font-normal",
      semibold: "font-semibold",
      bold: "font-bold",
    },
    shape: {
      square: "p-4",
      rectangle: "py-4 px-6",
      close: "p-3",
      round: "p-2 rounded-full",
    },
    disabled: {
      true: "bg-gray-400 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-600 cursor-not-allowed",
    },
  },
  compoundVariants: [
    {
      color: "red",
      shape: "close",
      class: "rounded-2xl shadow-lg",
    },
  ],
  defaultVariants: {
    color: "blue",
    fontStrength: "normal",
    shape: "square",
    disabled: false,
  },
});

type ButtonVariants = VariantProps<typeof button>;

type ButtonProps = ButtonVariants & ButtonHTMLAttributes<HTMLButtonElement>;

type ButtonAnchorProps = ButtonVariants &
  AnchorHTMLAttributes<HTMLAnchorElement>;

type ButtonLinkProps = ButtonAnchorProps & LinkProps;

const Button = ({
  children,
  color,
  fontStrength,
  shape,
  disabled,
  className,
  ...rest
}: ButtonProps) => {
  return (
    <button
      className={button({ color, fontStrength, shape, disabled, className })}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
};

export const ButtonLink = ({
  href,
  children,
  color,
  fontStrength,
  shape,
  target,
  className,
  ...rest
}: ButtonLinkProps) => {
  return (
    <Link
      href={href}
      target={target}
      className={button({ color, fontStrength, shape, className })}
      {...rest}
    >
      {children}
    </Link>
  );
};

export default Button;
