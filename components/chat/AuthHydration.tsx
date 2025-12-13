"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";

export default function AuthHydration() {
  const setUser = useAuthStore((s) => s.setUser);

  useEffect(() => {
    const raw = localStorage.getItem("auth_user");
    if (raw) {
      try {
        setUser(JSON.parse(raw));
      } catch {
        localStorage.removeItem("auth_user");
      }
    }
  }, [setUser]);

  return null;
}
