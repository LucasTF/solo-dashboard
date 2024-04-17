"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { tv } from "tailwind-variants";

type ResultsProps = {
  numOfResults?: number;
};

const resultNums = tv({
  variants: {
    selected: {
      true: "font-bold select-none text-sky-800 dark:text-purple-500",
      false: "cursor-pointer hover:underline",
    },
  },
});

export const Results = ({ numOfResults = 0 }: ResultsProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const rowsPerPage = Number(searchParams.get("numRows") || "50");

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
            className={resultNums({ selected: rowsPerPage === 10 })}
            onClick={() => rowsPerPageHandler(10)}
          >
            10
          </span>
          ,&nbsp;
          <span
            className={resultNums({ selected: rowsPerPage === 25 })}
            onClick={() => rowsPerPageHandler(25)}
          >
            25
          </span>
          ,&nbsp;
          <span
            className={resultNums({ selected: rowsPerPage === 50 })}
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
