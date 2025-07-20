"use client";
import React, { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PasswordField from "@/components/auth/PasswordField";
import GoogleButton from "@/components/auth/GoogleButton";
import { Plus } from "lucide-react";
import { assistantApi } from "@/services/apis/assistantApi";
import { useSearchParams, useRouter } from "next/navigation";
import { useUserStore } from '@/stores/userStore';
import Image from 'next/image';

const schema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
  avatar: z.any().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type FormData = z.infer<typeof schema>;

export default function FormSection() {
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [apiSuccess, setApiSuccess] = useState(false);
  const [tokenError, setTokenError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");
  const setUser = useUserStore((s) => s.setUser);

  useEffect(() => {
    if (!token) {
      setTokenError("Missing or invalid invitation token. Redirecting to login...");
      const timeout = setTimeout(() => {
        router.push("/auth/login");
      }, 10000);
      return () => clearTimeout(timeout);
    }
  }, [token, router]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarPreview(URL.createObjectURL(file));
    } else {
      setAvatarPreview(null);
    }
  };
  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setApiError(null);
    setApiSuccess(false);
    if (!token) {
      setApiError("Missing or invalid invitation token.");
      setLoading(false);
      return;
    }
    const avatarFile = data.avatar && data.avatar[0] ? data.avatar[0] : undefined;
    const { data: apiData, error } = await assistantApi.registerAssistant({
      token,
      firstName: data.firstName,
      lastName: data.lastName,
      password: data.password,
      avatar: avatarFile,
    });
    setLoading(false);
    if (error) {
      setApiError(error);
    } else {
      setApiSuccess(true);
      if (apiData?.user) {
        setUser(apiData.user);
      }
      router.push("/assistant");
      console.log(apiData);
    }
  };

  if (tokenError) {
    return (
      <div className="w-full text-center text-red-500 text-sm">
        {tokenError}
        <br />
        <span className="text-xs text-gray-400">You will be redirected to login in 10 seconds...</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col items-center gap-3">
      {/* Avatar Upload */}
      <div className="relative mb-2">
        <div
          className="w-16 h-16 rounded-full border-2 border-dotted border-gray-300 flex items-center justify-center bg-gray-100 cursor-pointer transition-all duration-200 hover:border-blue-400 hover:shadow-md"
          onClick={handleAvatarClick}
          tabIndex={0}
          role="button"
          aria-label="Upload avatar"
        >
          {avatarPreview ? (
            <Image
              src={avatarPreview}
              alt="Avatar preview"
              className="w-full h-full object-cover rounded-full"
              width={64}
              height={64}
            />
          ) : (
            <Plus className="w-6 h-6 text-gray-400" />
          )}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={e => {
              handleAvatarChange(e);
              register("avatar").onChange(e);
            }}
            className="hidden"
          />
        </div>
        {errors.avatar && <p className="text-xs text-red-500 mt-1 text-center">{errors.avatar.message as string}</p>}
      </div>
      {/* Name fields */}
      <div className="w-full">
        <Input
          {...register("firstName")}
          placeholder="First Name"
          className="text-xs py-2 px-3 rounded border border-gray-200 focus:border-blue-400 transition-all duration-150 h-9"
        />
        {errors.firstName && <p className="text-xs text-red-500 mt-1">{errors.firstName.message}</p>}
      </div>
      <div className="w-full">
        <Input
          {...register("lastName")}
          placeholder="Last Name"
          className="text-xs py-2 px-3 rounded border border-gray-200 focus:border-blue-400 transition-all duration-150 h-9"
        />
        {errors.lastName && <p className="text-xs text-red-500 mt-1">{errors.lastName.message}</p>}
      </div>
      {/* Password fields */}
      <PasswordField
        label="Password"
        id="password"
        register={register}
        error={errors.password?.message}
        tooltip="Password must be at least 6 characters."
      />
      <PasswordField
        label="Confirm Password"
        id="confirmPassword"
        register={register}
        error={errors.confirmPassword?.message}
        tooltip="Repeat your password."
      />
      {/* API error/success */}
      {apiError && <div className="text-xs text-red-500 text-center w-full">{apiError}</div>}
      {apiSuccess && <div className="text-xs text-green-600 text-center w-full">Registration successful! Redirecting...</div>}
      {/* Sign up button */}
      <Button type="submit" className="w-full text-xs py-2 rounded h-9 transition-all duration-150 bg-blue-500 hover:bg-blue-600 focus:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300" disabled={loading}>
        {loading ? 'Signing up...' : 'Sign up'}
      </Button>
      {/* Divider and Google sign in */}
      <div className="flex items-center w-full my-2">
        <div className="flex-grow h-px bg-gray-200" />
        <span className="mx-2 text-xs text-gray-400">or</span>
        <div className="flex-grow h-px bg-gray-200" />
      </div>
      <GoogleButton />
    </form>
  );
}