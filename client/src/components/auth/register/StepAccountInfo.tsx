"use client";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { RegisterSchema } from "@/validation/register";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail } from "lucide-react";
import React from "react";
import PasswordField from "../PasswordField";

interface StepAccountInfoProps {
  register: UseFormRegister<RegisterSchema>;
  errors: FieldErrors<RegisterSchema>;

  disabled: boolean;
  onNext: () => void;
}

export default function StepAccountInfo({ register, errors, disabled, onNext }: StepAccountInfoProps) {
  return (
    <>
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
      <button
        type="button"
        className="w-full font-semibold transition-all duration-150 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed mt-2 rounded-md py-2"
        onClick={onNext}
        disabled={disabled}
      >
        Next
      </button>
    </>
  );
}