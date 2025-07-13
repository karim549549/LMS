"use client";
import React, { useEffect } from "react";
import type { CourseEditManageView } from '@/types/course/CourseEditManageView';
import CourseInfo from './CourseInfo';
import CourseStaffTable from './CourseStaffTable';
import { useCourseStore } from '@/stores/courseStore';
import CourseThumbnail from "./CourseThumbnail";

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
      <CourseInfo />
      <CourseThumbnail/>
      <CourseStaffTable />
    </div>
  );
}