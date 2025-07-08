import React from "react";
import Logo from "@/components/custom/Logo";
import LanguageToggle from "@/components/custom/LanguageToggle";
import Link from "next/link";
import ScatterIcons from "@/components/custom/ScatterIcons";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="min-h-screen flex flex-col bg-gray-50 relative">
      <ScatterIcons count={20} />
      <header className="w-full py-4 bg-white shadow-sm">
        <nav className="max-w-7xl mx-auto flex items-center justify-between px-6">
          <Logo />
          <div className="flex items-center gap-2">
            <Link
              href='/auth/register'
              className="px-4 py-1 rounded-md font-semibold text-xs border border-blue-300 transition-all duration-200 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 hover:from-blue-500 hover:to-purple-500 hover:text-white hover:border-blue-500 focus:outline-none"
            >
              Register
            </Link>
            <Link
              href='/auth/login'
              className="px-4 py-1 rounded-md font-semibold text-xs border border-pink-300 transition-all duration-200 bg-gradient-to-r from-pink-100 to-purple-100 text-pink-700 hover:from-pink-500 hover:to-purple-500 hover:text-white hover:border-pink-500 focus:outline-none"
            >
              Sign In
            </Link>
            <hr className="mx-1 h-9 w-[1px] border-1 " />
            <LanguageToggle />
            
          </div>
        </nav>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center relative">
        <ScatterIcons count={50} />
        {children}
      </main>
    </section>
  );
} 