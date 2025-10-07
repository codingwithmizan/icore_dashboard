"use client";

import { useRouter } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";

export const BackButton = () => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border cursor-pointer border-transparent text-sm text-gray-500 hover:text-gray-600 hover:border-gray-300 hover:bg-gray-50 transition-colors"
    >
      <IoIosArrowBack className="text-gray-500" size={14} />
      <span>Back</span>
    </button>
  );
};
