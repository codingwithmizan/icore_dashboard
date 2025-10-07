import { FC } from "react";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

interface Props {
  handleCreate: () => void;
}

export const CreateButton: FC<Props> = ({ handleCreate }) => {
  return (
    <Button
      size="middle"
      color="green"
      variant="solid"
      icon={<PlusOutlined className="text-xs" />}
      onClick={handleCreate}
      className="!bg-emerald-700 hover:!bg-emerald-600 "
    >
      Create
    </Button>
  );
};
