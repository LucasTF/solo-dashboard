"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { tv } from "tailwind-variants";

const pagButton = tv({
  base: "p-2 rounded-md shadow-md bg-slate-100 dark:bg-zinc-700 max-md:text-sm",
  variants: {
    type: {
      numbered: "md:px-4",
      arrow: "md:px-3",
      bigArrow: "md:px-1",
    },
    selected: {
      true: "font-bold bg-sky-800 dark:bg-purple-800 text-white",
    },
    invisible: {
      true: "invisible",
    },
  },
});

type PaginationProps = {
  numOfRows: number;
};

export const Pagination = ({ numOfRows }: PaginationProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const page = searchParams.get("page") || "1";

  const rowsPerPage = Number(searchParams.get("numRows") || "10");

  const totalPages = Math.ceil(numOfRows / rowsPerPage);

  const pathBuilder = (key: string, value: string | number) => {
    const urlParams = new URLSearchParams(searchParams);
    urlParams.set(key, value.toString());
    return pathname + "?" + urlParams.toString();
  };

  const pagination = () => {
    let paginationLinks;

    if (totalPages > 5) {
      let pagArr: number[];
      const pageNum = Number(page);

      if (pageNum === totalPages) pagArr = [pageNum - 2, pageNum - 1, pageNum];
      else if (totalPages - pageNum === 1)
        pagArr = [pageNum - 2, pageNum - 1, pageNum, pageNum + 1];
      else if (pageNum === 1) pagArr = [pageNum, pageNum + 1, pageNum + 2];
      else if (totalPages - pageNum === totalPages - 2)
        pagArr = [pageNum - 1, pageNum, pageNum + 1, pageNum + 2];
      else
        pagArr = [pageNum - 2, pageNum - 1, pageNum, pageNum + 1, pageNum + 2];

      paginationLinks = pagArr.map((p, index) => {
        return (
          <Link
            key={index}
            href={pathBuilder("page", p)}
            className={pagButton({
              selected: page === String(p) || (!page && p === 1),
              type: "numbered",
            })}
          >
            {p}
          </Link>
        );
      });
    }

    if (totalPages <= 5) {
      paginationLinks = Array.from({ length: totalPages }).map((_, index) => {
        return (
          <Link
            key={index}
            href={pathBuilder("page", index + 1)}
            className={pagButton({
              selected:
                page === String(index + 1) || (!page && index + 1 === 1),
              type: "numbered",
            })}
          >
            {index + 1}
          </Link>
        );
      });
    }

    return paginationLinks;
  };

  return (
    <div className="flex justify-center gap-2 md:gap-4 mt-4">
      <Link
        href={pathBuilder("page", 1)}
        className={pagButton({
          invisible: Number(page) <= 1,
          type: "bigArrow",
        })}
      >
        &lt;&lt;
      </Link>
      <Link
        href={pathBuilder("page", Number(page) - 1)}
        className={pagButton({ invisible: Number(page) <= 1, type: "arrow" })}
      >
        &lt;
      </Link>
      {pagination()}
      <Link
        href={pathBuilder("page", Number(page) + 1)}
        className={pagButton({
          invisible: Number(page) >= totalPages,
          type: "arrow",
        })}
      >
        &gt;
      </Link>
      <Link
        href={pathBuilder("page", totalPages)}
        className={pagButton({
          invisible: Number(page) >= totalPages,
          type: "bigArrow",
        })}
      >
        &gt;&gt;
      </Link>
    </div>
  );
};
