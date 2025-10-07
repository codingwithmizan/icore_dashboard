import * as z from "zod";
import dayjs from "dayjs";

export const getUserSchema = (isEdit: boolean) =>
  z
    .object({
      name: z
        .string()
        .nonempty("Name is required.")
        .min(3, "Minimum length of name must be 3 characters.")
        .max(100, "Maximum length of the contact number 100 characters.")
        .regex(/^[a-zA-Z\s]+$/, {
          message: "Only letters and spaces allowed.",
        }),
      email: z.string().nonempty("Email is required").and(z.email("Email must be a valid email")),
      gender_id: z.string().nonempty("Gender is required."),
      dob: z.preprocess(
        (val) =>
          dayjs.isDayjs(val)
            ? val
            : typeof val === "string"
              ? dayjs(val)
              : val instanceof Date
                ? dayjs(val)
                : undefined,
        z
          .custom<dayjs.Dayjs>()
          .refine((d) => d?.isValid?.(), {
            message: "Date of birth is required.",
          })
          .refine((d) => d && dayjs.isDayjs(d) && d.isBefore(dayjs().subtract(18, "years")), {
            message: "Must be at least 18 years old",
          })
      ),
      avatar_url: z
        .string()
        .nonempty("Avatar is required.")
        .refine((v) => /^data:image\/(jpeg|jpg|png|webp);base64,/.test(v), {
          message: "Invalid image format.",
        }),
      contact_number: z
        .string()
        .nonempty("Contact number is required.")
        .min(11, "Minimum length of contact number must be 11 characters.")
        .max(14, "Maximum length of the contact number 14 characters.")
        .regex(/^01[3-9]\d{8}$/, {
          message: "Invalid Bangladeshi format.",
        }),
      designation: z
        .string()
        .nonempty("Designation is required.")
        .min(2, "Minimum length of designation must be 2 characters.")
        .max(100, "Maximum length of the designation must be 100 characters."),
      organisation_id: z.string().nonempty("Organisation is required."),
      division_id: z
        .string()
        .optional()
        .refine((v) => !v || /^\d+$/.test(v), {
          message: "Invalid division ID.",
        }),
      district_id: z
        .string()
        .optional()
        .refine((v) => !v || /^\d+$/.test(v), {
          message: "Invalid district ID.",
        }),
      upazila_id: z
        .string()
        .optional()
        .refine((v) => !v || /^\d+$/.test(v), {
          message: "Invalid upazila ID.",
        }),
      note: z.string().max(500).optional(),
      ...(isEdit
        ? {}
        : {
            password: z
              .string()
              .nonempty("Password is required.")
              .min(8, "Minimum length of password must be 8 characters.")
              .max(50, "Maximum length of the password bust be 50 characters.")
              .regex(/[A-Z]/, { message: "At least one uppercase required." })
              .regex(/[a-z]/, { message: "At least one lowercase required." })
              .regex(/[0-9]/, { message: "At least one number required." })
              .regex(/[^a-zA-Z0-9]/, {
                message: "One special character required.",
              }),
            password_confirmation: z.string().nonempty("Password confirmation is required."),
          }),
    })
    .refine((data) => isEdit || data.password === data.password_confirmation, {
      path: ["password_confirmation"],
      message: "Passwords do not match.",
    });

export type UserFormData = z.infer<ReturnType<typeof getUserSchema>>;
