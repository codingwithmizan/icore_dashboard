"use client";
import { FC, ReactNode } from "react";
import Link from "next/link";
import { AiOutlineHome } from "react-icons/ai";
import { MdKeyboardArrowRight } from "react-icons/md";

interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: ReactNode;
}

interface Props {
  items: BreadcrumbItem[];
  separator?: ReactNode;
}

export const BaseBreadcrumb: FC<Props> = ({
  items,

  separator = <MdKeyboardArrowRight size={14} className="text-gray-400" />,
}) => {
  const lastIndex = items.length - 1;

  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center space-x-1 text-sm">
      <Link href="/" className="relative -top-0.5 flex items-center gap-1">
        <AiOutlineHome
          size={16}
          className="text-gray-500 transition-colors hover:text-emerald-500"
        />
      </Link>
      {items.length > 0 && separator}
      {items.map((item, index) => {
        const isLast = index === lastIndex;
        const textClass = isLast
          ? "text-emerald-900 font-medium"
          : "text-gray-500 hover:text-green-600 transition-colors";
        const iconColorClass = isLast ? "text-green-600" : "text-gray-400";

        return (
          <div key={index} className="flex items-center gap-1">
            {item.href && !isLast ? (
              <Link href={item.href} className={`flex items-center gap-1 ${textClass}`}>
                {item.icon && (
                  <span className={`${iconColorClass} relative top-[1px]`}>{item.icon}</span>
                )}
                <span className={`${textClass}`}>{item.label}</span>
              </Link>
            ) : (
              <span className={`flex items-center gap-1 ${textClass}`}>
                {item.icon && (
                  <span className={`${iconColorClass} relative top-[1px]`}>{item.icon}</span>
                )}
                <span>{item.label}</span>
              </span>
            )}
            {index !== lastIndex && separator}
          </div>
        );
      })}
    </nav>
  );
};
