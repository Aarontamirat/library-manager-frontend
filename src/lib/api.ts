import { getToken } from "./auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function apiFetch(endpoint: string, options: RequestInit = {}) {
  const token = getToken();

  const res = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token ? token : ""}` }),
      ...options.headers,
    },
    ...options,
  });

  if (!res.ok) {
    if (res.status === 401) {
      throw new Error("Unauthorized");
    }

    const error = await res.json();
    throw new Error(error.message || "API Error");
  }

  return res.json();
}
