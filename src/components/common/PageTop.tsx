import { FC, ReactNode } from "react";
import { Breadcrumb, BackButton } from "@/components/common";

interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: ReactNode;
}

interface Props {
  items: BreadcrumbItem[];
  separator?: ReactNode;
  backBtn?: boolean;
}

export const PageTop: FC<Props> = ({ items, separator, backBtn = true }) => {
  return (
    <div className="mb-2">
      <div className="flex justify-between items-baseline">
        <Breadcrumb items={items} separator={separator} />
        {backBtn ? <BackButton /> : ""}
      </div>
    </div>
  );
};
