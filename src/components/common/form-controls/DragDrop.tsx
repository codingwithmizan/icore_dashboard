import { FC } from "react";
import { Upload } from "antd";
import { Controller, Control } from "react-hook-form";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { ErrorMessage } from "@/components/common/form-controls";

const { Dragger } = Upload;

interface Props {
  name: string;
  control: Control<{ [key: string]: unknown }>;
  errors?: { [key: string]: { message: string } };
  msg?: string;
  fileType?: string;
  acceptFileFormat: string;
  fileTypeLabelText?: string;
  fileSizeLabelText?: string;
  beforeUpload?: () => void;
}

export const DragDrop: FC<Props> = ({
  control,
  name,
  errors,
  msg,
  fileType = "file",
  acceptFileFormat,
  fileTypeLabelText,
  fileSizeLabelText,
  beforeUpload,
}) => {
  const errMsg = msg ? msg : errors?.[name]?.message;
  return (
    <div>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Dragger
            {...field}
            beforeUpload={() => {
              if (beforeUpload) beforeUpload();
              return false;
            }}
            multiple={false}
            accept={acceptFileFormat}
            maxCount={1}
            id={name}
            data-testid={name}
          >
            <div className="flex justify-center mt-1">
              <AiOutlineCloudUpload className="text-3xl text-sky-600" />
            </div>
            <p className="text-sky-800 pt-2 text-xs font-medium">
              Click or drag {fileType} to this area to upload.
            </p>
            {fileTypeLabelText && (
              <p className="text-xs text-gray-500 pt-2">{fileTypeLabelText}</p>
            )}{" "}
            {fileSizeLabelText && (
              <p className="text-xs text-gray-500 pt-2">{fileSizeLabelText}</p>
            )}
          </Dragger>
        )}
      />
      {errMsg && <ErrorMessage errMsg={String(errMsg)} />}
    </div>
  );
};
