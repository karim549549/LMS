import TeacherCourseCardComponent, { TeacherCourseCardProps } from '@/components/teacher/TeacherCourseCard';
import TeacherCourseFilterBar from '@/components/teacher/TeacherCourseFilterBar';
import CreateCourseButton from '@/components/teacher/CreateCourseButton';
import { courseApis } from '@/services/apis/courseApi';
import { cookies } from 'next/headers';

interface TeacherPageProps {
  searchParams: Promise<Record<string, string | undefined>>;
}

export default async function TeacherPage({ searchParams }: TeacherPageProps) {
  const cookieStore = await cookies();
  const cookie = cookieStore.toString(); 

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

  return (
    <section className="flex flex-col gap-8 p-5 md:p-10">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-3xl font-black">Courses</h1>
        <CreateCourseButton />
      </div>
      {/* Filter/Search Bar */}
      <TeacherCourseFilterBar initialFilters={resolvedSearchParams} />
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