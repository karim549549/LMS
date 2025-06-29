"use client";
import { UseFormRegister, FieldErrors, UseFormGetValues } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import { GradeEnum, GenderEnum } from "@/validation/register";
import { RegisterSchema } from "@/validation/register";

interface StepStudentInfoProps {
  register: UseFormRegister<RegisterSchema>;
  errors: FieldErrors<RegisterSchema>;
  getValues: UseFormGetValues<RegisterSchema>;
  onBack: () => void;
  onSubmit: () => void;
  disabled: boolean;
}

export default function StepStudentInfo({ register, errors, getValues, onBack, onSubmit, disabled }: StepStudentInfoProps) {
  return (
    <>
      <div>
        <Label htmlFor="birthdate">Birthdate</Label>
        <Input
          id="birthdate"
          type="date"
          {...register("birthdate")}
          aria-invalid={!!errors.birthdate}
        />
        {errors.birthdate && <p className="text-xs text-red-500 mt-1">{errors.birthdate.message as string}</p>}
      </div>
      <div>
        <Label htmlFor="grade">Grade</Label>
        <select
          id="grade"
          {...register("grade")}
          className="w-full border-gray-200 rounded-md px-3 py-2 mt-1"
          defaultValue={getValues("grade") || ""}
        >
          <option value="" disabled>Select grade</option>
          {GradeEnum.options.map((g: string) => (
            <option key={g} value={g}>{g.replace("_", " ")}</option>
          ))}
        </select>
        {errors.grade && <p className="text-xs text-red-500 mt-1">{errors.grade.message as string}</p>}
      </div>
      <div>
        <Label htmlFor="gender">Gender</Label>
        <select
          id="gender"
          {...register("gender")}
          className="w-full border-gray-200 rounded-md px-3 py-2 mt-1"
          defaultValue={getValues("gender") || ""}
        >
          <option value="" disabled>Select gender</option>
          {GenderEnum.options.map((g: string) => (
            <option key={g} value={g}>{g.charAt(0).toUpperCase() + g.slice(1)}</option>
          ))}
        </select>
        {errors.gender && <p className="text-xs text-red-500 mt-1">{errors.gender.message as string}</p>}
      </div>
      <div>
        <Label htmlFor="phone">Phone (optional)</Label>
        <Input
          id="phone"
          type="tel"
          placeholder="Phone number"
          {...register("phone")}
          aria-invalid={!!errors.phone}
        />
        {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone.message as string}</p>}
      </div>
      <div className="flex gap-2 mt-4">
        <button
          type="button"
          className="w-1/2 font-semibold transition-all duration-150 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md py-2"
          onClick={onBack}
        >
          Back
        </button>
        <button
          type="button"
          className="w-1/2 font-semibold transition-all duration-150 bg-blue-600 hover:bg-blue-700 text-white rounded-md py-2 disabled:bg-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed"
          onClick={onSubmit}
          disabled={disabled}
        >
          Submit
        </button>
      </div>
    </>
  );
}