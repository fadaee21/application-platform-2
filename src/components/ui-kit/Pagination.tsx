import { DOTS, usePagination } from "@/hooks/usePagination";
import ChevronRight from "@/assets/icons/chevron-right.svg?react";
import ChevronLeft from "@/assets/icons/chevron-left.svg?react";
interface IProps {
  onPageChange: (value: number) => void;
  totalCount: number;
  siblingCount?: number;
  currentPage: number;
  pageSize: number;
}

const Pagination = ({
  onPageChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize,
}: IProps) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (paginationRange.length < 2) return null;
  const onNext = () => onPageChange(currentPage + 1);
  const onPrevious = () => onPageChange(currentPage - 1);
  const lastPage = paginationRange[paginationRange.length - 1];
  return (
    <ul className={"flex list-none justify-center align-middle my-10 "}>
      <li
        className={`px-3 h-8 text-center my-auto mx-1 text-slate-700 dark:text-slate-300 flex items-center rounded-full ${
          currentPage === 1 ? "cursor-default" : "hover: cursor-pointer"
        }`}
      >
        <button onClick={onPrevious} disabled={currentPage === 1}>
          <ChevronRight />
        </button>
      </li>
      {paginationRange.map((pageNumber: number | string) => {
        if (pageNumber === DOTS) {
          return (
            <li className="flex items-center h-8 px-3 mx-1 my-auto text-center text-slate-700 dark:text-slate-300 rounded-full cursor-default">
              …
            </li>
          );
        }
        return (
          <li
            className={`px-3 h-8 text-center my-auto mx-1 text-slate-700 dark:text-slate-300 flex items-center rounded-full ${
              pageNumber === currentPage
                ? "bg-gray-300 dark:bg-slate-800/30"
                : "hover: cursor-pointer"
            }`}
            onClick={() => onPageChange(+pageNumber)}
            key={pageNumber}
          >
            {pageNumber}
          </li>
        );
      })}
      <li
        className={`px-3 h-8 text-center my-auto mx-1 text-slate-700 dark:text-slate-300 flex items-center rounded-full ${
          currentPage === lastPage ? "cursor-auto" : "hover: cursor-pointer"
        }`}
        onClick={onNext}
      >
        <button onClick={onPrevious} disabled={currentPage === lastPage}>
          <ChevronLeft />
        </button>
      </li>
    </ul>
  );
};

export default Pagination;
