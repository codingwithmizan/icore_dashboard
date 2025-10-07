"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import clsx from "clsx";
import { motion } from "motion/react";
import { FiChevronRight } from "react-icons/fi";
import { SidebarSubmenu } from "./SidebarSubmenu";
import type { MenuItem } from "@/components/common/layouts";

interface Props {
  sectionTitle: string;
  item: MenuItem;
  openSubmenu: string | null;
  setOpenSubmenu: (
    key: string | null | ((prev: string | null) => string | null)
  ) => void;
  hoveredItem: string | null;
  setHoveredItem: (key: string | null) => void;
  isLinkActive: (link: string) => boolean;
  isAnyChildActive: (children?: MenuItem["children"]) => boolean;
}

export const SidebarItem = ({
  sectionTitle,
  item,
  openSubmenu,
  setOpenSubmenu,
  hoveredItem,
  setHoveredItem,
  isLinkActive,
  isAnyChildActive,
}: Props) => {
  const key = `${sectionTitle}-${item.name}`;
  const isParentActive = !!(item.link && isLinkActive(item.link));
  const hasActiveChild = isAnyChildActive(item.children);
  const isSubmenuOpen = openSubmenu === key;
  const isHovered = hoveredItem === key;

  const toggleSubmenu = () =>
    setOpenSubmenu((prev) => (prev === key ? null : key));

  if (item.children) {
    return (
      <li>
        <button
          onClick={toggleSubmenu}
          onMouseEnter={() => setHoveredItem(key)}
          onMouseLeave={() => setHoveredItem(null)}
          className={clsx(
            "flex items-center justify-between w-full px-4 py-2 rounded-lg transition-colors",
            hasActiveChild || isParentActive
              ? "bg-slate-700/40 text-emerald-500"
              : isHovered
              ? "bg-slate-700/60 text-slate-300"
              : "text-slate-300"
          )}
          aria-expanded={isSubmenuOpen}
          style={{ fontSize: "13px" }}
          type="button"
        >
          <div className="flex items-center gap-2">
            <span
              className={clsx(
                "transition-all duration-300",
                isParentActive || hasActiveChild
                  ? "text-emerald-500 scale-110"
                  : "text-slate-400"
              )}
            >
              {item.icon as ReactNode}
            </span>
            <span
              className={clsx(
                "truncate transition-all duration-300",
                isParentActive || hasActiveChild
                  ? "text-emerald-500 scale-110"
                  : "text-slate-400"
              )}
            >
              {item.name}
            </span>
          </div>
          <motion.span
            initial={false}
            animate={{ rotate: isSubmenuOpen ? 90 : 0 }}
            transition={{ duration: 0.25 }}
          >
            <FiChevronRight
              className="text-lg"
              color={
                isParentActive || hasActiveChild
                  ? "oklch(74.8% 0.158 164.187)"
                  : "oklch(55.1% 0.027 264.364)"
              }
            />
          </motion.span>
        </button>
        <SidebarSubmenu
          isOpen={isSubmenuOpen}
          childrenItems={item.children}
          isLinkActive={isLinkActive}
        />
      </li>
    );
  }

  return (
    <li>
      <Link
        href={item.link ?? "#"}
        onClick={() => setOpenSubmenu(null)}
        onMouseEnter={() => setHoveredItem(key)}
        onMouseLeave={() => setHoveredItem(null)}
        className={clsx(
          "flex items-center gap-2 px-4 py-2 rounded-lg transition-colors",
          isParentActive
            ? "bg-slate-700/40 text-emerald-500"
            : isHovered
            ? "bg-slate-700/60 text-slate-300"
            : "text-slate-300"
        )}
        style={{ fontSize: "13px" }}
      >
        <span
          className={clsx(
            "transition-all duration-300",
            isParentActive ? "text-emerald-500 scale-110" : "text-slate-400"
          )}
        >
          {item.icon as ReactNode}
        </span>
        <span
          className={clsx(
            "truncate transition-all duration-300",
            isParentActive ? "text-emerald-500 scale-110" : "text-slate-400"
          )}
        >
          {item.name}
        </span>
      </Link>
    </li>
  );
};

