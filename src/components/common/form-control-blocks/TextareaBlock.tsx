import { Control, FieldErrors, FieldValues } from "react-hook-form";
import { FieldLabel, TextArea } from "@/components/common/form-controls";

interface Props<T extends FieldValues> {
  name: keyof T;
  control: Control<T>;
  label: string;
  type?: string;
  errors?: FieldErrors<T>;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  maxLength?: number;
  rows?: number;
  msg?: string;
  size?: "small" | "middle" | "large";
}

export const TextAreaBlock = <T extends FieldValues>({
  name,
  label,
  required = false,
  control,
  errors,
  disabled = false,
  placeholder = "",
  maxLength = 1000,
  rows = 3,
  size = "large",
  className = "",
  msg,
}: Props<T>) => (
  <div className="space-y-2">
    <FieldLabel name={name as string} label={label} required={required} />
    <TextArea
      control={control}
      name={name}
      errors={errors}
      placeholder={placeholder}
      rows={rows}
      disabled={disabled}
      maxLength={maxLength}
      size={size}
      className={className}
      msg={msg}
    />
  </div>
);
