import { FC, ReactNode } from "react";
import { DashboardLayout } from "@/components/common/layouts";

interface Props {
  children: ReactNode;
}

const MainLayout: FC<Props> = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <DashboardLayout>{children}</DashboardLayout>
    </div>
  );
};
export default MainLayout;


