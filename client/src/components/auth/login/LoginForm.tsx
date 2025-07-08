import React , {useState} from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginSchema } from '@/validation/login';
import AuthAlert from '@/components/auth/AuthAlert';
import { userApis } from '@/services/apis/userApi';
import { useUserStore } from '@/stores/userStore';
import { Label } from '@/components/ui/label';
import  {Button} from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DoorOpen, Mail } from 'lucide-react';
import PasswordField from '@/components/auth/PasswordField';
import Link from 'next/link';

export default function LoginForm() {
      const router = useRouter();
      const [apiError, setApiError] = useState<string | null>(null);
      const [showAllErrors, setShowAllErrors] = useState(false);
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
      
  return (
    <>
      <AuthAlert
        errorList={errorList}
        showAllErrors={showAllErrors}
        setShowAllErrors={setShowAllErrors}
      />
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
        <div className="space-y-2">
          <Label className="font-bold text-xs text-neutral-500" htmlFor="email">
            Email:
          </Label>
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
          <Link
            href="/auth/forgetpassword"
            className="text-xs text-blue-600 hover:underline"
          >
            Forgot password?
          </Link>
        </div>
        <Button
          type="submit"
          className="w-full cursor-pointer text-xs font-semibold transition-all duration-150 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed "
          disabled={
            signInLoading || isSubmitting || Object.keys(errors).length > 0
          }
        >
          {signInLoading || isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              Signing in...
            </span>
          ) : (
            <>
              <DoorOpen className="mr-2 " size={18} />
              <span>Sign In</span>
            </>
          )}
        </Button>
        <p className="text-gray-500 text-center text-xs leading-tight">
          Enter your email and password to access your dashboard. If you forgot your password, use the link below to reset it.
        </p>
      </form>
    </>
  );
}
