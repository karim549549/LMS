import React from "react";
import Link from "next/link";
import { GraduationCap } from "lucide-react";

export default function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 group cursor-pointer select-none"
      aria-label="LMS Home"
    >
      <GraduationCap className='text-sky-500'  />
      <span className="text-2xl font-black tracking-wide bg-gradient-to-r from-sky-400 via-pink-500 to-purple-600 bg-clip-text text-transparent transition-all duration-300 group-hover:brightness-125 group-hover:drop-shadow-lg">
        LMS
      </span>
    </Link>
  );
}