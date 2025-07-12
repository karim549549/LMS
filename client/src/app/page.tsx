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
import  MainNavbar from '@/components/custom/navs/MainNavbar'
import PageTransition from "@/components/custom/PageTransition";

export default function Home() {
  return (
    <PageTransition>
      <div className="flex flex-col min-h-screen  font-sans bg-gray-50">
        {/* NavBar */}
        <MainNavbar/>
        {/* Offset for fixed navbar */}
        <div className="pt-[120px]">
          <HeroSection />
          <SocialProofSection />
          <FeaturesSection />
          <HowItWorksSection />
          <AudienceSection />
          <DifferentiatorsSection />
          <TestimonialsSection />
          <PricingSection />
          <FAQSection />
        </div>
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
    </PageTransition>
  );
}
