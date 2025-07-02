import type {
  User,
  AuthApiResponse,
  CreateUserDto,
} from "@/types/user/user.types";

const BASE_URL = process.env.BACKEND_URL || "http://localhost:4000/";

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
        "Request failed",
    };
  }
  return { data: json as T, error: null };
}

export const userApis = {
  async login(email: string, password: string): Promise<AuthApiResponse> {
    try {
      const res = await fetch(`${BASE_URL}auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });
      return handleApiResponse<{ user: User }>(res);
    } catch {
      return {
        data: null,
        error: "Unable to connect. Please try again later.",
      };
    }
  },

  async register(data: CreateUserDto): Promise<AuthApiResponse> {
    try {
      const res = await fetch(`${BASE_URL}auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });
      return handleApiResponse<{ user: User }>(res);
    } catch {
      return {
        data: null,
        error: "Unable to connect. Please try again later.",
      };
    }
  },

  async refresh(): Promise<AuthApiResponse> {
    try {
      const res = await fetch(`${BASE_URL}auth/refresh`, {
        method: "GET",
        credentials: "include",
      });
      return handleApiResponse<{ user: User }>(res);
    } catch {
      return {
        data: null,
        error: "Unable to connect. Please try again later.",
      };
    }
  },

  async me(): Promise<AuthApiResponse> {
    try {
      const res = await fetch(`${BASE_URL}auth/me`, {
        method: "GET",
        credentials: "include",
      });
      return handleApiResponse<{ user: User }>(res);
    } catch {
      return {
        data: null,
        error: "Unable to connect. Please try again later.",
      };
    }
  },

  async forgetPassword(email: string): Promise<{ error: string | null }> {
    try {
      const res = await fetch(`${BASE_URL}auth/forget-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email }),
      });
      return handleApiResponse(res);
    } catch {
      return {
        error: "Unable to connect. Please try again later.",
      };
    }
  },

  async resetPassword({
    OTPCode,
    password,
  }: {
    OTPCode: string;
    password: string;
  }): Promise<{ error: string | null }> {
    try {
      const res = await fetch(`${BASE_URL}auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ OTPCode, password }),
      });
      return handleApiResponse(res);
    } catch {
      return {
        error: "Unable to connect. Please try again later.",
      };
    }
  },
};
