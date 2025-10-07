import { Controller, Control, FieldValues, Path } from "react-hook-form";
import { ErrorMessage } from "@/components/common/form-controls";
import { Checkbox } from "antd";

interface Props<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  errors?: Partial<Record<Path<T>, { message: string }>>;
  disabled?: boolean;
  className?: string;
}

export const CheckboxControl = <T extends FieldValues>({
  name,
  control,
  label = "",
  errors,
  disabled = false,
  className = "",
}: Props<T>) => {
  const errMsg = errors?.[name]?.message;

  return (
    <div>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <Checkbox
            onChange={onChange}
            checked={!!value}
            disabled={disabled}
            className={`rounded my-1 focus-within:!border-emerald-600  hover:!border-emerald-600 ${className}`}
          >
            <span className="text-sm">{label}</span>
          </Checkbox>
        )}
      />
      {errMsg && <ErrorMessage errMsg={String(errMsg)} />}
    </div>
  );
};
