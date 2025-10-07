"use client";

import {
  createContext,
  useState,
  useContext,
  type ReactNode,
  type FC,
} from "react";
import { motion } from "framer-motion";
import { Header, Sidebar } from "@/components/common/layouts";

const SIDEBAR_WIDTH = 272;
const HEADER_HEIGHT = 64;

interface ContextProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
}

const DashboardLayoutContext = createContext<ContextProps | undefined>(
  undefined
);

export const useDashboardLayout = (): ContextProps => {
  const context = useContext(DashboardLayoutContext);
  if (!context) {
    throw new Error(
      "useDashboardLayout must be used within DashboardLayoutProvider"
    );
  }
  return context;
};

interface Props {
  children: ReactNode;
}

export const DashboardLayoutProvider: FC<Props> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <DashboardLayoutContext value={{ isSidebarOpen, setIsSidebarOpen }}>
      <div className="flex min-h-screen">
        {/* Sidebar */}
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

        {/* Main Content Area */}
        <motion.div
          animate={{
            marginLeft: isSidebarOpen ? SIDEBAR_WIDTH : 0,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="flex flex-col flex-1 min-h-screen"
        >
          {/* Header */}
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
              isSidebarOpen={isSidebarOpen}
              setIsSidebarOpen={setIsSidebarOpen}
            />
          </motion.div>

          {/* Page Content */}
          <main className="flex-grow overflow-auto p-4 pt-16 mt-8">
            {children}
          </main>
        </motion.div>
      </div>
    </DashboardLayoutContext>
  );
};

// export default DashboardLayoutProvider;
