"use client";

// import { useState, useTransition } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FiUser } from "react-icons/fi";
import {
  Input,
  Password,
  FieldLabel,
  Checkbox,
} from "@/components/common/form-controls";
import { loginSchema, LoginFormData } from "@/lib/validations/login";
// import { toast } from "react-toastify";

export const LoginForm = () => {
  const router = useRouter();
  // const [isSuccess, setIsSuccess] = useState(false);
  // const [isPending, startTransition] = useTransition();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    mode: "all",
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    console.log("Login data:", data);
    router.push('/');
    // try {
    //   const res = await signIn("credentials", {
    //     email: data.email,
    //     password: data.password,
    //     redirect: false,
    //   });

    //   if (res?.error) {
    //     setIsSuccess(false);
    //     toast.error("Invalid email or password.");
    //   } else {
    //     setIsSuccess(true);
    //     startTransition(() => {
    //       router.push("/");
    //     });
    //   }
    // } catch {
    //   setIsSuccess(false);
    // }


  };

  // const isButtonDisabled = isSubmitting || isPending;

  const isButtonDisabled = isSubmitting ;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200"
    >
      <div className="p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiUser className="text-2xl text-emerald-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Sign In</h2>
          <p className="text-gray-500 mt-2">
            Access your personalized dashboard
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <FieldLabel label="Email" name="email" required />
            <Input
              name="email"
              type="email"
              control={control}
              placeholder="you@example.com"
              className="pl-10"
              errors={errors}
            />
          </div>

          <div>
            <FieldLabel label="Password" name="password" required />
            <Password
              name="password"
              control={control}
              placeholder="••••••••"
              className="pl-10"
              errors={errors}
            />
          </div>

          <div className="flex items-center justify-between">
            <Checkbox
              label="Remember me"
              control={control}
              name="rememberMe"
              className="text-sm text-gray-700"
            />
            <Link
              href="/forgot-password"
              className="text-sm text-emerald-600 hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={isButtonDisabled}
            className={`w-full text-white font-medium py-3 px-4 rounded-lg shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 ${
              isButtonDisabled
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-tr from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600 cursor-pointer"
            } flex items-center justify-center`}
          >
            {/* {isSubmitting || isPending ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Signing In...
              </>
            ) : isSuccess ? (
              "Success! Redirecting..."
            ) : (
              "Sign In"
            )} */}
            Sign In
          </button>
        </form>
      </div>
    </motion.div>
  );
};
