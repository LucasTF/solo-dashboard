"use client";

import { useSessionStore } from "@/lib/stores/session";
import { BaseHeader } from "../BaseHeader";
import { Skeleton } from "@/components/ui/Skeleton";

export const HomeHeader = () => {
  const { session } = useSessionStore();

  return (
    <BaseHeader
      title={
        session ? (
          `Bem-Vindo, ${session.name} ${session.surname}`
        ) : (
          <div className="flex items-center">
            Bem-Vindo,
            <Skeleton className="ml-2 h-10 w-56 inline-block" />
          </div>
        )
      }
    ></BaseHeader>
  );
};
