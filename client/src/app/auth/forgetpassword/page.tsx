"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail } from "lucide-react";
import Link from "next/link";
import AuthAlert from "@/components/auth/AuthAlert";
import { userApis } from "@/services/apis/userApi";
import Container from "@/components/custom/Container";
import { emailSchema, EmailSchema } from "@/validation/login";
import OtpResetDialog from "@/components/auth/forgetpassword/OtpResetDialog";

export default function ForgetPasswordPage() {
  const [error, setError] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [showAllErrors, setShowAllErrors] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EmailSchema>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: "" },
    mode: "onBlur",
  });

  const errorList = [
    ...(errors.email ? [errors.email.message] : []),
    ...(error ? [error] : []),
  ];

  const onSubmit = async (data: EmailSchema) => {
    const res = await userApis.forgetPassword(data.email);
    if (res.error) {
      setError("Failed, try again later.");
    } else {
      setError(null);
      setDialogOpen(true);
      // store email in redis, backend will map it via OTP
    }
  };

  return (
    <section className="min-h-screen flex flex-col bg-gray-50">
      <Container className="flex-1 flex flex-col justify-center items-center">
        <motion.div
          className="w-full max-w-md p-5 bg-white rounded-lg shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xl font-bold text-center text-blue-600 mb-2">Forgot Password</h2>
          <p className="text-sm text-center text-gray-500 mb-4">
            Enter your email and we&apos;ll send you instructions to reset your password.
          </p>
          <AuthAlert
            errorList={errorList.filter((e): e is string => Boolean(e))}
            showAllErrors={showAllErrors}
            setShowAllErrors={setShowAllErrors}
          />
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                />
              </div>
            </div>
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send Reset Link"}
            </Button>
          </form>
          <p className="text-sm text-center mt-4 text-gray-600">
            Remembered your password?{" "}
            <Link href="/auth/login" className="text-blue-500 hover:underline">
              Sign In
            </Link>
          </p>
        </motion.div>

        {/* Encapsulated logic inside */}
        <OtpResetDialog open={dialogOpen} onOpenChange={setDialogOpen} />
      </Container>
    </section>
  );
}
