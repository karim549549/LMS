"use client";

import React from "react";
import Container from "@/components/custom/Container";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
// Mock data for demo
const mockCourse = {
  id: "1",
  title: "Mathematics for Grade 10",
  desc: "Master algebra, geometry, and more with interactive lessons and real exam practice.",
  tags: ["Math", "Grade 10"],
  price: 0,
  image: "https://placehold.co/600x240?text=Math+10",
  teacher: {
    name: "Mr. Ahmed Hassan",
    avatar: "https://placehold.co/64x64?text=AH",
    bio: "Experienced Math teacher helping students excel for 15+ years.",
  },
  stats: {
    lessons: 12,
    duration: "8h 30m",
    level: "Intermediate",
    language: "Arabic",
  },
  learn: [
    "Solve real exam problems with confidence",
    "Understand key algebra and geometry concepts",
    "Apply math to everyday situations",
    "Prepare for final exams with practice quizzes",
  ],
  curriculum: [
    { title: "Introduction & Course Overview", type: "video", duration: "10m" },
    { title: "Algebra Basics", type: "video", duration: "45m" },
    { title: "Geometry Essentials", type: "video", duration: "50m" },
    { title: "Practice Quiz 1", type: "quiz", duration: "15m" },
    { title: "Exam Strategies", type: "video", duration: "30m" },
  ],
};

export default function CourseDetailPage() {
  // In real app, fetch course by params.id
  const course = mockCourse;
  const searchParams = useSearchParams();

  // Try to preserve filter/search state in back link
  let backHref = "/courses";
  if (typeof window !== "undefined" && document.referrer && document.referrer.includes("/courses")) {
    backHref = document.referrer;
  } else if (searchParams && searchParams.toString()) {
    backHref = `/courses?${searchParams.toString()}`;
  }

  return (
    <section className="w-full min-h-screen bg-white py-8">
      <Container>
        {/* Back Button */}
        <div className="mb-6">
          <Button
            variant="outline"
            size="sm"
            asChild
            aria-label="Back to courses"
          >
            <Link href={backHref}>&larr; Back to Courses</Link>
          </Button>
        </div>
        {/* Hero Section */}
        <div className="flex flex-col md:flex-row gap-8 mb-10">
          {/* Image */}
          <div className="md:w-2/5 w-full flex-shrink-0">
            <Image
              src={course.image}
              alt={course.title}
              className="rounded-xl w-full h-56 md:h-72 object-cover mb-4 md:mb-0"
            />
          </div>
          {/* Main Info */}
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
              <div className="flex flex-wrap gap-2 mb-3">
                {course.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-gray-700 mb-4 text-lg">{course.desc}</p>
            </div>
            <div className="flex items-center gap-6 mt-4">
              <span className="text-2xl font-bold text-blue-700">
                {course.price === 0 ? "Free" : `EGP ${course.price}`}
              </span>
              <Button size="lg" variant="default">
                {course.price === 0 ? "Enroll for Free" : "Enroll Now"}
              </Button>
            </div>
          </div>
        </div>
        {/* Overview & Teacher */}
        <div className="flex flex-col md:flex-row gap-8 mb-10">
          {/* What you'll learn */}
          <div className="md:w-2/3 w-full bg-gray-50 rounded-lg p-6 mb-4 md:mb-0">
            <h2 className="text-xl font-semibold mb-3">What you&apos;ll learn</h2>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              {course.learn.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
          {/* Teacher Info & Stats */}
          <div className="md:w-1/3 w-full flex flex-col gap-4">
            <div className="flex items-center gap-4 bg-white border rounded-lg p-4">
              <Image
                src={course.teacher.avatar}
                alt={course.teacher.name}
                className="rounded-full w-14 h-14 object-cover border"
              />
              <div>
                <div className="font-semibold text-blue-900">{course.teacher.name}</div>
                <div className="text-xs text-gray-500">{course.teacher.bio}</div>
              </div>
            </div>
            <div className="bg-white border rounded-lg p-4 flex flex-col gap-2 text-sm">
              <div><span className="font-semibold">Lessons:</span> {course.stats.lessons}</div>
              <div><span className="font-semibold">Duration:</span> {course.stats.duration}</div>
              <div><span className="font-semibold">Level:</span> {course.stats.level}</div>
              <div><span className="font-semibold">Language:</span> {course.stats.language}</div>
            </div>
          </div>
        </div>
        {/* Curriculum */}
        <div className="bg-gray-50 rounded-lg p-6 mb-10">
          <h2 className="text-xl font-semibold mb-4">Course Curriculum</h2>
          <ul className="divide-y divide-gray-200">
            {course.curriculum.map((item, i) => (
              <li key={i} className="py-3 flex items-center gap-4">
                <span className="font-medium text-gray-800">{item.title}</span>
                <span className="text-xs text-gray-500">{item.type === "video" ? "Video" : "Quiz"}</span>
                <span className="ml-auto text-xs text-gray-500">{item.duration}</span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
      {/* Sticky enroll button for mobile */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t z-30 md:hidden flex items-center justify-center py-3 px-4">
        <Button size="lg" className="w-full max-w-md">
          {course.price === 0 ? "Enroll for Free" : "Enroll Now"}
        </Button>
      </div>
    </section>
  );
} 