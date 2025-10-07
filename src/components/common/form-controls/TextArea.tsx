import {
  Controller,
  Control,
  FieldValues,
  FieldErrors,
  Path,
} from "react-hook-form";
import { Input } from "antd";
import { ErrorMessage } from "@/components/common/form-controls";

const { TextArea } = Input;

interface Props<T extends FieldValues> {
  name: keyof T;
  control: Control<T>;
  type?: string;
  errors?: FieldErrors<T>;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  maxLength?: number;
  rows?: number;
  msg?: string;
  size?: "small" | "middle" | "large";
}

export const TextAreaControl = <T extends FieldValues>({
  name,
  control,
  errors = {} as FieldErrors<T>,
  disabled = false,
  placeholder = "",
  maxLength = 1000,
  rows = 3,
  size = "large",
  className = "",
  msg,
}: Props<T>) => {
  const errMsg = msg || errors?.[name]?.message;
  return (
    <div className="my-2">
      <Controller
        control={control}
        name={name as Path<T>}
        render={({ field }) => (
          <TextArea
            {...field}
            value={field.value as string}
            allowClear
            id={name as string}
            className={`${className}`}
            status={errMsg ? "error" : ""}
            rows={rows}
            maxLength={maxLength}
            disabled={disabled}
            placeholder={placeholder}
            size={size}
          />
        )}
      />
      {errMsg && <ErrorMessage errMsg={String(errMsg)} />}
    </div>
  );
};
