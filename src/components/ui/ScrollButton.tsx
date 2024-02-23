"use client";

import { ArrowUpIcon } from "@heroicons/react/24/outline";
import Button from "./Button";
import { useState } from "react";
import { tv } from "tailwind-variants";

const scrollButton = tv({
  base: "fixed bottom-6 right-6 size-12",
  variants: {
    visible: {
      false: "hidden",
    },
  },
});

export const ScrollButton = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (typeof window !== "undefined")
    window.addEventListener("scroll", toggleVisible);

  return (
    <Button
      color="purple"
      shape="round"
      type="button"
      onClick={() => scrollToTop()}
      className={scrollButton({ visible })}
    >
      <ArrowUpIcon className="size-6" />
    </Button>
  );
};
