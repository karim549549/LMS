"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import AuthAlert from "@/components/auth/AuthAlert";
import GoogleButton from "@/components/auth/GoogleButton";
import { registerSchema, RegisterSchema } from "@/validation/register";
import StepAccountInfo from "@/components/auth/register/StepAccountInfo";
import StepStudentInfo from "@/components/auth/register/StepStudentInfo";

export default function RegisterPage() {
  const [apiError, setApiError] = useState<string | null>(null);
  const [showAllErrors, setShowAllErrors] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);
  const [step, setStep] = useState(1);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues,
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

  // Collect all errors (field + API)
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
    await new Promise((res) => setTimeout(res, 1200));
    setRegisterLoading(false);
    // Simulate API call
    // setApiError("Email already in use");
    console.log(data);
  };

  const handleGoogleSignUp = async () => {
    setGoogleLoading(true);
    await new Promise((res) => setTimeout(res, 1200));
    setGoogleLoading(false);
    // TODO: Integrate real Google sign-up
  };

  const totalSteps = 2;

  return (
    <motion.div
      className="w-full flex items-center justify-center min-h-[60vh]"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-8 flex flex-col items-center gap-2">
        {/* Progress Bar */}
        <div className="w-full mb-6">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs font-medium text-blue-700">Step {step} of {totalSteps}</span>
            <span className="text-xs text-gray-400">{step === 1 ? "Personal Info" : "Account Info"}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full transition-all duration-300" style={{ width: `${(step / totalSteps) * 100}%` }} />
          </div>
        </div>
        <AuthAlert errorList={errorList} showAllErrors={showAllErrors} setShowAllErrors={setShowAllErrors} />
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 w-full">
          {step === 1 && (
            <StepAccountInfo
              register={register}
              errors={errors}
              disabled={registerLoading || isSubmitting || Object.keys(errors).some(k => ["firstName","lastName","email","password","confirmPassword"].includes(k))}
              onNext={() => setStep(2)}
            />
          )}
          {step === 2 && (
            <StepStudentInfo
              register={register}
              errors={errors}
              getValues={getValues}
              onBack={() => setStep(1)}
              onSubmit={handleSubmit(onSubmit)}
              disabled={registerLoading || isSubmitting || Object.keys(errors).some(k => ["birthdate","grade","gender"].includes(k))}
            />
          )}
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