"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginSchema } from "@/validation/login";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail } from "lucide-react";
import Link from "next/link";
import AuthAlert from "@/components/auth/AuthAlert";
import PasswordField from "@/components/auth/PasswordField";
import GoogleButton from "@/components/auth/GoogleButton";
import { userApis } from '@/services/apis/userApi';
import { useUserStore } from '@/stores/userStore';
import { useRouter } from "next/navigation";
import Image from "next/image";
import authLanding from "@/assets/authlanding.jpg";
import Container from "@/components/custom/Container";

export default function LoginPage() {
  const router = useRouter();
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
    const { data: apiData, error } = await userApis.login(data.email, data.password);
    setSignInLoading(false);
    if (error) {
      setApiError(error);
    } else if (apiData?.user) {
      useUserStore.getState().setUser(apiData.user);
      router.push('/');
    }
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    // Simulate Google sign-in
    await new Promise((res) => setTimeout(res, 1200));
    setGoogleLoading(false);
    // TODO: Integrate real Google sign-in
  };

  return (
    <section className="min-h-screen flex flex-col bg-gray-50">
      <Container className="flex-1 flex flex-col justify-center items-center ">
        {/* Card */}
        <motion.div
          className="w-full max-w-5xl p-5 bg-white rounded-lg shadow-lg overflow-hidden flex flex-col  md:flex-row gap-10"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Left: Title, description, and form */}
          <div className="flex-1 md:basis-1/3  flex flex-col justify-center p-4 gap-4 min-w-[260px]">
            {/* Title and description inside card */}
            <div className="text-center mb-7">
              <h1 className="text-2xl md:text-xl font-extrabold mb-4 bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-sm">
                Sign in to your account
              </h1>
              <p className="text-gray-500 text-xs leading-tight">Enter your email and password to access your dashboard. If you forgot your password, use the link below to reset it.</p>
            </div>
            <AuthAlert errorList={errorList} showAllErrors={showAllErrors} setShowAllErrors={setShowAllErrors} />
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
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
                <Link href="/auth/forgetpassword" className="text-xs text-blue-600 hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Button
                type="submit"
                className="w-full font-semibold transition-all duration-150 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed text-sm"
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
            <div className="flex items-center w-full my-2">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="mx-2 text-gray-400 text-xs font-medium">OR</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>
            <GoogleButton loading={googleLoading} onClick={handleGoogleSignIn} disabled={signInLoading}>
              {googleLoading ? "Signing in..." : "Sign in with Google"}
            </GoogleButton>
          </div>
          {/* Right: Image section */}
          <div className="flex-1 flex items-center   md:basis-1/2 p-5 relative min-h-[220px] md:min-h-[400px]">
            <Image
              src={authLanding}
              alt="Authentication visual"
              sizes="(min-width: 768px) 66vw, 100vw"
              priority
            />
          </div>
        </motion.div>
      </Container>
      <footer className="flex border-t-1 items-center p-2 w-full text-center align-center justify-center">
        <p className="text-sm text-gray-500">don &apos;t have an account? <Link href="/auth/register" className="text-blue-500 hover:text-blue-600">Sign  up </Link></p>
      </footer>
    </section>
  );
}