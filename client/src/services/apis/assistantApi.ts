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

import { AuthApiResponse } from '@/types/user/user.types';

export const assistantApi = {
  async registerAssistant(params: {
    token: string;
    firstName: string;
    lastName: string;
    password: string;
    avatar?: File | null;
  }): Promise<AuthApiResponse> {
    try {
      const formData = new FormData();
      formData.append('token', params.token);
      formData.append('firstName', params.firstName);
      formData.append('lastName', params.lastName);
      formData.append('password', params.password);
      if (params.avatar) {
        formData.append('avatar', params.avatar);
      }
      const res = await fetch(`${BASE_URL}assistant/register`, {
        method: 'POST',
        body: formData,
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