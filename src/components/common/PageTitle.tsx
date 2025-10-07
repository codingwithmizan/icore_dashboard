import { FC, ReactNode } from "react";
import { titleCase } from "@/lib/helpers";

interface BaseProps {
  type: "create" | "edit" | "list" | "details";
  name: string;
  id?: string | number;
  subTitle?: string;
  actionComponent?: ReactNode;
}

export const PageTitle: FC<BaseProps> = ({
  type,
  name,
  id,
  subTitle,
  actionComponent,
}) => {
  const title = titleCase(name);

  let mainTitle = "";
  let description = "";

  switch (type) {
    case "create":
      mainTitle = `Create New ${title}`;
      description =
        `Fill in all required (` +
        `<span class="text-red-600">*</span>` +
        `) fields to create a new ${name.toLowerCase()}.`;
      break;

    case "edit":
      mainTitle = `Edit ${title}`;
      description =
        `Fill in all required (` +
        `<span class="text-red-600">*</span>` +
        `) fields to edit ${name.toLowerCase()}.`;
      break;

    case "details":
      mainTitle = `${title} Details #${id}`;
      description = subTitle ? `Overview of ${subTitle} information.` : "";
      break;

    case "list":
      mainTitle = `${title} List`;
      description = `Browse, search, and manage all ${name.toLowerCase()}s.`;
      break;
  }

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-6">
        <h2 className="text-2xl font-semibold text-emerald-900">{mainTitle}</h2>
        {actionComponent}
      </div>

      {description && (
        <p
          className="text-sm text-gray-600 mt-1"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      )}
    </div>
  );
};

