import {
  Controller,
  Control,
  FieldValues,
  FieldErrors,
  Path,
} from "react-hook-form";
import { Input } from "antd";
import { ErrorMessage } from "@/components/common/form-controls";

interface Props<T extends FieldValues> {
  name: keyof T;
  control: Control<T>;
  errors?: FieldErrors<T>;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  msg?: string;
  size?: "small" | "middle" | "large";
  allowCopyPaste?: boolean;
  autoComplete?: string;
}
export const PasswordControl = <T extends FieldValues>({
  name,
  control,
  errors = {} as FieldErrors<T>,
  disabled = false,
  placeholder = "",
  className = "",
  msg,
  size = "large",
  allowCopyPaste = true,
  autoComplete = "new-password",
}: Props<T>) => {
  const errMsg = msg || errors?.[name]?.message;
  return (
    <div className="relative">
      <Controller
        control={control}
        name={name as Path<T>}
        render={({ field }) => (
          <Input.Password
            allowClear
            {...field}
            value={field.value as string}
            id={name as string}
            className={`my-1  focus-within:!border-emerald-600  hover:!border-emerald-600 ${className}`}
            status={errMsg && "error"}
            size={size}
            disabled={disabled}
            placeholder={placeholder}
            autoComplete={autoComplete}
            onPaste={(e) => {
              if (!allowCopyPaste) e.preventDefault();
            }}
            onCopy={(e) => {
              if (!allowCopyPaste) e.preventDefault();
            }}
          />
        )}
      />
      {errMsg && <ErrorMessage errMsg={String(errMsg)} />}
    </div>
  );
};
