"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FiChevronRight } from "react-icons/fi";
import { GoDot, GoDotFill } from "react-icons/go";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import { menuItems } from "@/components/common/layouts";
import type { MenuSection, MenuChild } from "@/components/common/layouts";

export const SidebarMenu = () => {
  const pathname = usePathname();
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleSubmenu = (sectionTitle: string, name: string) => {
    const key = `${sectionTitle}-${name}`;
    setOpenSubmenu((prev) => (prev === key ? null : key));
    setHoveredItem(null);
  };

  const isLinkActive = (link: string) =>
    pathname === link || pathname.startsWith(link + "/");

  const isAnyChildActive = (children?: MenuChild[]) =>
    children?.some((child) => child.link && isLinkActive(child.link));

  const isSectionActive = (section: MenuSection) =>
    section.items.some(
      (item) =>
        (item.link && isLinkActive(item.link)) ||
        isAnyChildActive(item.children)
    );

  if (!mounted) return null;

  return (
    <nav
      className="space-y-6 px-3 py-5 text-slate-200"
      style={{ fontSize: "13px" }}
    >
      {menuItems
        .filter((section) => section.isPermitted)
        .map((section) => {
          const sectionActive = isSectionActive(section);

          return (
            <div key={section.title}>
              <div
                className={clsx(
                  "pl-1 mb-2 uppercase tracking-wider transition-colors",
                  sectionActive ? "text-emerald-500" : "text-slate-500"
                )}
              >
                {section.title}
              </div>

              <ul className="space-y-1">
                {section.items
                  .filter((item) => item.isPermitted)
                  .map((item) => {
                    const isParentActive = item.link && isLinkActive(item.link);
                    const hasActiveChild = isAnyChildActive(item.children);
                    const key = `${section.title}-${item.name}`;
                    const isSubmenuOpen = openSubmenu === key;
                    const isHovered = hoveredItem === key;

                    return (
                      <li key={item.name}>
                        {item.children ? (
                          <div>
                            <button
                              onClick={() =>
                                toggleSubmenu(section.title, item.name)
                              }
                              onMouseEnter={() => setHoveredItem(key)}
                              onMouseLeave={() => setHoveredItem(null)}
                              className={clsx(
                                "flex items-center justify-between w-full px-4 py-2 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500",
                                hasActiveChild || isParentActive
                                  ? "bg-slate-700/40 text-emerald-500"
                                  : isHovered
                                  ? "bg-slate-700/60 text-slate-300"
                                  : "text-slate-300"
                              )}
                              aria-expanded={isSubmenuOpen}
                              style={{ fontSize: "13px" }}
                            >
                              <span className="flex items-center gap-2">
                                <span
                                  className={clsx(
                                    "transition-all duration-300",
                                    isParentActive || hasActiveChild
                                      ? "text-emerald-500 scale-110"
                                      : "text-slate-400" // Removed hover color change
                                  )}
                                >
                                  {item.icon}
                                </span>
                                <span className="truncate">{item.name}</span>
                              </span>
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

                            <AnimatePresence initial={false}>
                              {isSubmenuOpen && (
                                <motion.ul
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{
                                    duration: 0.3,
                                    ease: "easeInOut",
                                  }}
                                  className="ml-5 mt-2 space-y-1 border-l border-slate-600 pl-3"
                                >
                                  {item.children
                                    .filter((child) => child.isPermitted)
                                    .map((child) => {
                                      const active =
                                        child.link && isLinkActive(child.link);

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
                                                active
                                                  ? "text-emerald-500 scale-110"
                                                  : "text-slate-400"
                                              )}
                                            >
                                              {active ? (
                                                <GoDotFill size={10} />
                                              ) : (
                                                <GoDot size={10} />
                                              )}
                                            </span>
                                            <span
                                              className={clsx(
                                                "transition-transform truncate",
                                                active
                                                  ? "text-emerald-500"
                                                  : "text-slate-400"
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
                          </div>
                        ) : (
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
                                isParentActive
                                  ? "text-emerald-500 scale-110"
                                  : "text-slate-400" // Removed hover color change
                              )}
                            >
                              {item.icon}
                            </span>
                            <span
                              className={clsx(
                                "transition-all duration-300 truncate",
                                isParentActive
                                  ? "text-emerald-500 scale-110"
                                  : "text-slate-400" // Removed hover color change
                              )}
                            >
                              {item.name}
                            </span>
                          </Link>
                        )}
                      </li>
                    );
                  })}
              </ul>
            </div>
          );
        })}
    </nav>
  );
};


