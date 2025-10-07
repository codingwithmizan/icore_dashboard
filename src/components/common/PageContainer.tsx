import { FC, ReactNode } from "react";
import { PageTop } from "@/components/common";

interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: ReactNode;
}

interface Props {
  children: ReactNode;
  breadcrumbItems: BreadcrumbItem[];
  separator?: ReactNode;
  backBtn?: boolean;
}

export const PageContainer: FC<Props> = ({
  children,
  breadcrumbItems,
  backBtn = true,
  separator,
}) => {
  return (
    <>
      <PageTop items={breadcrumbItems} backBtn={backBtn} separator={separator} />
      <div className="min-h-screen rounded-md border border-gray-100 bg-white p-10 shadow-md">
        {children}
      </div>
    </>
  );
};

