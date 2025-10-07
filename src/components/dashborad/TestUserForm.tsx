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
// import { putData, postData } from "@/lib/services/api";
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
  // genderOptions = [],
  // organisationOptions = [],
  // divisionOptions = [],
  // districtOptions = [],
  upazilaOptions = [],
}) => {
  const router = useRouter();
  const isEdit = !!user;
  const schema = getUserSchema(isEdit);

  // const [isSuccess, setIsSuccess] = useState(false);
  // const [isPending, startTransition] = useTransition();

    const [isSuccess] = useState(false);
  const [isPending] = useTransition();

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

    console.log("Form Data Submitted: ", formData);
    router.push('/test-users');
    toast.success("User information saved successfully!");


    // const res = isEdit
    //   ? await putData(`users/${user!.id}`, formData)
    //   : await postData("signup", formData);

    // if (res.success) {
    //   toast.success(res.message);
    //   setIsSuccess(true);
    //   startTransition(() => router.push("/users"));
    // } else {
    //   toast.error(res.message);
    //   setIsSuccess(false);
    // }
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
            options={[
              { id: 1, value: "1", label: "Male" },
              { id: 2, value: "2", label: "Female" },
            ]}
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
            options={[
              { id: 1, value: "1", label: "iFarmer Ltd." },
              { id: 2, value: "2", label: "ORG1." },
              { id: 3, value: "3", label: "ORG2." },
              { id: 4, value: "4", label: "ORG3." },
              { id: 5, value: "5", label: "ORG4." },
              { id: 6, value: "6", label: "ORG5." },
            ]}
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
            options={[
              { id: 1, label: "Dhaka", value: "1" },
              { id: 2, label: "Chattogram", value: "2" },
              { id: 3, label: "Rajshahi", value: "3" },
              { id: 4, label: "Khulna", value: "4" },
              { id: 5, label: "Barishal", value: "5" },
              { id: 6, label: "Sylhet", value: "6" },
              { id: 7, label: "Rangpur", value: "7" },
              { id: 8, label: "Mymensingh", value: "8" },
            ]}
            placeholder="Select a division"
          />
          <SelectBlock
            name="district_id"
            label="District"
            control={control}
            errors={errors}
            options={districtOptions2}
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

const districtOptions2 = [
  { id: 1, label: "Bagerhat", value: "1" },
  { id: 2, label: "Bandarban", value: "2" },
  { id: 3, label: "Barguna", value: "3" },
  { id: 4, label: "Barishal", value: "4" },
  { id: 5, label: "Bhola", value: "5" },
  { id: 6, label: "Bogura", value: "6" },
  { id: 7, label: "Brahmanbaria", value: "7" },
  { id: 8, label: "Chandpur", value: "8" },
  { id: 9, label: "Chattogram", value: "9" },
  { id: 10, label: "Chuadanga", value: "10" },
  { id: 11, label: "Cox's Bazar", value: "11" },
  { id: 12, label: "Cumilla", value: "12" },
  { id: 13, label: "Dhaka", value: "13" },
  { id: 14, label: "Dinajpur", value: "14" },
  { id: 15, label: "Faridpur", value: "15" },
  { id: 16, label: "Feni", value: "16" },
  { id: 17, label: "Gaibandha", value: "17" },
  { id: 18, label: "Gazipur", value: "18" },
  { id: 19, label: "Gopalganj", value: "19" },
  { id: 20, label: "Habiganj", value: "20" },
  { id: 21, label: "Jamalpur", value: "21" },
  { id: 22, label: "Jashore", value: "22" },
  { id: 23, label: "Jhalokati", value: "23" },
  { id: 24, label: "Jhenaidah", value: "24" },
  { id: 25, label: "Joypurhat", value: "25" },
  { id: 26, label: "Khagrachhari", value: "26" },
  { id: 27, label: "Khulna", value: "27" },
  { id: 28, label: "Kishoreganj", value: "28" },
  { id: 29, label: "Kurigram", value: "29" },
  { id: 30, label: "Kushtia", value: "30" },
  { id: 31, label: "Lakshmipur", value: "31" },
  { id: 32, label: "Lalmonirhat", value: "32" },
  { id: 33, label: "Madaripur", value: "33" },
  { id: 34, label: "Magura", value: "34" },
  { id: 35, label: "Manikganj", value: "35" },
  { id: 36, label: "Meherpur", value: "36" },
  { id: 37, label: "Moulvibazar", value: "37" },
  { id: 38, label: "Munshiganj", value: "38" },
  { id: 39, label: "Mymensingh", value: "39" },
  { id: 40, label: "Naogaon", value: "40" },
  { id: 41, label: "Narail", value: "41" },
  { id: 42, label: "Narayanganj", value: "42" },
  { id: 43, label: "Narsingdi", value: "43" },
  { id: 44, label: "Natore", value: "44" },
  { id: 45, label: "Netrokona", value: "45" },
  { id: 46, label: "Nilphamari", value: "46" },
  { id: 47, label: "Noakhali", value: "47" },
  { id: 48, label: "Pabna", value: "48" },
  { id: 49, label: "Panchagarh", value: "49" },
  { id: 50, label: "Patuakhali", value: "50" },
  { id: 51, label: "Pirojpur", value: "51" },
  { id: 52, label: "Rajbari", value: "52" },
  { id: 53, label: "Rajshahi", value: "53" },
  { id: 54, label: "Rangamati", value: "54" },
  { id: 55, label: "Rangpur", value: "55" },
  { id: 56, label: "Satkhira", value: "56" },
  { id: 57, label: "Shariatpur", value: "57" },
  { id: 58, label: "Sherpur", value: "58" },
  { id: 59, label: "Sirajganj", value: "59" },
  { id: 60, label: "Sunamganj", value: "60" },
  { id: 61, label: "Sylhet", value: "61" },
  { id: 62, label: "Tangail", value: "62" },
  { id: 63, label: "Thakurgaon", value: "63" },
  { id: 64, label: "Patuakhali", value: "64" },
];
