"use client";

import { FC, ReactNode, useState } from "react";
import { Header, Sidebar } from "@/components/common/layouts";
import { motion } from "motion/react";

interface Props {
  children: ReactNode;
}

const SIDEBAR_WIDTH = 272;
const HEADER_HEIGHT = 64;

export const DashboardLayout: FC<Props> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <>
      <motion.div
        initial={false}
        animate={{
          x: isSidebarOpen ? 0 : -SIDEBAR_WIDTH,
          opacity: isSidebarOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed top-0 left-0 h-full z-50 bg-white border-r shadow-md"
        style={{ width: SIDEBAR_WIDTH }}
      >
        <Sidebar />
      </motion.div>
      <motion.div
        animate={{
          marginLeft: isSidebarOpen ? SIDEBAR_WIDTH : 0,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="flex flex-col flex-1 min-h-screen "
      >
        <motion.div
          animate={{
            left: isSidebarOpen ? SIDEBAR_WIDTH : 0,
            width: isSidebarOpen ? `calc(100% - ${SIDEBAR_WIDTH}px)` : "100%",
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed top-0 right-0 z-50 bg-white border-b"
          style={{ height: HEADER_HEIGHT }}
        >
          <Header
            setIsSidebarOpen={setIsSidebarOpen}
            isSidebarOpen={isSidebarOpen}
          />
        </motion.div>
        <main className="flex-grow overflow-auto p-4 pt-16 mt-8 ">
          {children}
        </main>
      </motion.div>
    </>
  );
};

// "use client";

// import { ReactNode } from "react";
// import dynamic from "next/dynamic";

// // Dynamically load named export
// const DashboardLayoutProvider = dynamic(() =>
//   import("@/context/common/DashboardLayoutProvider").then(
//     (mod) => mod.DashboardLayoutProvider
//   )
// );

// interface Props {
//   children: ReactNode;
// }

// const DashboardLayout = ({ children }: Props) => {
//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       <DashboardLayoutProvider>{children}</DashboardLayoutProvider>
//     </div>
//   );
// };

// export default DashboardLayout;
