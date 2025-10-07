"use client";

import { FC, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm, Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "antd";
import { FiUser, FiShield, FiMapPin, FiEdit3, FiCheck } from "react-icons/fi";
import { toast } from "react-toastify";
import { User, SelectOption } from "@/lib/models";
import { getUserSchema, UserFormData } from "@/lib/validations/user";
import { putData, postData } from "@/lib/services/api";
import { DATE_FORMAT, IMAGE_MIME_TYPES } from "@/lib/constants";
import {
  Section,
  InputBlock,
  SelectBlock,
  DateBlock,
  PasswordBlock,
  TextAreaBlock,
  ImageBlock,
} from "@/components/common/form-control-blocks";
import dayjs from "dayjs";

interface Props {
  user?: User;
  genderOptions: SelectOption[];
  organisationOptions: SelectOption[];
  divisionOptions: SelectOption[];
  districtOptions?: SelectOption[];
  upazilaOptions?: SelectOption[];
}

export const NewUserForm: FC<Props> = ({
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
      gender_id: user?.gender?.id?.toString() || "",
      dob: user?.dob ? dayjs(user.dob) : undefined,
      avatar_url: user?.avatar_url || "",
      contact_number: user?.contact_number || "",
      designation: user?.designation || "",
      organisation_id: user?.organisation?.id?.toString() || "",
      division_id: user?.division?.id?.toString() || "",
      district_id: user?.district?.id?.toString() || "",
      upazila_id: user?.upazila?.id?.toString() || "",
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
        dob: dayjs(data.dob).format(DATE_FORMAT),
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

    const res = isEdit
      ? await putData(`users/${user!.id}`, formData)
      : await postData("signup", formData);

    if (res.success) {
      toast.success(res.message);
      setIsSuccess(true);
      startTransition(() => router.push("/users"));
    } else {
      toast.error(res.message);
      setIsSuccess(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-10 space-y-8">
      <Section title="Personal Information" icon={<FiUser />}>
        <div className="grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-2">
          <InputBlock
            name="name"
            label="Full Name"
            required
            control={control}
            errors={errors}
            placeholder="e.g. John Doe"
          />
          <InputBlock
            name="email"
            label="Email Address"
            type="email"
            required
            control={control}
            errors={errors}
            placeholder="e.g. john@example.com"
          />
          <SelectBlock
            name="gender_id"
            label="Gender"
            required
            control={control}
            errors={errors}
            options={genderOptions}
            placeholder="Select a gender"
          />
          <DateBlock name="dob" label="Date of Birth" required control={control} errors={errors} />
          <InputBlock
            name="contact_number"
            label="Contact Number"
            required
            control={control}
            errors={errors}
            placeholder="e.g. 01XXXXXXXXX"
          />
          <ImageBlock
            name="avatar_url"
            label="Profile Image"
            required
            control={control}
            errors={errors}
            acceptFileFormat={IMAGE_MIME_TYPES.toString()}
          />
        </div>
      </Section>

      <Section title="Account & Work" icon={<FiShield />}>
        <div className="grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-2">
          <InputBlock
            name="designation"
            label="Designation"
            required
            control={control}
            errors={errors}
            placeholder="e.g. Software Engineer"
          />
          <SelectBlock
            name="organisation_id"
            label="Organization"
            required
            control={control}
            errors={errors}
            options={organisationOptions}
            placeholder="Select an organization"
          />
          {!isEdit && (
            <>
              <PasswordBlock
                name="password"
                label="Password"
                required
                control={control}
                errors={errors}
                placeholder="••••••••"
              />
              <PasswordBlock
                name="password_confirmation"
                label="Confirm Password"
                required
                control={control}
                errors={errors}
                placeholder="Re-enter your password"
              />
            </>
          )}
        </div>
      </Section>

      <Section title="Location Details" icon={<FiMapPin />}>
        <div className="grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-3">
          <SelectBlock
            name="division_id"
            label="Division"
            control={control}
            errors={errors}
            options={divisionOptions}
            placeholder="Select a division"
          />
          <SelectBlock
            name="district_id"
            label="District"
            control={control}
            errors={errors}
            options={districtOptions}
            placeholder="Select a district"
          />
          <SelectBlock
            name="upazila_id"
            label="Upazila"
            control={control}
            errors={errors}
            options={upazilaOptions}
            placeholder="Select an upazila"
          />
        </div>
      </Section>

      <Section title="Additional Info" icon={<FiEdit3 />}>
        <TextAreaBlock
          name="note"
          label="Remarks"
          required
          control={control}
          errors={errors}
          placeholder="Write here..."
        />
      </Section>

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
