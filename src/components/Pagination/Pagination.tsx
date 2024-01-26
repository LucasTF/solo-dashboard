"use client";

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

    if (numOfPages <= 5) {
      paginationLinks = Array.from({ length: numOfPages }).map((_, index) => {
        return (
          <a
            href={pathname + `?page=${index + 1}`}
            className={
              "mt-4 " +
              (page === String(index + 1) || (!page && index + 1 === 1)
                ? "font-bold"
                : "")
            }
          >
            {index + 1}
          </a>
        );
      });
    }

    return paginationLinks;
  };

  return (
    <div className="flex justify-center gap-4">
      {Number(page) > 1 && (
        <a className="mt-4" href={``}>
          &lt;
        </a>
      )}
      {pagination()}
      {Number(page) < numOfPages && (
        <a className="mt-4" href={pathname + `?page=${Number(page) + 1}`}>
          &gt;
        </a>
      )}
    </div>
  );
};
export default Pagination;
