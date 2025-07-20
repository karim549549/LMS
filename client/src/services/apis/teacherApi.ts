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

import { User, AuthApiResponse } from '@/types/user/user.types';

export const teacherApi = {
  async getAssistants(cookie?: string): Promise<{ data: User[] | null; error: string | null }> {
    try {
      const res = await fetch(`${BASE_URL}teacher/assistants`, {
        method: 'GET',
        credentials: 'include',
        headers: cookie ? { cookie } : undefined,
      });
      return handleApiResponse<User[]>(res);
    } catch {
      return {
        data: null,
        error: 'Unable to connect. Please try again later.',
      };
    }
  },
  async inviteAssistant({ email, courseId, permissions, message }: { email: string; courseId?: string; permissions?: string[]; message?: string }): Promise<AuthApiResponse> {
    try {
      const res = await fetch(`${BASE_URL}teacher/invite-assistant`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, courseId, permissions, message }),
      });
      return handleApiResponse<AuthApiResponse['data']>(res);
    } catch {
      return {
        data: null,
        error: 'Unable to connect. Please try again later.',
      };
    }
  },
};