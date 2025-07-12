'use client';
import React from "react";
import HeroCanvasBackground from "@/components/custom/HeroCanvasBackground";
import Image from "next/image";
import LandingImage from "@/assets/landingimage.jpeg";
import { ArrowRight, Rocket } from "lucide-react";
import Container from "@/components/custom/Container";
import { useUserStore } from "@/stores/userStore";
import { AvatarFallback , Avatar  } from "@/components/ui/avatar";
import Link from "next/link";

export default function HeroSection() {
  const { user }  =  useUserStore();
  const latestCourse = {
    id: "course-123",
    title: "Modern React for Teachers",
    lessonId: "lesson-7",
    lessonTitle: "Hooks & State Management"
  };
  return (
    <section className="flex mt-15 flex-col gap-10">
      {user  && (
        <section >
          <Container className="flex items-center bg-gray-200 mt-3 gap-6 py-6">
            <Avatar className="w-16 h-16">
              {/* Remove avatarUrl for now, fallback to first letter */}
              <AvatarFallback className="text-3xl bg-violet-600 text-white font-bold">{user.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-1">
              <div className="items-center gap-3">
                <h1 className="text-2xl text-gray-600 font-semibold">Welcome back, <span className="font-black">{user.name}</span></h1>
              </div>
              <div className="mt-2 flex items-center gap-4">
                <span className="text-sm text-gray-700 font-medium">Continue your lesson:</span>
                <Link href={`/courses/${latestCourse.id}/lessons/${latestCourse.lessonId}`} className="text-purple-700 font-semibold underline hover:text-purple-900 transition">
                  {latestCourse.title} &mdash; {latestCourse.lessonTitle}
                </Link>
              </div>
              {/* Progress bar */}
              <div className="flex items-center gap-2">
                <div className="w-32 h-2 bg-gray-300 rounded-full overflow-hidden">
                  <div className="h-2 bg-purple-500 rounded-full transition-all" style={{ width: '60%' }} />
                </div>
                <span className="text-xs text-gray-600 font-semibold">60%</span>
              </div>
            </div>
          </Container>
        </section>
      )}
      <section className="relative w-full  py-16 dark:bg-gray-950 border-b border-gray-100 dark:border-gray-800 overflow-hidden">
        <HeroCanvasBackground />
        <Container className="flex flex-col mt-40 md:flex-row items-center justify-between gap-8">
          {/* Left: Text & CTA */}
          <div className="flex-1 flex flex-col items-start justify-center max-w-xl z-10">
            <span className="inline-block mb-4 px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full dark:bg-blue-900 dark:text-blue-200">Learn anytime, Anywhere</span>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Unlock Your <span className="text-blue-300">Potential</span> <br className="hidden md:block" />with Online Learning
            </h1>
            <p className="text-lg text-blue-100 mb-6">
              Discover expertly designed courses, flexible learning paths, and a community that supports your goals — all in one powerful platform.
            </p>
            <div className="flex gap-4 mb-6">
              <button className="group px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition flex items-center gap-2">
                Explore Courses
                <span className="flex items-center gap-1">
                  <Rocket className="transition-transform duration-300 group-hover:rotate-12 group-hover:translate-x-1" size={18} />
                  <ArrowRight className="transition-transform duration-300 group-hover:rotate-12 group-hover:translate-x-1" size={18} />
                </span>
              </button>
              <button className="px-6 py-3 bg-white border border-gray-300 text-blue-600 rounded-lg font-semibold shadow hover:bg-gray-100 transition dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-800">Learn More</button>
            </div>
            {/* Stats Row */}
            <div className="flex gap-6 text-sm text-blue-200 mt-2">
              <div className="flex items-center gap-2"><span className="font-bold text-white">12M+</span> Students</div>
              <div className="flex items-center gap-2"><span className="font-bold text-white">60K+</span> Courses</div>
              <div className="flex items-center gap-2"><span className="font-bold text-white">4.8/5</span> Avg. Rating</div>
            </div>
          </div>
          {/* Right: Visuals */}
          <div className="flex-1 flex items-center justify-center relative min-w-[320px] max-w-md w-full z-10">
            {/* Student Image */}
            <div className="w-56 h-56 md:w-100 md:h-100  flex items-center justify-center overflow-hidden relative z-10">
              <Image
                src={LandingImage}
                alt="Student landing visual"
                fill
                style={{ objectFit: "cover" }}
                className="object-cover"
                priority
              />
            </div>
            {/* Course Card Placeholder (overlapping) */}
            <div className="absolute left-1/2 -translate-x-1/2 top-2/3 md:top-3/4 w-64 bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-100 dark:border-gray-800 p-4 flex flex-col items-start z-20" style={{ transform: 'translate(-50%, -30%)' }}>
              <div className="w-full h-24 bg-gray-100 dark:bg-gray-800 rounded-lg mb-3 flex items-center justify-center text-gray-400">[Course Image]</div>
              <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full mb-2">Featured</span>
              <div className="font-semibold text-gray-900 dark:text-white mb-1">Full-Stack Web Development</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">4.8 (1,240 ratings)</div>
              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                <span>$79</span>
                <span>• 45 Lessons</span>
                <span>• 8,500+ Enrolled</span>
              </div>
            </div>
            {/* Floating Badge Placeholder */}
            <div className="absolute right-0 top-0 md:-right-8 md:-top-8 bg-yellow-400 text-yellow-900 font-bold px-4 py-2 rounded-full shadow-lg z-30 text-xs">Congrats! Your Admission Completed</div>
          </div>
        </Container>
      </section>
    </section>
  );
}