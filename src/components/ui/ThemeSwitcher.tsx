"use client";

import { ButtonHTMLAttributes, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { tv } from "tailwind-variants";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";
import Spinner from "./Spinner";

const switcher = tv({
  base: "rounded-md p-2 ease-in-out duration-300 dark:text-white dark:hover:text-purple-500 hover:text-sky-800",
});

const ThemeSwitcher = ({
  className,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  const [mounted, toggleMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => toggleMounted(true), []);

  if (!mounted)
    return (
      <button type="button" className={switcher({ className })} {...rest}>
        <Spinner size="sm" />
      </button>
    );

  if (resolvedTheme === "dark") {
    return (
      <button
        type="button"
        className={switcher({ className })}
        onClick={() => setTheme("light")}
        {...rest}
      >
        <SunIcon className="size-6" />
      </button>
    );
  }

  if (resolvedTheme === "light") {
    return (
      <button
        type="button"
        className={switcher({ className })}
        onClick={() => setTheme("dark")}
        {...rest}
      >
        <MoonIcon className="size-6" />
      </button>
    );
  }
};

export default ThemeSwitcher;
