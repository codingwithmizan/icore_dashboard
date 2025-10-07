import { auth } from "@/auth";
import { getSession } from "next-auth/react";

interface ApiResponse<T> {
  success: boolean;
  data: T | null;
  status: number;
  message: string;
}

const getBaseUrl = (): string => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!baseUrl) {
    throw new Error("Base URL is not defined in environment variables.");
  }
  return baseUrl;
};

const getAuthToken = async () => {
  const session = typeof window === "undefined" ? await auth() : await getSession();
  return (session?.user as { token?: string })?.token ?? null;
};

const fetchApi = async <S = undefined, T = unknown>(
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
  body?: S
): Promise<ApiResponse<T>> => {
  try {
    const token = await getAuthToken();
    const baseUrl = getBaseUrl();
    const url = `${baseUrl}/${endpoint}`;
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const options: RequestInit = {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
      credentials: "include",
    };

    const response = await fetch(url, options);
    const isJson = response.headers.get("Content-Type")?.includes("application/json");
    const parsedResponse = isJson ? await response.json() : null;

    if (!response.ok) {
      throw new Error(parsedResponse?.message || `HTTP error! StAatus: ${response.status}`);
    }

    return {
      success: true,
      data: parsedResponse?.data as T,
      status: response.status,
      message: parsedResponse?.message || "Request successful",
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      status: 500,
      message: (error as Error).message || "An unknown error occurred.",
    };
  }
};

export const getData = async <T>(endpoint: string): Promise<ApiResponse<T>> => {
  return fetchApi<undefined, T>(endpoint, "GET");
};

export const postData = async <S, T>(endpoint: string, body: S): Promise<ApiResponse<T>> => {
  return fetchApi<S, T>(endpoint, "POST", body);
};

export const putData = async <S, T>(endpoint: string, body: S): Promise<ApiResponse<T>> => {
  return fetchApi<S, T>(endpoint, "PUT", body);
};

export const patchData = async <S, T>(endpoint: string, body: S): Promise<ApiResponse<T>> => {
  return fetchApi<S, T>(endpoint, "PATCH", body);
};

export const deleteData = async <T>(endpoint: string): Promise<ApiResponse<T>> => {
  return fetchApi<undefined, T>(endpoint, "DELETE");
};
