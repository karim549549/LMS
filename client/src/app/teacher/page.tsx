import TeacherCourseSection from '@/components/teacher/TeacherCourseSection';
import { courseApis } from '@/services/apis/courseApi';
import { TeacherCourseCardProps } from '@/components/teacher/TeacherCourseCard';
import { cookies } from 'next/headers';

interface TeacherPageProps {
  searchParams: Promise<Record<string, string | undefined>>;
}

export default async function TeacherPage({ searchParams }: TeacherPageProps) {
  const cookieStore = await cookies();
  const cookie = cookieStore.toString();

  // Await searchParams for Next.js dynamic API compliance
  const resolvedSearchParams = await searchParams;

  let courses: TeacherCourseCardProps[] = [];
  let error: string | null = null;
  const loading = false;
  try {
    const res = await courseApis.getTeacherCourses(resolvedSearchParams, cookie);
    if (res.error) {
      error = res.error;
    } else {
      courses = res.data?.data || [];
    }
  } catch {
    error = 'Failed to fetch courses.';
  }
  return <TeacherCourseSection courses={courses} error={error} loading={loading} initialFilters={resolvedSearchParams} />;
}