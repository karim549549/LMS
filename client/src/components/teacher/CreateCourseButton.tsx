"use client";

import React from "react";
import { useRouter } from 'next/navigation';
import { courseApis } from "@/services/apis/courseApi";

export default function CreateCourseButton() {
  const router = useRouter();

  const handleCreateCourse = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      const { data } = await courseApis.createDraft();
      if (data?.id) {
        router.push(`/teacher/courses/${data.id}/edit_and_manage`);
      }
    } catch (error) {
      console.error('Failed to create course:', error);
      // You might want to show a toast notification here
    }
  };

  return (
    <button
      onClick={handleCreateCourse}
      className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-6 py-3 rounded-lg shadow transition text-center w-full md:w-auto"
    >
      + Create a New Course
    </button>
  );
} 