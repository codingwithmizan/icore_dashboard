import {
  Control,
  FieldValues,
  FieldErrors,
  Path,
  PathValue,
} from "react-hook-form";
import { FieldLabel, Input } from "@/components/common/form-controls";

interface Props<T extends FieldValues> {
  name: keyof T;
  control: Control<T>;
  label: string;
  type?: string;
  errors?: FieldErrors<T>;
  defaultValue?: PathValue<T, Path<T>>;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  msg?: string;
  size?: "small" | "middle" | "large";
  toUpper?: boolean;
  onChangeField?: () => void;
  allowCopyPaste?: boolean;
}

export const InputBlock = <T extends FieldValues>({
  name,
  type = "text",
  label,
  required = false,
  control,
  errors = {} as FieldErrors<T>,
  msg,
  disabled = false,
  placeholder = "",
  className = "",
  size = "large",
  defaultValue,
  toUpper = false,
  onChangeField,
  allowCopyPaste = true,
}: Props<T>) => (
  <div className="space-y-2">
    <FieldLabel name={name as string} label={label} required={required} />
    <Input
      control={control}
      name={name}
      errors={errors}
      placeholder={placeholder}
      type={type}
      disabled={disabled}
      defaultValue={defaultValue}
      size={size}
      toUpper={toUpper}
      onChangeField={onChangeField}
      allowCopyPaste={allowCopyPaste}
      className={className}
      msg={msg}
    />
  </div>
);
