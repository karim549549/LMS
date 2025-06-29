import React from "react";
import HeroSection from "@/components/home/HeroSection";
import SocialProofSection from "@/components/home/SocialProofSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import AudienceSection from "@/components/home/AudienceSection";
import DifferentiatorsSection from "@/components/home/DifferentiatorsSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import PricingSection from "@/components/home/PricingSection";
import FAQSection from "@/components/home/FAQSection";
import Link from "next/link";
import Container from "@/components/custom/Container";
import Logo from "@/components/custom/Logo";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen font-sans bg-gray-50">
      {/* NavBar */}
      <nav className="w-full bg-white/80 backdrop-blur border-b border-gray-200 sticky top-0 z-30">
        <Container className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <Link href="/" className="flex items-center gap-2" aria-label="Home">
            <Logo />
          </Link>
          {/* Navigation Links */}
          <div className="hidden md:flex gap-6 text-sm font-medium text-gray-700">
            <Link href="/" className="hover:text-blue-600 transition">Home</Link>
            <Link href="/courses" className="hover:text-blue-600 transition">Courses</Link>
            <Link href="/pricing" className="hover:text-blue-600 transition">Pricing</Link>
            <Link href="/about" className="hover:text-blue-600 transition">About</Link>
            <Link href="/contact" className="hover:text-blue-600 transition">Contact</Link>
          </div>
          {/* Auth Buttons */}
          <div className="flex gap-2">
            <Link href="/auth/login" className="px-4 py-2 rounded-lg text-blue-700 font-semibold hover:bg-blue-50 transition">Login</Link>
            <Link href="/auth/register" className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition">Register</Link>
          </div>
        </Container>
      </nav>
      <HeroSection />
      <SocialProofSection />
      <FeaturesSection />
      <HowItWorksSection />
      <AudienceSection />
      <DifferentiatorsSection />
      <TestimonialsSection />
      <PricingSection />
      <FAQSection />
      {/* Footer */}
      <footer className="w-full py-8 bg-gray-900 text-gray-200 flex flex-col items-center mt-auto">
        {/* TODO: Add real footer links and branding */}
        <div className="mb-2">[LMS Name] &copy; {new Date().getFullYear()}</div>
        <div className="flex gap-6 text-sm opacity-70">
          <a href="#" className="hover:underline">About</a>
          <a href="#" className="hover:underline">Docs</a>
          <a href="#" className="hover:underline">Contact</a>
        </div>
      </footer>
    </div>
  );
}
