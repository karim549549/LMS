import React from "react";
import Image from "next/image";
import authLanding from "@/assets/authlanding.jpg";
import LanguageToggle from "@/components/custom/LanguageToggle";
import Logo from "@/components/custom/Logo";
import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="min-h-screen flex flex-col bg-gray-50">
      <header className="w-full py-4 bg-white shadow-sm">
        <nav className="max-w-7xl mx-auto flex items-center justify-between px-6">
          <Logo />
          <LanguageToggle />
        </nav>
      </header>
 
      <div className="flex-1 flex items-center justify-center min-h-[60vh]">
        <div className="w-full max-w-7xl flex flex-col md:flex-row items-center justify-center gap-0">
          <div className="flex-shrink-0 max-w-xl w-full flex flex-col justify-center p-8">
            {children}
          </div>
          <div className="hidden md:block relative flex-1 min-h-[400px]">
            <Image
              src={authLanding}
              alt="Authentication visual"
              fill
              className="object-cover"
              sizes="(min-width: 768px) 50vw, 100vw"
              priority
            />
          </div>
        </div>
      </div>
      <footer className="flex border-t-1 items-center p-2 w-full text-center align-center justify-center">
        <p className="text-sm text-gray-500">don &apos;t have an account? <Link href="/auth/register" className="text-blue-500 hover:text-blue-600">Sign  up </Link></p>
      </footer>
    </section>
  );
} 