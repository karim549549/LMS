const BASE_URL = process.env.BACKEND_URL || 'http://localhost:4000/';

async function handleApiResponse<T = unknown>(
  res: Response
): Promise<{ data: T | null; error: string | null }> {
  let json: unknown = null;
  try {
    json = await res.json();
  } catch {}
  if (!res.ok) {
    return {
      data: null,
      error:
        ((json as Record<string, unknown>)?.message as string) ||
        res.statusText ||
        'Request failed',
    };
  }
  return { data: json as T, error: null };
}

function toQueryString(params: Record<string, unknown>): string {
  if (!params || typeof params !== 'object' || Array.isArray(params)) {
    return '';
  }
  return Object.entries(params)
    .filter(([, v]) => v !== undefined && v !== null && v !== "")
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`)
    .join('&');
}

import type { CourseEditManageView } from '@/types/course/CourseEditManageView';
import type { 
  TeacherCoursesQueryFilter, 
  TeacherCourseCard, 
  PaginatedResult 
} from '@/types/course/courseApi.types';

export const courseApis = {
  async createDraft(): Promise<{ data: { id: string } | null; error: string | null }> {
    try {
      const res = await fetch(`${BASE_URL}course`, {
        method: 'POST',
        credentials: 'include',
      });
      return handleApiResponse<{ id: string }>(res);
    } catch {
      return {
        data: null,
        error: 'Unable to connect. Please try again later.',
      };
    }
  },
  async getTeacherCourses(filter: TeacherCoursesQueryFilter = {}, cookie?: string)
  : Promise<{ data: PaginatedResult<TeacherCourseCard> | null; error: string | null }> {
    try {
      const qs = toQueryString(filter);
      const res = await fetch(`${BASE_URL}teacher${qs ? `?${qs}` : ''}`, {
        method: 'GET',
        credentials: 'include',
        headers: cookie ? { cookie } : undefined,
      });
      return handleApiResponse<PaginatedResult<TeacherCourseCard>>(res);
    } catch {
      return {
        data: null,
        error: 'Unable to connect. Please try again later.',
      };
    }
  },
  async getCourseEditManageData(courseId: string, cookie?: string):
   Promise<{ data: CourseEditManageView | null; error: string | null }> {
    try {
      const res = await fetch(`${BASE_URL}teacher/${courseId}`, {
        method: 'GET',
        credentials: 'include',
        headers: cookie ? { cookie } : undefined,
      });
      return handleApiResponse<CourseEditManageView>(res);
    } catch {
      return {
        data: null,
        error: 'Unable to connect. Please try again later.',
      };
    }
  },
  async updateCourseInfo(
    courseId: string,
    data: Partial<Pick<TeacherCourseCard, 'title' | 'description' | 'grade' | 'price'>>,
  ): Promise<{ data: TeacherCourseCard | null; error: string | null }> {
    try {
      const res = await fetch(`${BASE_URL}teacher/courseInfo/${courseId}`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      return handleApiResponse<TeacherCourseCard>(res);
    } catch {
      return {
        data: null,
        error: 'Unable to connect. Please try again later.',
      };
    }
  },
  async updateCourseThumbnail(courseId: string, file: File | null)
  : Promise<{ data: CourseEditManageView | null; error: string | null }> {
    try {
      const formData = new FormData();
      if (file) {
        formData.append('thumbnail', file);
      }
      const res = await fetch(`${BASE_URL}teacher/courseInfo/${courseId}/thumbnail`, {
        method: 'PATCH',
        credentials: 'include',
        body: formData,
      });
      return handleApiResponse<CourseEditManageView>(res);
    } catch {
      return {
        data: null,
        error: 'Unable to connect. Please try again later.',
      };
    }
  },
};
