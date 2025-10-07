import { FC, ReactNode, BaseSyntheticEvent } from "react";
import { Drawer, Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { FilterButton } from "@/components/common/buttons";
import { UserFilterData } from "@/lib/models";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
  children: ReactNode;
  onSubmit: (values: UserFilterData) => void;
  handleSubmit: (
    onValid: (values: UserFilterData) => void
  ) => (e?: BaseSyntheticEvent) => Promise<void>;
  onReset: () => void;
}

export const BaseFilter: FC<Props> = ({
  open,
  setOpen,
  children,
  onSubmit,
  handleSubmit,
  onReset,
}) => {
  const onClose = () => {
    setOpen(false);
  };

  return (
    <Drawer
      title="Filters"
      placement="right"
      closable={false}
      styles={{ header: { display: "none" } }}
      onClose={onClose}
      open={open}
    >
      <div className="mb-10 flex items-center justify-between">
        <h4 className="text-xl font-medium text-gray-700">Filters</h4>
        <Button type="text" onClick={onClose} icon={<CloseOutlined />} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {children}
        <div className="mt-10 flex gap-4">
          <FilterButton btnType="apply" />
          <FilterButton btnType="reset" onClick={onReset} />
        </div>
      </form>
    </Drawer>
  );
};
