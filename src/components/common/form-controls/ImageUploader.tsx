"use client";

import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Upload, Modal, Button, Space, Image, Tooltip } from "antd";
import {
  Controller,
  Control,
  FieldErrors,
  Path,
  FieldValues,
} from "react-hook-form";
import type { RcFile } from "antd/es/upload";
import type { UploadFile } from "antd/es/upload/interface";
import { getBase64 } from "@/lib/helpers";
import { ErrorMessage } from "@/components/common/form-controls";

import {
  MdZoomIn,
  MdZoomOut,
  MdRotateLeft,
  MdRotateRight,
  MdRefresh,
} from "react-icons/md";

interface Props<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  errors?: FieldErrors<T>;
  msg?: string;
  disabled?: boolean;
  acceptFileFormat: string;
  afterFileUpload?: () => void;
}

const iconBtnStyle = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 0,
  width: 36,
  height: 36,
  lineHeight: 0,
};

export const ImageUploader = <T extends FieldValues>({
  control,
  name,
  errors,
  msg,
  disabled = false,
  acceptFileFormat,
  afterFileUpload,
}: Props<T>) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState<string>("");
  const [previewTitle, setPreviewTitle] = useState<string>("Image Preview");
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);

  const resetTransforms = () => {
    setScale(1);
    setRotate(0);
  };

  const handlePreview = async (file: UploadFile) => {
    let src = file.url;
    if (!src && file.originFileObj) {
      src = await getBase64(file.originFileObj as RcFile);
    }
    if (src) {
      setPreviewImage(src);
      setPreviewOpen(true);
      setPreviewTitle(file.name || "Image Preview");
      resetTransforms();
    }
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }} className="text-sm">
        Upload
      </div>
    </div>
  );

  const errMsg = msg ?? (errors?.[name]?.message as string | undefined);

  return (
    <div className="mt-2">
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Upload
            accept={acceptFileFormat}
            listType="picture-card"
            maxCount={1}
            fileList={fileList}
            beforeUpload={() => false}
            disabled={disabled}
            onChange={async ({ fileList: newList }) => {
              const file = newList?.[0]?.originFileObj as RcFile | undefined;
              if (file) {
                const base64 = await getBase64(file);
                field.onChange(base64);

                setFileList([
                  {
                    uid: file.uid,
                    name: file.name,
                    status: "done",
                    url: base64,
                  },
                ]);
              } else {
                field.onChange("");
                setFileList([]);
              }
              afterFileUpload?.();
            }}
            onRemove={() => {
              field.onChange("");
              setFileList([]);
              setPreviewImage("");
              resetTransforms();
            }}
            onPreview={handlePreview}
          >
            {fileList.length >= 1 ? null : uploadButton}
          </Upload>
        )}
      />

      {errMsg && <ErrorMessage errMsg={String(errMsg)} />}

      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={
          <Space>
            <Tooltip title="Zoom Out">
              <Button
                type="text"
                style={iconBtnStyle}
                icon={<MdZoomOut size={20} />}
                onClick={() => setScale((prev) => Math.max(0.5, prev - 0.25))}
              />
            </Tooltip>
            <Tooltip title="Zoom In">
              <Button
                type="text"
                style={iconBtnStyle}
                icon={<MdZoomIn size={20} />}
                onClick={() => setScale((prev) => Math.min(3, prev + 0.25))}
              />
            </Tooltip>
            <Tooltip title="Rotate Left">
              <Button
                type="text"
                style={iconBtnStyle}
                icon={<MdRotateLeft size={20} />}
                onClick={() => setRotate((prev) => prev - 90)}
              />
            </Tooltip>
            <Tooltip title="Rotate Right">
              <Button
                type="text"
                style={iconBtnStyle}
                icon={<MdRotateRight size={20} />}
                onClick={() => setRotate((prev) => prev + 90)}
              />
            </Tooltip>
            <Tooltip title="Reset">
              <Button
                type="text"
                style={iconBtnStyle}
                icon={<MdRefresh size={20} />}
                onClick={resetTransforms}
              />
            </Tooltip>
          </Space>
        }
        onCancel={() => setPreviewOpen(false)}
        width={600}
        style={{
          textAlign: "center",
          backgroundColor: "transparent",
          boxShadow: "none",
        }}
        styles={{
          body: { padding: 0, position: "relative" },
          mask: { backgroundColor: "rgba(0,0,0,0.4)" },
        }}
      >
        <Image
          alt={previewTitle}
          src={previewImage}
          style={{
            width: "100%",
            maxWidth: "100%",
            maxHeight: "60vh",
            transform: `scale(${scale}) rotate(${rotate}deg)`,
            transition: "transform 0.3s ease",
          }}
          preview={false}
        />
      </Modal>
    </div>
  );
};
