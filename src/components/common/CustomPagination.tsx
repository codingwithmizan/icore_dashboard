"use client";

import { FC, KeyboardEvent, useState } from "react";
import clsx from "clsx";
import { FiChevronsLeft, FiChevronLeft, FiChevronRight, FiChevronsRight } from "react-icons/fi";
import { Tooltip } from "antd";
import { motion, AnimatePresence } from "framer-motion";

interface PaginationProps {
  count: number;
  page: number;
  onChange: (page: number) => void;
  siblingCount?: number;
  boundaryCount?: number;
  showFirstButton?: boolean;
  showLastButton?: boolean;
  showPrevButton?: boolean;
  showNextButton?: boolean;
  className?: string;
  rowsPerPage?: number;
  rowsPerPageOptions?: number[];
  onRowsPerPageChange?: (value: number) => void;
}

const DOTS = "dots";

export const CustomPagination: FC<PaginationProps> = ({
  count,
  page,
  onChange,
  siblingCount = 1,
  boundaryCount = 1,
  showFirstButton = true,
  showLastButton = true,
  showPrevButton = true,
  showNextButton = true,
  className,
  rowsPerPage,
  rowsPerPageOptions = [10, 20, 50, 100],
  onRowsPerPageChange,
}) => {
  const [focusedPage, setFocusedPage] = useState<number | null>(null);

  const createRange = (start: number, end: number) =>
    Array.from({ length: end - start + 1 }, (_, i) => i + start);

  const getPageList = () => {
    const totalPageNumbers = siblingCount * 2 + 3 + boundaryCount * 2;
    if (count <= totalPageNumbers) return createRange(1, count);

    const startPages = createRange(1, boundaryCount);
    const endPages = createRange(count - boundaryCount + 1, count);
    const leftSibling = Math.max(page - siblingCount, boundaryCount + 2);
    const rightSibling = Math.min(page + siblingCount, count - boundaryCount - 1);
    const shouldShowLeftDots = leftSibling > boundaryCount + 2;
    const shouldShowRightDots = rightSibling < count - boundaryCount - 1;
    const middlePages = createRange(leftSibling, rightSibling);

    return [
      ...startPages,
      shouldShowLeftDots ? DOTS : null,
      ...middlePages,
      shouldShowRightDots ? DOTS : null,
      ...endPages,
    ].filter(Boolean);
  };

  const pages = getPageList();

  const handleKey = (e: KeyboardEvent<HTMLButtonElement>, target: number) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onChange(target);
    }
  };

  const handleClick = (target: number) => {
    if (target !== page && target >= 1 && target <= count) {
      onChange(target);
    }
  };

  return (
    <div className={clsx("flex flex-wrap items-center justify-between gap-4", className)}>
      {/* Rows Per Page */}
      {rowsPerPage && onRowsPerPageChange && (
        <div className="flex items-center gap-2 text-sm">
          <span>Rows per page:</span>
          <select
            value={rowsPerPage}
            onChange={(e) => onRowsPerPageChange(Number(e.target.value))}
            className="rounded border px-2 py-1 text-sm"
            aria-label="Rows per page"
          >
            {rowsPerPageOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Pagination Buttons - Desktop */}
      <div className="hidden items-center gap-1 sm:flex">
        {showFirstButton && (
          <Tooltip title="First Page">
            <motion.button
              onClick={() => handleClick(1)}
              disabled={page === 1}
              className="cursor-pointer rounded-[5px] px-2 py-1 disabled:opacity-50"
              aria-label="First Page"
              tabIndex={0}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiChevronsLeft size={16} />
            </motion.button>
          </Tooltip>
        )}

        {showPrevButton && (
          <Tooltip title="Previous Page">
            <motion.button
              onClick={() => handleClick(page - 1)}
              disabled={page === 1}
              className="cursor-pointer rounded-[5px] px-2 py-1 disabled:opacity-50"
              aria-label="Previous Page"
              tabIndex={0}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiChevronLeft size={16} />
            </motion.button>
          </Tooltip>
        )}

        <AnimatePresence mode="popLayout" initial={false}>
          {pages.map((p, i) =>
            p === DOTS ? (
              <motion.span
                key={`dots-${i}`}
                className="px-2 py-1 text-gray-400 select-none"
                aria-hidden="true"
                tabIndex={0}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                ...
              </motion.span>
            ) : (
              <motion.button
                key={`page-${p}`}
                onClick={() => handleClick(Number(p))}
                onKeyDown={(e) => handleKey(e, Number(p))}
                onFocus={() => setFocusedPage(Number(p))}
                onBlur={() => setFocusedPage(null)}
                aria-label={`Page ${p}`}
                aria-current={p === page ? "page" : undefined}
                tabIndex={0}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                transition={{ duration: 0.2 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={clsx(
                  "cursor-pointer rounded-[5px] px-3 py-1 text-sm transition-colors outline-none",
                  p === page
                    ? "border border-[#10B981] bg-[oklch(97.9%_0.021_166.113)] font-bold text-[#065F46]"
                    : "hover:bg-gray-100",
                  focusedPage === p && "ring-1 ring-[#10B981]"
                )}
              >
                {p}
              </motion.button>
            )
          )}
        </AnimatePresence>

        {showNextButton && (
          <Tooltip title="Next Page">
            <motion.button
              onClick={() => handleClick(page + 1)}
              disabled={page === count}
              className="cursor-pointer rounded-[5px] px-2 py-1 disabled:opacity-50"
              aria-label="Next Page"
              tabIndex={0}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiChevronRight size={16} />
            </motion.button>
          </Tooltip>
        )}

        {showLastButton && (
          <Tooltip title="Last Page">
            <motion.button
              onClick={() => handleClick(count)}
              disabled={page === count}
              className="cursor-pointer rounded-[5px] px-2 py-1 disabled:opacity-50"
              aria-label="Last Page"
              tabIndex={0}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiChevronsRight size={16} />
            </motion.button>
          </Tooltip>
        )}
      </div>

      {/* Pagination Dropdown - Mobile */}
      <div className="flex items-center gap-2 sm:hidden">
        <label htmlFor="page-select" className="text-sm">
          Page:
        </label>
        <motion.select
          id="page-select"
          value={page}
          onChange={(e) => handleClick(Number(e.target.value))}
          className="rounded border px-2 py-1 text-sm"
          aria-label="Select page"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          {Array.from({ length: count }, (_, i) => i + 1).map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </motion.select>
      </div>
    </div>
  );
};
