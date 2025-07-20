"use client";
import React, { useEffect } from "react";
import type { CourseEditManageView } from '@/types/course/CourseEditManageView';
import CourseInfo from './CourseInfo';
import { useCourseStore } from '@/stores/courseStore';
import CourseThumbnail from "./CourseThumbnail";
import StaffSection from "./staff/StaffSection";

interface InlineStaffSectionProps {
  course: CourseEditManageView;
}

export default function InlineStaffSection({ course }: InlineStaffSectionProps) {
  const reset = useCourseStore(state => state.reset);

  useEffect(() => {
    reset(course);
  }, [course, reset]);

  return (
    <div className="space-y-6">
      <CourseInfo 
        title={course.title}
        description={course.description ?? ''}
        grade={course.grade ?? ''}
        price={course.price}
      />
      <CourseThumbnail thumbnail={course.thumbnail ?? null} />
      <StaffSection/>
    </div>
  );
}