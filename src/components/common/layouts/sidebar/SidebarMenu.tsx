"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { menuItems, type MenuSection } from "@/components/common/layouts";
import { SidebarSection } from "./SidebarSection";

export const SidebarMenu = () => {
  const pathname = usePathname();
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isLinkActive = (link: string) =>
    pathname === link || pathname.startsWith(link + "/");

  const isAnyChildActive = (
    children?: MenuSection["items"][number]["children"]
  ) =>
    !!children &&
    children.some((child) => child.link && isLinkActive(child.link));

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
        .map((section) => (
          <SidebarSection
            key={section.title}
            section={section}
            isSectionActive={isSectionActive(section)}
            openSubmenu={openSubmenu}
            setOpenSubmenu={setOpenSubmenu}
            hoveredItem={hoveredItem}
            setHoveredItem={setHoveredItem}
            isLinkActive={isLinkActive}
            isAnyChildActive={isAnyChildActive}
          />
        ))}
    </nav>
  );
};
