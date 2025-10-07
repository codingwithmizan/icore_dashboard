import { Control, FieldErrors, Path, FieldValues } from "react-hook-form";
import { FieldLabel, ImageUploader } from "@/components/common/form-controls";

interface Props<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  errors?: FieldErrors<T>;
  required?: boolean;
  msg?: string;
  disabled?: boolean;
  acceptFileFormat: string;
  afterFileUpload?: () => void;
}

export const ImageBlock = <T extends FieldValues>({
  name,
  control,
  label,
  errors,
  required = false,
  msg,
  disabled = false,
  acceptFileFormat,
  afterFileUpload,
}: Props<T>) => (
  <div className="space-y-2">
    <FieldLabel name={name} label={label} required={required} />
    <ImageUploader
      control={control}
      name={name}
      errors={errors}
      acceptFileFormat={acceptFileFormat}
      afterFileUpload={afterFileUpload}
      disabled={disabled}
      msg={msg}
    />
  </div>
);
