"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import TeacherCourseCardComponent, { TeacherCourseCardProps } from '@/components/teacher/TeacherCourseCard';
import TeacherCourseFilterBar from '@/components/teacher/courses/TeacherCourseFilterBar';
import { courseApis } from "@/services/apis/courseApi";

const FILTERS: ("all" | TeacherCourseCardProps['state'])[] = ["all", "DRAFT", "PUBLIC", "READY"];

interface TeacherCourseSectionProps {
  courses: TeacherCourseCardProps[];
  loading?: boolean;
  error?: string | null;
  initialFilters?: Record<string, string | undefined>;
}

export default function TeacherCourseSection({ courses, loading = false, error = null, initialFilters = {} }: TeacherCourseSectionProps) {
  const router = useRouter();

  // Initialize state from initialFilters (URL query params)
  const [search, setSearch] = useState(initialFilters.title ?? "");
  const [filter, setFilter] = useState<"all" | TeacherCourseCardProps['state']>(
    (initialFilters.state as TeacherCourseCardProps['state']) || "all"
  );
  const [orderBy, setOrderBy] = useState<string>(initialFilters.orderBy ?? 'newest');

  // When a filter changes, update the URL (which triggers SSR re-render)
  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.set('title', search);
    if (filter && filter !== 'all') params.set('state', filter);
    if (orderBy && orderBy !== 'newest') params.set('orderBy', orderBy);
    const query = params.toString();
    router.push(query ? `?${query}` : '?');
    // eslint-disable-next-line
  }, [search, filter, orderBy]);

  const handleCreateCourse = async () => {
    const {data} =  await courseApis.createDraft();
    console.log(data?.id);
    router.push(`teacher/courses/${data?.id}/edit_and_manage`);
  };

  return (
    <section className="flex flex-col gap-8 p-5 md:p-10">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-3xl font-black">Courses</h1>
        <Link
          href="#"
          onClick={e => { e.preventDefault(); handleCreateCourse(); }}
          className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-6 py-3 rounded-lg shadow transition text-center w-full md:w-auto"
        >
          + Create a New Course
        </Link>
      </div>
      {/* Filter/Search Bar */}
      <TeacherCourseFilterBar
        search={search}
        setSearch={setSearch}
        filter={filter}
        setFilter={setFilter}
        stateOptions={FILTERS}
        orderBy={orderBy}
        setOrderBy={setOrderBy}
      />
      {/* Courses List */}
      <div className="flex flex-col max-w-7xl gap-6">
        {loading ? (
          <div className="col-span-full text-center text-gray-400 py-10">Loading courses...</div>
        ) : error ? (
          <div className="col-span-full text-center text-red-500 py-10">{error}</div>
        ) : courses.length === 0 ? (
          <div className="col-span-full text-center text-gray-400 py-10">No courses found.</div>
        ) : (
          courses.map(course => (
            <TeacherCourseCardComponent key={course.id} {...course} />
          ))
        )}
      </div>
    </section>
  );
}