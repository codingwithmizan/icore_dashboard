import {
  Controller,
  Control,
  FieldValues,
  FieldErrors,
  Path,
} from "react-hook-form";
import { Select } from "antd";
import { ErrorMessage } from "@/components/common/form-controls";
import { SelectOption } from "@/lib/models";

const { Option } = Select;

interface Props<T extends FieldValues> {
  name: keyof T;
  control: Control<T>;
  errors?: FieldErrors<T>;
  options: SelectOption[];
  multiple?: boolean;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  msg?: string;
  size?: "small" | "middle" | "large";
  defaultValue?: string | number | boolean;
  onChangeOption?: (value: string | number | boolean) => void;
}

export const SelectControl = <T extends FieldValues>({
  name,
  control,
  options = [],
  errors = {} as FieldErrors<T>,
  defaultValue = "",
  msg,
  disabled = false,
  placeholder = "",
  className = "",
  onChangeOption,
  multiple = false,
}: Props<T>) => {
  const errMsg = msg || errors?.[name]?.message;

  return (
    <div className="relative w-full mt-2">
      <Controller
        control={control}
        name={name as Path<T>}
        render={({ field }) => (
          <Select
            {...field}
            value={field.value as string | number | boolean | null | undefined}
            mode={multiple ? "multiple" : undefined}
            disabled={disabled}
            className={`w-full ${className}`}
            status={errMsg ? "error" : ""}
            size="large"
            defaultValue={defaultValue}
            id={name as string}
            virtual={false}
            onChange={(e) => {
              onChangeOption?.(e);
              field.onChange(e);
            }}
          >
            {placeholder && (
              <Option value="">
                <span className="text-gray-400 ">{placeholder}</span>
              </Option>
            )}
            {options.map((item, index) => (
              <Option key={index} value={item.value}>
                <span className="text-emerald-950">{item.label}</span>
              </Option>
            ))}
          </Select>
        )}
      />
      {errMsg && <ErrorMessage errMsg={String(errMsg)} />}
    </div>
  );
};
