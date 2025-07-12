import React from 'react';
import { notFound } from 'next/navigation';
import { courseApis } from '@/services/apis/courseApi';
import { cookies } from 'next/headers';
import InlineStaffSection from '@/components/teacher/courses/[id]/edit_and_manage/Inline&StaffSections';

interface EditCoursePageProps {
  params: Promise<{ id: string }>;
}

export default async function EditCoursePage({ params }: EditCoursePageProps) {
  const {id} = await params;
  const cookieStore = await cookies();
  const cookie = cookieStore.toString();
  // Fetch course data on the server with credentials
  const { data: course, error } = await courseApis.getCourseEditManageData(id, cookie);
  if (!course) {
    console.error('Course not found or API error:', { id, error, course });
    return notFound();
  }

  return (
    <div className="ml-16">
      <h1 className="text-3xl font-bold mb-6">Edit & Manage Course <span className="text-violet-600">{course.title}</span></h1>
      {/* Sub-navigation bar */}
      <InlineStaffSection course={course} />
    </div>
  );
} 