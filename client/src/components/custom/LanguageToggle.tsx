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
      <Languages className="w-4 h-4 text-gray-500" />
      <Select value={value} onValueChange={setValue}>
        <SelectTrigger className={cn("w-20 h-7 px-2 py-1 text-xs")}> 
          <SelectValue />
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