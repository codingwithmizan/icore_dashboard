"use client";

import { FC, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm, Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Avatar } from "antd";
import { FiUser, FiShield, FiMapPin, FiEdit3, FiCheck } from "react-icons/fi";
import { toast } from "react-toastify";
import { User, SelectOption } from "@/lib/models";
import { getUserSchema, UserFormData } from "@/lib/validations/user";
import { putData, postData } from "@/lib/services/api";
import { DATE_FORMAT, IMAGE_MIME_TYPES } from "@/lib/constants";
import {
  Input,
  FieldLabel,
  Select,
  DatePicker,
  Password,
  TextArea,
  ImageUploader,
} from "@/components/common/form-controls";
import dayjs from "dayjs";

interface Props {
  user?: User;
  genderOptions: SelectOption[];
  organisationOptions: SelectOption[];
  divisionOptions?: SelectOption[];
  districtOptions?: SelectOption[];
  upazilaOptions?: SelectOption[];
}

export const UserForm: FC<Props> = ({
  user,
  genderOptions = [],
  organisationOptions = [],
  divisionOptions = [],
  districtOptions = [],
  upazilaOptions = [],
}) => {
  const router = useRouter();
  const isEdit = !!user;
  const schema = getUserSchema(isEdit);

  const [isSuccess, setIsSuccess] = useState(false);
  const [isPending, startTransition] = useTransition();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserFormData>({
    mode: "all",
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      gender_id: user?.gender?.id ? String(user.gender.id) : "",
      dob: user?.dob ? dayjs(user.dob) : undefined,
      avatar_url: user?.avatar_url || "",
      contact_number: user?.contact_number || "",
      designation: user?.designation || "",
      organisation_id: user?.organisation?.id ? String(user.organisation.id) : "",
      division_id: user?.division?.id ? String(user.division.id) : "",
      district_id: user?.district?.id ? String(user.district.id) : "",
      upazila_id: user?.upazila?.id ? String(user.upazila.id) : "",
      note: user?.note || "",
      ...(isEdit
        ? {}
        : {
            password: "",
            password_confirmation: "",
          }),
    },
    resolver: zodResolver(schema) as Resolver<UserFormData>,
  });

  const onSubmit = async (data: UserFormData) => {
    const formData = {
      user: {
        name: data.name,
        email: data.email,
        gender_id: +data.gender_id,
        dob: data.dob && dayjs(data.dob).isValid() ? dayjs(data.dob).format(DATE_FORMAT) : null,
        contact_number: data.contact_number,
        avatar_url: data.avatar_url,
        designation: data.designation,
        organisation_id: +data.organisation_id,
        division_id: data.division_id ? +data.division_id : null,
        district_id: data.district_id ? +data.district_id : null,
        upazila_id: data.upazila_id ? +data.upazila_id : null,
        note: data.note,
        ...(isEdit
          ? {}
          : {
              password: data.password,
              password_confirmation: data.password_confirmation,
            }),
      },
    };

    const res =
      isEdit && user?.id
        ? await putData(`users/${user.id}`, formData)
        : await postData("signup", formData);

    if (res.success) {
      toast.success(res.message);
      setIsSuccess(true);
      startTransition(() => {
        router.push("/users");
      });
    } else {
      toast.error(res.message);
      setIsSuccess(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-10 space-y-8">
      {/* Personal Section */}
      <section className="mb-4">
        <div className="mb-4 flex items-center space-x-3">
          <Avatar
            style={{
              backgroundColor: "oklch(93.2% 0.032 255.585)",
              color: "oklch(54.6% 0.245 262.881)",
            }}
            icon={<FiUser size={14} />}
          />
          <h2 className="ml-3 text-xl font-medium text-gray-600">Personal Information</h2>
        </div>
        <div className="grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-2">
          <div className="space-y-2">
            <FieldLabel name="name" label="Full Name" required />
            <Input control={control} name="name" errors={errors} placeholder="e.g. John Doe" />
          </div>
          <div className="space-y-2">
            <FieldLabel name="email" label="Email Address" required />
            <Input
              control={control}
              name="email"
              type="email"
              errors={errors}
              placeholder="e.g. john@example.com"
            />
          </div>
          <div className="space-y-2">
            <FieldLabel name="gender_id" label="Gender" required />
            <Select
              control={control}
              name="gender_id"
              options={genderOptions}
              errors={errors}
              placeholder="Select a gender"
            />
          </div>
          <div className="space-y-2">
            <FieldLabel name="dob" label="Date of Birth" required />
            <DatePicker control={control} name="dob" errors={errors} placeholder="Select a date" />
          </div>
          <div className="space-y-2">
            <FieldLabel name="contact_number" label="Contact Number" required />
            <Input
              control={control}
              name="contact_number"
              errors={errors}
              placeholder="e.g. 01XXXXXXXXX"
            />
          </div>
          <div className="space-y-2">
            <FieldLabel name="avatar_url" label="Profile Image" required />
            <ImageUploader
              control={control}
              name="avatar_url"
              errors={errors}
              acceptFileFormat={IMAGE_MIME_TYPES.toString()}
            />
          </div>
        </div>
      </section>

      {/* Work Section */}
      <section>
        <div className="mb-4 flex items-center space-x-3">
          <Avatar
            style={{
              backgroundColor: "oklch(94.6% 0.033 307.174)",
              color: "oklch(55.8% 0.288 302.321)",
            }}
            icon={<FiShield size={14} />}
          />
          <h2 className="ml-3 text-xl font-medium text-gray-600">Account & Work</h2>
        </div>
        <div className="grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-2">
          <div className="space-y-2">
            <FieldLabel name="designation" label="Designation" required />
            <Input
              control={control}
              name="designation"
              errors={errors}
              placeholder="e.g. Software Engineer"
            />
          </div>
          <div className="space-y-2">
            <FieldLabel name="organisation_id" label="Organization" required />
            <Select
              control={control}
              name="organisation_id"
              options={organisationOptions}
              errors={errors}
              placeholder="Select an organization"
            />
          </div>

          {!isEdit && (
            <>
              <div className="space-y-2">
                <FieldLabel name="password" label="Password" required />
                <Password
                  control={control}
                  name="password"
                  errors={errors}
                  placeholder="••••••••"
                />
              </div>
              <div className="space-y-2">
                <FieldLabel name="password_confirmation" label="Confirm Password" required />
                <Password
                  control={control}
                  name="password_confirmation"
                  errors={errors}
                  placeholder="Re-enter your password"
                />
              </div>
            </>
          )}
        </div>
      </section>

      {/* Location Section */}
      <section>
        <div className="mb-4 flex items-center space-x-3">
          <Avatar
            style={{
              backgroundColor: "oklch(92.2% 0.045 142.9)",
              color: "oklch(46.6% 0.191 142.9)",
            }}
            icon={<FiMapPin size={14} />}
          />
          <h2 className="ml-3 text-xl font-medium text-gray-600">Location Details</h2>
        </div>
        <div className="grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-3">
          <div className="space-y-2">
            <FieldLabel name="division_id" label="Division" />
            <Select
              control={control}
              name="division_id"
              options={divisionOptions}
              errors={errors}
              placeholder="Select a division"
            />
          </div>
          <div className="space-y-2">
            <FieldLabel name="district_id" label="District" />
            <Select
              control={control}
              name="district_id"
              options={districtOptions}
              errors={errors}
              placeholder="Select a district"
            />
          </div>
          <div className="space-y-2">
            <FieldLabel name="upazila_id" label="Upazila" />
            <Select
              control={control}
              name="upazila_id"
              options={upazilaOptions}
              errors={errors}
              placeholder="Select an upazila"
            />
          </div>
        </div>
      </section>

      {/* Note Section */}
      <section>
        <div className="mb-4 flex items-center space-x-3">
          <Avatar
            style={{
              backgroundColor: "oklch(95.5% 0.046 103.3)",
              color: "oklch(68.6% 0.221 99.5)",
            }}
            icon={<FiEdit3 size={14} />}
          />
          <h2 className="ml-3 text-xl font-medium text-gray-500">Additional Info</h2>
        </div>
        <div className="space-y-2">
          <FieldLabel name="note" label="Remarks" />
          <TextArea
            control={control}
            name="note"
            errors={errors}
            placeholder="Write here..."
            rows={4}
          />
        </div>
      </section>

      {/* Submit */}
      <div className="flex justify-end pt-4">
        <Button
          htmlType="submit"
          type="primary"
          size="large"
          icon={<FiCheck />}
          loading={isSubmitting || isPending}
          disabled={isSubmitting || isPending || isSuccess}
        >
          {isSubmitting || isPending ? "Submitting..." : isSuccess ? "Submitted" : "Submit"}
        </Button>
      </div>
    </form>
  );
};
