// Central API client for the Express + MongoDB backend.
// NOTE: We do NOT use TanStack Start's createServerFn here on purpose —
// all server-side logic lives in the separate Express backend
// (portfolio-backend/), which is deployed as its own Vercel serverless
// function. This file only does plain client-side fetch() calls to that
// backend, using httpOnly cookies for auth (hence credentials: "include").

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:5000/api";

// ---- Shared response shapes (must match crudControllerFactory.js) ----

interface ApiListResponse<T> {
  success: boolean;
  count: number;
  data: T[];
}

interface ApiItemResponse<T> {
  success: boolean;
  data: T;
}

interface ApiMessageResponse {
  success: boolean;
  message: string;
}

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

// Generic fetch wrapper. Throws ApiError on non-2xx so callers can
// catch a single error type instead of checking res.ok everywhere.
export async function apiRequest<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    credentials: "include", // required so the httpOnly admin cookie is sent
    headers: {
      "Content-Type": "application/json",
      ...(options.headers ?? {}),
    },
    ...options,
  });

  // Handle 204/empty bodies safely
  const text = await res.text();
  const body = text ? JSON.parse(text) : null;

  if (!res.ok) {
    const message = body?.message ?? `Request failed with status ${res.status}`;
    throw new ApiError(message, res.status);
  }

  return body as T;
}

// ---- Auth API ----

export interface AdminUser {
  _id: string;
  email: string;
  // add more fields here once Admin.js fields beyond email/password are confirmed
}

export const authApi = {
  login: (email: string, password: string) =>
    apiRequest<{ success: boolean; otpRequired: boolean; message: string }>(
      "/auth/login",
      {
        method: "POST",
        body: JSON.stringify({ email, password }),
      }
    ),

  verifyOtp: (email: string, otp: string) =>
    apiRequest<{ success: boolean; token: string; admin: AdminUser }>(
      "/auth/verify-otp",
      {
        method: "POST",
        body: JSON.stringify({ email, otp }),
      }
    ),

  forgotPassword: (email: string) =>
    apiRequest<{ success: boolean; message: string }>("/auth/forgot-password", {
      method: "POST",
      body: JSON.stringify({ email }),
    }),

  resetPassword: (email: string, token: string, newPassword: string) =>
    apiRequest<{ success: boolean; message: string }>("/auth/reset-password", {
      method: "POST",
      body: JSON.stringify({ email, token, newPassword }),
    }),

  logout: () =>
    apiRequest<ApiMessageResponse>("/auth/logout", {
      method: "POST",
    }),

  me: () => apiRequest<ApiItemResponse<AdminUser>>("/auth/me"),
  changePassword: async (currentPassword: string, newPassword: string) => {
    const res = await fetch(`${API_URL}/auth/change-password`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // sends the httpOnly cookie
      body: JSON.stringify({ currentPassword, newPassword }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new ApiError(data.message || "Failed to change password", res.status);
    }

    return data; // { success: true, message: "Password updated successfully" }
  },
};

// ---- Generic CRUD factory ----
// Matches crudControllerFactory.js exactly:
//   getAll  -> { success, count, data: T[] }
//   getOne  -> { success, data: T }
//   create  -> { success, data: T }
//   update  -> { success, data: T }
//   remove  -> { success, message }   <-- no `data` field, handled below

export function createCrudApi<T>(resource: string) {
  const base = `/${resource}`;

  return {
    getAll: () => apiRequest<ApiListResponse<T>>(base).then((r) => r.data),

    getOne: (id: string) =>
      apiRequest<ApiItemResponse<T>>(`${base}/${id}`).then((r) => r.data),

    create: (payload: Partial<T>) =>
      apiRequest<ApiItemResponse<T>>(base, {
        method: "POST",
        body: JSON.stringify(payload),
      }).then((r) => r.data),

    update: (id: string, payload: Partial<T>) =>
      apiRequest<ApiItemResponse<T>>(`${base}/${id}`, {
        method: "PUT",
        body: JSON.stringify(payload),
      }).then((r) => r.data),

    // IMPORTANT: delete response has no `data` field, only a message —
    // so we return the message instead of trying to read .data here.
    remove: (id: string) =>
      apiRequest<ApiMessageResponse>(`${base}/${id}`, {
        method: "DELETE",
      }).then((r) => r.message),
  };
}

// ---- Contact form (public, rate-limited on backend) ----

export const contactApi = {
  send: (payload: { name: string; email: string; message: string }) =>
    apiRequest<ApiMessageResponse>("/contact", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
};