"use client";

import { FC } from "react";
import { Button, ButtonProps } from "antd";
import { FaHandPointUp } from "react-icons/fa";
import { GrPowerReset } from "react-icons/gr";
import { AiOutlineFilter } from "react-icons/ai";
import clsx from "clsx";

type ButtonType = "show" | "apply" | "reset";

interface Props extends Partial<ButtonProps> {
  btnType: ButtonType;
  onClick?: () => void;
  block?: boolean;
}

const config = {
  show: {
    icon: <AiOutlineFilter size={14} />,
    label: "Filters",
    color: "emerald",
    className:
      "!border-emerald-800 !text-emerald-800 hover:!bg-emerald-800 hover:!text-white",
    htmlType: "button" as ButtonProps["htmlType"],
  },
  apply: {
    icon: <FaHandPointUp size={14} />,
    label: "Apply",
    color: "emerald",
    className:
      "!border-emerald-800 !text-emerald-800 hover:!bg-emerald-800 hover:!text-white",
    htmlType: "submit" as ButtonProps["htmlType"],
  },
  reset: {
    icon: <GrPowerReset size={14} />,
    label: "Reset",
    color: "orange",
    className:
      "!border-orange-600 !text-orange-600 hover:!bg-orange-600 hover:!text-white",
    htmlType: "button" as ButtonProps["htmlType"],
  },
};

export const FilterButton: FC<Props> = ({
  btnType,
  onClick,
  block = true,
  ...rest
}) => {
  const { icon, label, className, htmlType } = config[btnType];

  return (
    <Button
      size="large"
      icon={icon}
      onClick={onClick}
      block={block}
      htmlType={htmlType}
      className={`${clsx(className)} !text-sm !font-normal`}
      {...rest}
    >
      {label}
    </Button>
  );
};
