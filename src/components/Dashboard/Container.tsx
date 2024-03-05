"use client";

import { useEntryStore } from "@/lib/stores/entry";
import { tv } from "tailwind-variants";
import React from "react";
import { usePathname } from "next/navigation";

type DashboardContainerProps = {
  children?: React.ReactNode;
};

const dashboardContainer = tv({
  variants: {
    fullscreen: {
      true: "lg:col-span-6",
      false: "lg:col-span-5",
    },
  },
});

export const DashboardContainer = ({ children }: DashboardContainerProps) => {
  const pathname = usePathname();
  const { entry } = useEntryStore();

  return (
    <div
      className={dashboardContainer({
        fullscreen: entry === null || (entry && entry.table !== pathname),
      })}
    >
      {children}
    </div>
  );
};
