"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import AuthAlert from "@/components/auth/AuthAlert";
import GoogleButton from "@/components/auth/GoogleButton";
import { registerSchema, RegisterSchema } from "@/validation/register";
import { userApis } from '@/services/apis/userApi';
import { useRouter } from 'next/navigation';
import { useUserStore } from "@/stores/userStore";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";
import PasswordField from "@/components/auth/PasswordField";
import { Button } from "@/components/ui/button";
import { ROLE } from "@/types/user/user.types";

export default function RegisterPage() {
  const [apiError, setApiError] = useState<string | null>(null);
  const [showAllErrors, setShowAllErrors] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onBlur",
  });

  const errorList = [
    ...(errors.firstName ? [errors.firstName.message] : []),
    ...(errors.lastName ? [errors.lastName.message] : []),
    ...(errors.email ? [errors.email.message] : []),
    ...(errors.password ? [errors.password.message] : []),
    ...(errors.confirmPassword ? [errors.confirmPassword.message] : []),
    ...(apiError ? [apiError] : []),
  ].filter((v): v is string => Boolean(v));

  const onSubmit = async (data: RegisterSchema) => {
    setRegisterLoading(true);
    setApiError(null);
    const { data: apiData, error } = await userApis.register({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
    });
    setRegisterLoading(false);
    if (error) {
      setApiError(error);
    } else if (apiData?.user) {
      useUserStore.getState().setUser(apiData.user);
      if (apiData.user.role === ROLE.USER) {
        // Optionally handle USER role differently here
      } else {
        router.push("/");
      }
    }
  };

  const handleGoogleSignUp = async () => {
    setGoogleLoading(true);
    await new Promise((res) => setTimeout(res, 1200));
    setGoogleLoading(false);
    // TODO: Integrate real Google sign-up
  };

  return (
    <motion.div
      className="w-full flex items-center justify-center min-h-[60vh]"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-8 flex flex-col items-center gap-2">
        <h2 className="text-xl font-bold mb-4">Create your account</h2>
        <AuthAlert errorList={errorList} showAllErrors={showAllErrors} setShowAllErrors={setShowAllErrors} />
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 w-full">
          <div>
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              type="text"
              placeholder="First name"
              {...register("firstName")}
              aria-invalid={!!errors.firstName}
            />
            {errors.firstName && <p className="text-xs text-red-500 mt-1">{errors.firstName.message as string}</p>}
          </div>
          <div>
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              type="text"
              placeholder="Last name"
              {...register("lastName")}
              aria-invalid={!!errors.lastName}
            />
            {errors.lastName && <p className="text-xs text-red-500 mt-1">{errors.lastName.message as string}</p>}
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <Mail size={18} />
              </span>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="pl-10"
                {...register("email")}
                aria-invalid={!!errors.email}
              />
            </div>
            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message as string}</p>}
          </div>
          <PasswordField
            label="Password"
            id={"password"}
            register={register}
            error={errors.password?.message as string}
            placeholder="••••••••"
            tooltip="Password must be at least 6 characters."
          />
          <PasswordField
            label="Confirm Password"
            id={"confirmPassword"}
            register={register}
            error={errors.confirmPassword?.message as string}
            placeholder="••••••••"
            tooltip="Repeat your password."
          />
          <Button
            type="submit"
            className="w-full font-semibold transition-all duration-150 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed mt-2 rounded-md py-2"
            disabled={registerLoading || isSubmitting}
          >
            {registerLoading || isSubmitting ? "Creating account..." : "Create Account"}
          </Button>
        </form>
        <div className="flex items-center w-full my-4">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="mx-4 text-gray-400 text-xs font-medium">OR</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>
        <GoogleButton loading={googleLoading} onClick={handleGoogleSignUp} disabled={registerLoading}>
          {googleLoading ? "Signing up..." : "Sign up with Google"}
        </GoogleButton>
      </div>
    </motion.div>
  );
}