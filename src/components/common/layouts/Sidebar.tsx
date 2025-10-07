import Image from "next/image";
import Link from "next/link";
import dayjs from "dayjs";
import { SidebarMenu } from "@/components/common/layouts/sidebar";

export const Sidebar = () => {
  return (
    <nav className="w-68 h-screen bg-slate-900 text-gray-200 border-r border-gray-800 flex flex-col group">
      <div className="sticky top-0 bg-slate-900 z-10 text-center py-6 border-b border-gray-800 border-dashed">
        <Link href="/" className="flex justify-center items-center">
          <Image
            src="/icons/icore.svg"
            alt="Sofol Logo"
            width={120}
            height={40}
            className="h-auto w-32 transition-opacity hover:opacity-90"
            priority
          />
        </Link>
      </div>
      <div className="flex-1 py-4 space-y-1 scrollbar-container">
        <SidebarMenu />
      </div>
      <div className="sticky bottom-0 bg-slate-900 border-t border-gray-800 border-dashed p-4 text-center text-xs text-gray-500">
        iFarmer LTD © {dayjs().format("YYYY")}
      </div>
    </nav>
  );
};