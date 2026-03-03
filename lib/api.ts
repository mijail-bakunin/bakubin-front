"use client";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

function getHeaders() {
  const raw = localStorage.getItem("auth_user");
  const userId = raw ? JSON.parse(raw).id : null;

  return {
    "Content-Type": "application/json",
    "x-user-id": userId ?? "",
  };
}

export async function api<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      ...getHeaders(),
      ...(options.headers || {}),
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.message ?? "API error");
  }

  return data;
}
