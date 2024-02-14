import Link, { LinkProps } from "next/link";
import React, { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
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
      close: "p-3",
    },
    disabled: {
      true: "bg-gray-400 hover:bg-gray-400 cursor-not-allowed",
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

type ButtonLinkProps = ButtonVariants &
  LinkProps &
  AnchorHTMLAttributes<HTMLAnchorElement>;

const Button = ({
  children,
  color,
  fontStrength,
  shape,
  disabled,
  ...rest
}: ButtonProps) => {
  return (
    <button
      className={button({ color, fontStrength, shape, disabled })}
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
  ...rest
}: ButtonLinkProps) => {
  return (
    <Link
      href={href}
      target={target}
      className={button({ color, fontStrength, shape })}
      {...rest}
    >
      {children}
    </Link>
  );
};

export default Button;
