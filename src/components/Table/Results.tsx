"use client";

import { useEntryStore } from "@/lib/stores/entry";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type ResultsProps = {
  numOfResults?: number;
};

export const Results = ({ numOfResults = 0 }: ResultsProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const { resetEntry } = useEntryStore();

  const rowsPerPage = Number(searchParams.get("numRows") || "10");

  const rowsPerPageHandler = (numRows: number) => {
    let newPath = pathname + "?";
    searchParams.forEach((value, key) => {
      if (key === "numRows") newPath = newPath + "numRows=" + numRows;
      else if (key === "page") newPath = newPath + "page=1";
      else newPath = newPath + `${key}=${value}`;
      newPath = newPath + "&";
    });
    if (!searchParams.has("numRows")) newPath = newPath + "numRows=" + numRows;
    router.push(newPath);
  };

  return (
    <header className="my-4 flex flex-col text-center md:text-base md:flex-row md:justify-between">
      <p className="font-bold">{numOfResults} resultado(s) encontrados.</p>

      <div>
        <p>
          Mostrar&nbsp;
          <span
            className={rowsPerPage === 10 ? "font-bold" : "cursor-pointer"}
            onClick={() => rowsPerPageHandler(10)}
          >
            10
          </span>
          ,&nbsp;
          <span
            className={rowsPerPage === 25 ? "font-bold" : "cursor-pointer"}
            onClick={() => rowsPerPageHandler(25)}
          >
            25
          </span>
          ,&nbsp;
          <span
            className={rowsPerPage === 50 ? "font-bold" : "cursor-pointer"}
            onClick={() => rowsPerPageHandler(50)}
          >
            50
          </span>
          &nbsp;resultados
        </p>
      </div>
    </header>
  );
};
