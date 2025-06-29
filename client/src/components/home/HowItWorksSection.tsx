import React from "react";
import { UserPlus, BookOpen, FileText, MessageCircle, Award } from "lucide-react";
import Container from "@/components/custom/Container";

const steps = [
  {
    number: 1,
    icon: <UserPlus className="w-10 h-10 text-blue-600" />,
    title: "Join Your Teacher's Class",
    desc: "Sign up and get access to your teacher's private online classroom—no big platform, just your class.",
    image: null, // Placeholder for future image/illustration
  },
  {
    number: 2,
    icon: <BookOpen className="w-10 h-10 text-blue-600" />,
    title: "Watch Lessons & Learn",
    desc: "Stream video lessons, read notes, and download resources—all organized for your course.",
    image: null, // Placeholder for future image/illustration
  },
  {
    number: 3,
    icon: <FileText className="w-10 h-10 text-blue-600" />,
    title: "Submit Assignments & Quizzes",
    desc: "Upload your homework and take quizzes online. Get feedback and grades directly from your teacher.",
    image: null, // Placeholder for future image/illustration
  },
  {
    number: 4,
    icon: <MessageCircle className="w-10 h-10 text-blue-600" />,
    title: "Stay Connected",
    desc: "Receive reminders, announcements, and chat with your teacher if you need help.",
    image: null, // Placeholder for future image/illustration
  },
  {
    number: 5,
    icon: <Award className="w-10 h-10 text-blue-600" />,
    title: "Track Your Progress",
    desc: "See your grades, progress, and achievements as you move through the course.",
    image: null, // Placeholder for future image/illustration
  },
];

// Canvas accent placeholder
function HowItWorksCanvas() {
  return (
    <canvas
      className="absolute inset-0 w-full h-full pointer-events-none opacity-30"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  );
}

export default function HowItWorksSection() {
  return (
    <section className="relative w-full py-16 bg-gray-50 border-b border-gray-100 overflow-x-hidden">
      <HowItWorksCanvas />
      <Container>
        <h2 className="text-2xl font-bold mb-16 text-center relative z-10">How It Works</h2>
        <div className="flex flex-col gap-24 relative z-10">
          {steps.map((step, i) => (
            <div
              key={i}
              className="flex flex-col md:flex-row items-center justify-between gap-8 min-h-[220px] w-full group"
            >
              {/* Left: Number & Icon */}
              <div className="flex flex-col items-center md:items-end md:w-1/3">
                <span className="text-5xl md:text-6xl font-extrabold text-blue-100 group-hover:text-blue-400 transition mb-2">
                  {step.number}
                </span>
                <span className="mb-4">{step.icon}</span>
              </div>
              {/* Center: Text */}
              <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
                <div className="text-2xl font-bold mb-2 text-blue-900">{step.title}</div>
                <div className="text-gray-600 text-lg mb-2 max-w-xl">{step.desc}</div>
              </div>
              {/* Right: Image/Illustration Placeholder */}
              <div className="hidden md:flex md:w-1/3 items-center justify-center">
                {/* Placeholder for future image/illustration */}
                <div className="w-32 h-32 bg-blue-50 border-2 border-dashed border-blue-200 rounded-xl flex items-center justify-center text-blue-300 text-xs">
                  Image/Canvas
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
} 