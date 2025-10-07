"use client";

import { FC } from "react";
import { CustomPagination } from "@/components/common";
import { useSearchParams } from "@/hooks";

interface Props {
  title: string;
  total_pages: number;
  total_count: number;
}

export const Pagination: FC<Props> = ({ title, total_pages, total_count }) => {
  const { page, setPage, perPage } = useSearchParams();
  const startItem = (page - 1) * perPage + 1;
  const endItem = Math.min(page * perPage, total_count);
  const handleChange = (value: number) => {
    setPage(value);
  };
  return (
    <div className="mt-8 flex items-center justify-between">
      <div className="text-sm whitespace-nowrap text-gray-700">
        <span>Showing</span>
        <span className="px-1 font-semibold text-emerald-900">
          {startItem} – {endItem}
        </span>
        <span>of</span>
        <span className="px-1 font-semibold text-emerald-900">{total_count}</span>
        <span>{title}</span>
      </div>
      <CustomPagination
        count={total_pages}
        page={page}
        onChange={handleChange}
        showFirstButton
        showLastButton
      />
    </div>
  );
};
