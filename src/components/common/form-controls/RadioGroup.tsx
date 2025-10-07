import { FC } from "react";
import { Controller, Control } from "react-hook-form";
import { Radio, Space } from "antd";
import { ErrorMessage } from "@/components/common/form-controls";

interface option {
  id: string | number;
  value: string | number;
  label: string | number;
}
interface RadioGroupControlProps {
  name: string;
  options: option[];
  control: Control<{ [key: string]: unknown }>;
  errors?: { [key: string]: { message: string } };
  disabled?: boolean;
  direction?: "horizontal" | "vertical";
}

export const RadioGroupControl: FC<RadioGroupControlProps> = ({
  name,
  control,
  options,
  errors,
  disabled = false,
  direction = "horizontal",
}) => {
  const errMsg = errors?.[name]?.message;

  return (
    <div>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Radio.Group
            {...field}
            disabled={disabled}
            className="rounded my-1 w-full focus-within:!border-emerald-600  hover:!border-emerald-600"
            size="large"
          >
            <Space direction={direction}>
              {options?.length > 0 &&
                options?.map((option) => (
                  <Radio value={option?.value} key={option?.id}>
                    <span className="text-xs">{option?.label}</span>
                  </Radio>
                ))}
            </Space>
          </Radio.Group>
        )}
      />
      {errMsg && <ErrorMessage errMsg={String(errMsg)} />}
    </div>
  );
};
