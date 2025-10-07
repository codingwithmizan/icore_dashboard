"use client";

import { SidebarItem } from "./SidebarItem";
import clsx from "clsx";
import type { MenuSection } from "@/components/common/layouts";

interface Props {
  section: MenuSection;
  isSectionActive: boolean;
  openSubmenu: string | null;
  setOpenSubmenu: (
    key: string | ((prev: string | null) => string | null) | null
  ) => void;
  hoveredItem: string | null;
  setHoveredItem: (key: string | null) => void;
  isLinkActive: (link: string) => boolean;
  isAnyChildActive: (
    children?: MenuSection["items"][number]["children"]
  ) => boolean;
}

export const SidebarSection = ({
  section,
  isSectionActive,
  openSubmenu,
  setOpenSubmenu,
  hoveredItem,
  setHoveredItem,
  isLinkActive,
  isAnyChildActive,
}: Props) => (
  <div>
    <div
      className={clsx(
        "pl-1 mb-2 uppercase tracking-wider transition-colors",
        isSectionActive ? "text-emerald-500" : "text-slate-500"
      )}
    >
      {section.title}
    </div>

    <ul className="space-y-1">
      {section.items
        .filter((item) => item.isPermitted)
        .map((item) => (
          <SidebarItem
            key={item.name}
            sectionTitle={section.title}
            item={item}
            openSubmenu={openSubmenu}
            setOpenSubmenu={setOpenSubmenu}
            hoveredItem={hoveredItem}
            setHoveredItem={setHoveredItem}
            isLinkActive={isLinkActive}
            isAnyChildActive={isAnyChildActive}
          />
        ))}
    </ul>
  </div>
);
