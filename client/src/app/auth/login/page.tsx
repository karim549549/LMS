"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginSchema } from "@/validation/login";
import { motion } from "framer-motion";
// shadcn/ui imports (assuming Button, Input, Label, etc. are available)
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail } from "lucide-react";
import Link from "next/link";
import AuthAlert from "@/components/auth/AuthAlert";
import PasswordField from "@/components/auth/PasswordField";
import GoogleButton from "@/components/auth/GoogleButton";

export default function LoginPage() {
  const [apiError, setApiError] = useState<string | null>(null);
  const [showAllErrors, setShowAllErrors] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [signInLoading, setSignInLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
  });

  const errorList = [
    ...(errors.email ? [errors.email.message] : []),
    ...(errors.password ? [errors.password.message] : []),
    ...(apiError ? [apiError] : []),
  ].filter((v): v is string => Boolean(v));

  const onSubmit = async (data: LoginSchema) => {
    setSignInLoading(true);
    setApiError(null);
    await new Promise((res) => setTimeout(res, 1200));
    setSignInLoading(false);
    console.log(data);
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    // Simulate Google sign-in
    await new Promise((res) => setTimeout(res, 1200));
    setGoogleLoading(false);
    // TODO: Integrate real Google sign-in
  };

  return (
    <motion.div
      className="w-full flex items-center justify-center min-h-[60vh]"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-8 flex flex-col items-center gap-2">
        <h1 className="text-2xl font-bold mb-2 text-center">Sign in to your account</h1>
        <p className="text-gray-500 text-sm mb-6 text-center">Enter your email and password to access your dashboard. If you forgot your password, use the link below to reset it.</p>
        <AuthAlert errorList={errorList} showAllErrors={showAllErrors} setShowAllErrors={setShowAllErrors} />
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 w-full">
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
          </div>
          <PasswordField<LoginSchema>
            label="Password"
            id="password"
            register={register}
            error={errors.password?.message}
            placeholder="••••••••"
            tooltip="Password must be at least 6 characters."
          />
          <div className="flex justify-end">
            <Link href="/auth/forgetpassword" className="text-sm text-blue-600 hover:underline">
              Forgot password?
            </Link>
          </div>
          <Button
            type="submit"
            className="w-full font-semibold transition-all duration-150 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed"
            disabled={signInLoading || isSubmitting || Object.keys(errors).length > 0}
          >
            {signInLoading || isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                Signing in...
              </span>
            ) : (
              "Sign In"
            )}
          </Button>
        </form>
        {/* Divider and Google sign-in */}
        <div className="flex items-center w-full my-4">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="mx-4 text-gray-400 text-xs font-medium">OR</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>
        <GoogleButton loading={googleLoading} onClick={handleGoogleSignIn} disabled={signInLoading}>
          {googleLoading ? "Signing in..." : "Sign in with Google"}
        </GoogleButton>
      </div>
    </motion.div>
  );
}