import React from "react";
import { BookOpen, FileText, ListChecks, BarChart3, Bell, CreditCard, MessageCircle, Award } from "lucide-react";
import Container from "@/components/custom/Container";

const features = [
  {
    icon: <BookOpen className="w-6 h-6 text-blue-600" />, // Organized Courses & Lessons
    title: "Organized Courses & Lessons",
    desc: "Browse video lessons, PDFs, and resources—all structured by your teacher for your class.",
  },
  {
    icon: <ListChecks className="w-6 h-6 text-blue-600" />, // Assignments & Quizzes
    title: "Assignments & Quizzes",
    desc: "Complete homework, quizzes, and practice tests. Get instant feedback and grades.",
  },
  {
    icon: <FileText className="w-6 h-6 text-blue-600" />, // Easy Submissions
    title: "Easy Submissions",
    desc: "Upload your answers and projects online. No more lost papers or missed deadlines!",
  },
  {
    icon: <BarChart3 className="w-6 h-6 text-blue-600" />, // Progress Tracking
    title: "Progress Tracking",
    desc: "See your progress, grades, and achievements at a glance. Celebrate your milestones.",
  },
  {
    icon: <Bell className="w-6 h-6 text-blue-600" />, // Reminders & Announcements
    title: "Reminders & Announcements",
    desc: "Never miss a lesson or deadline. Get updates and important messages from your teacher.",
  },
  {
    icon: <CreditCard className="w-6 h-6 text-blue-600" />, // Simple Payments
    title: "Simple Payments",
    desc: "Pay for your courses securely with local options like Fawry, Vodafone Cash, or Stripe.",
  },
  {
    icon: <MessageCircle className="w-6 h-6 text-blue-600" />, // Direct Communication
    title: "Direct Communication",
    desc: "Message your teacher or get help when you need it. Stay connected and supported.",
  },
  {
    icon: <Award className="w-6 h-6 text-blue-600" />, // Personalized Experience
    title: "Personalized Experience",
    desc: "Your teacher tailors content, feedback, and support just for you—no big platform, just your class.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="w-full py-16 bg-white border-b border-gray-100 flex flex-col items-center">
      <Container>
        <h2 className="text-2xl font-bold mb-8 text-center">What You Get in Your Class</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full">
          {features.map((feature, i) => (
            <div key={i} className="bg-gray-100 rounded-lg p-6 text-center flex flex-col items-center shadow-sm">
              <div className="w-12 h-12 mb-3 flex items-center justify-center bg-blue-100 rounded-full">
                {feature.icon}
              </div>
              <div className="font-semibold mb-1">{feature.title}</div>
              <div className="text-sm text-gray-600">{feature.desc}</div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
} 