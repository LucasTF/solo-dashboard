"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

type PaginationProps = {
  numOfRows: number;
  rowsPerPage: number;
};

const Pagination = ({ numOfRows, rowsPerPage }: PaginationProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const page = searchParams.get("page") || "1";

  const numOfPages = Math.ceil(numOfRows / rowsPerPage);

  const pagination = () => {
    let paginationLinks;

    paginationLinks = Array.from({ length: numOfPages }).map((_, index) => {
      return (
        <Link
          href={pathname + `?page=${index + 1}`}
          className={
            "py-2 px-4 bg-slate-100 rounded-md shadow-md " +
            (page === String(index + 1) || (!page && index + 1 === 1)
              ? "font-bold bg-sky-800 text-white"
              : "")
          }
        >
          {index + 1}
        </Link>
      );
    });

    return paginationLinks;
  };

  return (
    <div className="flex justify-center gap-4 mt-4">
      <Link
        href={pathname + `?page=${Number(page) - 1}`}
        className={
          "py-2 px-3 bg-slate-100 rounded-md shadow-md " +
          (Number(page) > 1 ? "" : "invisible")
        }
      >
        &lt;
      </Link>
      {pagination()}
      <Link
        href={pathname + `?page=${Number(page) + 1}`}
        className={
          "py-2 px-3 bg-slate-100 rounded-md shadow-md " +
          (Number(page) < numOfPages ? "" : "invisible")
        }
      >
        &gt;
      </Link>
    </div>
  );
};
export default Pagination;
