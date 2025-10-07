import { Control, FieldValues, FieldErrors } from "react-hook-form";
import { FieldLabel, DatePicker } from "@/components/common/form-controls";
import dayjs from "dayjs";

interface Props<T extends FieldValues> {
  name: keyof T;
  control: Control<T>;
  label: string;
  required?: boolean;
  errors?: FieldErrors<T>;
  defaultValue?: dayjs.Dayjs | "";
  disabled?: boolean;
  placeholder?: string;
  size?: "small" | "middle" | "large";
  format?: string;
  className?: string;
  allowClear?: boolean;
  checkAdult?: boolean;
  onChangeField?: () => void;
}

export const DateBlock = <T extends FieldValues>({
  name,
  control,
  label,
  errors,
  required = false,
  defaultValue,
  disabled = false,
  placeholder = "Select a date",
  className = "",
  size = "large",
  allowClear = true,
  onChangeField,
}: Props<T>) => (
  <div className="space-y-2">
    <FieldLabel name={name as string} label={label} required={required} />
    <DatePicker
      control={control}
      name={name}
      errors={errors}
      defaultValue={defaultValue}
      placeholder={placeholder}
      size={size}
      disabled={disabled}
      allowClear={allowClear}
      onChangeField={onChangeField}
      className={className}
    />
  </div>
);

