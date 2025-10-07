import { Control, FieldValues, FieldErrors } from "react-hook-form";
import { FieldLabel, InputNumber } from "@/components/common/form-controls";

interface Props<T extends FieldValues> {
  name: keyof T;
  control: Control<T>;
  label: string;
  errors?: FieldErrors<T>;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  msg?: string;
  size?: "small" | "middle" | "large";
  max?: number;
  min?: number;
  step?: number;
  allowCopyPaste?: boolean;
}

export const InputNumberBlock = <T extends FieldValues>({
  name,
  control,
  label,
  required = false,
  errors,
  disabled = false,
  placeholder = "",
  max = 999999999,
  min = 0,
  className = "",
  step = 1,
  allowCopyPaste = true,
  msg,
  size = "large",
}: Props<T>) => (
  <div className="space-y-2">
    <FieldLabel name={name as string} label={label} required={required} />
    <InputNumber
      control={control}
      name={name}
      errors={errors}
      placeholder={placeholder}
      size={size}
      max={max}
      min={min}
      step={step}
      disabled={disabled}
      allowCopyPaste={allowCopyPaste}
      className={className}
      msg={msg}
    />
  </div>
);
