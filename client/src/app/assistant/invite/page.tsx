import FormSection from "@/components/assistant/invite/FormSection";
import Image from 'next/image';

export default function RegisterAssistantPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white">
      <div className="bg-white shadow-2xl rounded-2xl px-6 py-10 w-full max-w-sm flex flex-col items-center relative">
        {/* Logo or Illustration */}
        <Image src="/logo.svg" alt="Brand" className="h-8 mb-4" width={80} height={32} />
        {/* Inviter badge */}
        <span className="mb-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
          Invited by Mr. Teacher
        </span>
        {/* Title & subtitle */}
        <h1 className="text-2xl font-bold mb-1 text-center">Join as Assistant</h1>
        <p className="text-sm text-gray-500 mb-6 text-center">
          Set up your profile to get started.
        </p>
        {/* Registration Form */}
        <FormSection />
        {/* Invitation details as a small print */}
        <div className="mt-4 text-xs text-gray-400 text-center">
          Invitation for: assistant@example.com &bull; Course: Algebra 101
        </div>
      </div>
    </div>
  );
}
