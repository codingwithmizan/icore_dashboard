import { Control, FieldValues, FieldErrors } from "react-hook-form";
import { FieldLabel, Password } from "@/components/common/form-controls";

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
  allowCopyPaste?: boolean;
}

export const PasswordBlock = <T extends FieldValues>({
  name,
  label,
  required = false,
  control,
  errors = {} as FieldErrors<T>,
  msg,
  disabled = false,
  placeholder = "",
  className = "",
  size = "large",
  allowCopyPaste = true,
}: Props<T>) => (
  <div className="space-y-2">
    <FieldLabel name={name as string} label={label} required={required} />
    <Password
      control={control}
      name={name}
      errors={errors}
      placeholder={placeholder}
      disabled={disabled}
      size={size}
      allowCopyPaste={allowCopyPaste}
      className={className}
      msg={msg}
    />
  </div>
);

