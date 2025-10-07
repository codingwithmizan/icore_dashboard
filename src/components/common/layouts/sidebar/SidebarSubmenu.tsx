"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import clsx from "clsx";
import { GoDot, GoDotFill } from "react-icons/go";
import type { MenuChild } from "@/components/common/layouts";

interface Props {
  isOpen: boolean;
  childrenItems?: MenuChild[];
  isLinkActive: (link: string) => boolean;
}

export const SidebarSubmenu = ({ isOpen, childrenItems = [], isLinkActive }: Props) => {
  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.ul
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="ml-5 mt-2 space-y-1 border-l border-slate-600 pl-3"
        >
          {childrenItems
            .filter((child) => child.isPermitted)
            .map((child) => {
              const active = child.link && isLinkActive(child.link);
              return (
                <li key={child.name}>
                  <Link
                    href={child.link ?? "#"}
                    className={clsx(
                      "flex items-center gap-2 px-3 py-1.5 rounded-md transition-all",
                      active
                        ? "text-emerald-500 font-medium"
                        : "text-slate-300 hover:bg-slate-700/50"
                    )}
                    style={{ fontSize: "13px" }}
                  >
                    <span
                      className={clsx(
                        "transition-transform",
                        active ? "text-emerald-500 scale-110" : "text-slate-400"
                      )}
                    >
                      {active ? <GoDotFill size={10} /> : <GoDot size={10} />}
                    </span>
                    <span
                      className={clsx(
                        "transition-transform truncate",
                        active ? "text-emerald-500" : "text-slate-400"
                      )}
                    >
                      {child.name}
                    </span>
                  </Link>
                </li>
              );
            })}
        </motion.ul>
      )}
    </AnimatePresence>
  );
};
