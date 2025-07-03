"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, Eye, EyeOff, Info } from "lucide-react";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { UseFormRegister, FieldValues, Path } from "react-hook-form";

interface PasswordFieldProps<T extends FieldValues> {
  label: string;
  id: Path<T>;
  register: UseFormRegister<T>;
  error?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  tooltip?: string;
}

export default function PasswordField<T extends FieldValues>({ label, id, register, error, value, onChange, placeholder = "••••••••", tooltip = "Password must be at least 6 characters." }: PasswordFieldProps<T>) {
  const [show, setShow] = useState(false);
  return (
    <div className='space-y-2'>
      <Label className="text-xs text-neutral-500 font-bold " htmlFor={id}>{label}:</Label>
      <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-md px-2 focus-within:border-blue-500">
        <span className="text-gray-400">
          <Lock size={18} />
        </span>
        <Input
          id={id}
          type={show ? "text" : "password"}
          placeholder={placeholder}
          className="flex-1 border-none bg-transparent focus:ring-0 focus-visible:ring-0 px-2"
          {...register(id)}
          value={value}
          onChange={onChange}
          aria-invalid={!!error}
        />
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="text-yellow-500 cursor-pointer flex items-center justify-center w-8 h-8">
              <Info size={18} />
            </span>
          </TooltipTrigger>
          <TooltipContent side="top">
            {tooltip}
          </TooltipContent>
        </Tooltip>
        <button
          type="button"
          tabIndex={-1}
          className="cursor-pointer text-gray-400 hover:text-gray-600 flex items-center justify-center w-8 h-8"
          onClick={() => setShow((v) => !v)}
          aria-label={show ? "Hide password" : "Show password"}
        >
          {show ? <EyeOff  size={18} /> : <Eye size={18} />}
        </button>
      </div>
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}