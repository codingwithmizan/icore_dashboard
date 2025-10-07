import { Control, FieldValues, FieldErrors } from "react-hook-form";
import { FieldLabel, Select } from "@/components/common/form-controls";
import { SelectOption } from "@/lib/models";

interface Props<T extends FieldValues> {
  name: keyof T;
  control: Control<T>;
  errors?: FieldErrors<T>;
  options: SelectOption[];
  label: string;
  multiple?: boolean;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  msg?: string;
  size?: "small" | "middle" | "large";
  defaultValue?: string | number | boolean;
  onChangeOption?: (value: string | number | boolean) => void;
}

export const SelectBlock = <T extends FieldValues>({
  name,
  label,
  required = false,
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
}: Props<T>) => (
  <div className="space-y-2">
    <FieldLabel name={name as string} label={label} required={required} />
    <Select
      control={control}
      name={name}
      options={options}
      errors={errors}
      defaultValue={defaultValue}
      placeholder={placeholder}
      onChangeOption={onChangeOption}
      disabled={disabled}
      msg={msg}
      multiple={multiple}
      className={className}
    />
  </div>
);
