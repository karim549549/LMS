// no "use client"

import { notFound } from 'next/navigation';
import { cookies } from 'next/headers';
import { courseApis } from '@/services/apis/courseApi';
import InlineStaffSection from '@/components/teacher/courses/[id]/edit_and_manage/Inline&StaffSections';
import type { CourseEditManageView } from '@/types/course/CourseEditManageView';

interface EditCoursePageProps {
  params: Promise<{ id: string }>;
}

export default async function EditCoursePage({ params }: EditCoursePageProps) {
  const { id } = await params;
  const cookieStore = await cookies();
  const cookie = cookieStore.toString(); 
  const { data, error  } = await courseApis.getCourseEditManageData(id  , cookie); 

  if (error || !data) {
    console.error('Course not found or API error:', { id, error, data });
    return notFound();
  }

  const course: CourseEditManageView = data;
  console.log(course);
  return (
    <div className="ml-16">
      <h1 className="text-3xl font-bold mb-6">
        Edit & Manage Course <span className="text-violet-600">{course.title}</span>
      </h1>
      {/* Sub-navigation bar */}
      <InlineStaffSection course={course} />
    </div>
  );
}
