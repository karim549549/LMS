"use client";
import React, { useState } from "react";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Languages } from "lucide-react";
import { cn } from "@/lib/utils";

const languages = [
  { code: "en", label: "English" },
  { code: "ar", label: "العربية" },
];

export default function LanguageToggle() {
  const [value, setValue] = useState("en");

  return (
    <div
      className="flex items-center gap-1"
    >
      <Select  value={value} onValueChange={setValue}>
        <SelectTrigger className={cn(" flex items-center justify-center bg-transparent border-1 shadow-none hover:bg-blue-50 transition rounded-md ")}> 
          <SelectValue className="sr-only hidden" />
          <Languages className="w-5 h-5 text-gray-500" />
        </SelectTrigger>
        <SelectContent>
          {languages.map((lang) => (
            <SelectItem key={lang.code} value={lang.code} className="text-xs px-2 py-1">
              {lang.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
} 