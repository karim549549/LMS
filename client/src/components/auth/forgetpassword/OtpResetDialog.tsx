"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/ui/input-otp";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { otpSchema, resetPasswordSchema } from "@/validation/login";
import { useRouter } from "next/navigation";
import { userApis } from "@/services/apis/userApi";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const OtpResetDialog: React.FC<Props> = ({ open, onOpenChange }) => {
  const [step, setStep] = useState(1);
  const [otpVerifying, setOtpVerifying] = useState(false);
  const [globalError, setGlobalError] = useState<string | null>(null);
  const router = useRouter();

  // OTP form
  const {
    handleSubmit: handleOtpSubmit,
    setValue: setOtpValue,
    formState: { errors: otpErrors },
    watch: watchOtp,
  } = useForm<{ otp: string }>({
    defaultValues: { otp: "" },
    mode: "onBlur",
    resolver: zodResolver(otpSchema),
  });

  // Password form
  const {
    register: pwRegister,
    handleSubmit: handlePwSubmit,
    formState: { errors: pwErrors, isSubmitting },
  } = useForm<{ password: string; confirmPassword: string }>({
    defaultValues: { password: "", confirmPassword: "" },
    mode: "onBlur",
    resolver: zodResolver(resetPasswordSchema),
  });

  useEffect(() => {
    if (open) {
      setStep(1);
      setGlobalError(null);
    }
  }, [open]);

  // Handle OTP step (UI only)
  const onOtpStep = async ({ otp }: { otp: string }) => {
    if (!/^\d{6}$/.test(otp)) return;
    setOtpVerifying(true);
    await new Promise((res) => setTimeout(res, 1000)); // Simulate
    setOtpVerifying(false);
    setStep(2);
  };

  // Handle password reset API call
  const onPwStep = async ({ password }: { password: string; confirmPassword: string }) => {
    const otp = watchOtp("otp");
    const { error } = await userApis.resetPassword({ OTPCode: otp, password });

    if (error) {
      setGlobalError(error || "Failed to reset password.");
    } else {
      setGlobalError(null);
      // Redirect after short delay
      await new Promise((res) => setTimeout(res, 1000));
      router.push("/auth/login");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton className="min-h-[340px] w-full max-w-xs mx-auto">
        <DialogHeader>
          <DialogTitle>Reset Password</DialogTitle>
          <DialogDescription>
            {step === 1
              ? "Enter the 6-digit code sent to your email."
              : "Create your new password."}
          </DialogDescription>
        </DialogHeader>

        {/* Step 1: OTP Entry */}
        {step === 1 && (
          <form onSubmit={handleOtpSubmit(onOtpStep)} className="space-y-4">
            <InputOTP
              maxLength={6}
              value={watchOtp("otp")}
              onChange={(val) => setOtpValue("otp", val)}
              containerClassName="justify-center my-4"
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
            {otpErrors.otp && (
              <p className="text-xs text-red-500 text-center">
                {otpErrors.otp.message as string}
              </p>
            )}
            <Button className="w-full mt-4" type="submit" disabled={otpVerifying}>
              {otpVerifying ? "Verifying..." : "Confirm Code"}
            </Button>
          </form>
        )}

        {/* Step 2: Password Reset */}
        {step === 2 && (
          <form onSubmit={handlePwSubmit(onPwStep)} className="space-y-4">
            <div>
              <Label htmlFor="password">New Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="New password"
                {...pwRegister("password")}
              />
              {pwErrors.password && (
                <p className="text-xs text-red-500 mt-1">{pwErrors.password.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm password"
                {...pwRegister("confirmPassword")}
              />
              {pwErrors.confirmPassword && (
                <p className="text-xs text-red-500 mt-1">{pwErrors.confirmPassword.message}</p>
              )}
            </div>
            <div className="flex justify-between">
              <Button type="button" variant="outline" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Resetting..." : "Reset Password"}
              </Button>
            </div>
          </form>
        )}

        {/* Global Error */}
        {globalError && (
          <p className="text-xs text-red-500 mt-3 text-center">{globalError}</p>
        )}

        <footer className="mt-4 text-xs text-gray-500 text-center">
          Something not working? Contact support.
        </footer>
      </DialogContent>
    </Dialog>
  );
};

export default OtpResetDialog;
