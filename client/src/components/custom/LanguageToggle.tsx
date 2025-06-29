"use client";
import React, { useState } from "react";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Languages } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const languages = [
  { code: "en", label: "English" },
  { code: "ar", label: "العربية" },
];

export default function LanguageToggle() {
  const [value, setValue] = useState("en");

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex items-center gap-2"
    >
      <Languages className="w-5 h-5 text-gray-500" />
      <Select value={value} onValueChange={setValue}>
        <SelectTrigger className={cn("w-28")}> 
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {languages.map((lang) => (
            <SelectItem key={lang.code} value={lang.code}>
              {lang.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </motion.div>
  );
} 