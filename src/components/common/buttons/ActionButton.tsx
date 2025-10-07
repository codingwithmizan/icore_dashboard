"use client";

import { FC } from "react";
import { Button, Popconfirm, Tooltip } from "antd";
import { FiEye, FiEdit2, FiTrash2 } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { deleteData } from "@/lib/services/api";
import { toast } from "react-toastify";
import clsx from "clsx";

type ButtonType = "view" | "edit" | "delete";

interface Props {
  btnType: ButtonType;
  url: string;
  confirmMsg?: string;
}

export const ActionButton: FC<Props> = ({
  btnType,
  url,
  confirmMsg = "Sure to delete this item",
}) => {
  const router = useRouter();

  const handleView = () => {
    router.push(url);
  };

  const handleEdit = () => {
    router.push(url);
  };

  const handleDelete = async () => {
    const res = await deleteData(url);
    if (res.success) {
      toast.success(res.message);
      router.refresh();
    } else {
      toast.error(res.message);
    }
  };

  const config = {
    view: {
      icon: <FiEye size={12} />,
      color: "green",
      title: "View",
      action: () => handleView(),
    },
    edit: {
      icon: <FiEdit2 size={12} />,
      color: "orange",
      title: "Edit",
      action: () => handleEdit(),
    },
    delete: {
      icon: <FiTrash2 size={12} />,
      color: "red",
      title: "Delete",
    },
  }[btnType];

  const className = clsx("!transition-colors !duration-200", {
    "hover:!bg-green-800 hover:!text-white hover:!border-green-800":
      btnType === "view",
    "hover:!bg-orange-500 hover:!text-white hover:!border-orange-500":
      btnType === "edit",
    "hover:!bg-red-600 hover:!text-white hover:!border-red-600":
      btnType === "delete",
  });

  const button = (
    <Tooltip title={config.title} color={config.color} placement="bottomRight">
      <Button
        type="default"
        size="small"
        icon={config.icon}
        onClick={btnType === "delete" ? undefined : config.action}
        className={className}
      />
    </Tooltip>
  );

  if (btnType === "delete") {
    return (
      <Popconfirm
        title={confirmMsg}
        onConfirm={handleDelete}
        okText="Yes"
        cancelText="No"
      >
        {button}
      </Popconfirm>
    );
  }

  return button;
};
