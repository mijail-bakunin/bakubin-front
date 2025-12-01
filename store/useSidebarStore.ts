// store/useSidebarStore.ts
"use client";

import { create } from "zustand";

type SidebarState = {
  collapsed: boolean;
  hydrated: boolean;
  toggle: () => void;
  setCollapsed: (v: boolean) => void;
  hydrate: () => void;
};

export const useSidebarStore = create<SidebarState>((set) => ({
  collapsed: false,     // SSR SIEMPRE arranca expandido → no rompe hydration
  hydrated: false,      // indica si ya leyó localStorage

  hydrate: () => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem("sidebar-collapsed");
    set({
      collapsed: saved ? JSON.parse(saved) : false,
      hydrated: true,
    });
  },

  toggle: () =>
    set((s) => {
      const newVal = !s.collapsed;
      if (typeof window !== "undefined" && s.hydrated) {
        localStorage.setItem("sidebar-collapsed", JSON.stringify(newVal));
      }
      return { collapsed: newVal };
    }),

  setCollapsed: (v) =>
    set(() => {
      if (typeof window !== "undefined") {
        localStorage.setItem("sidebar-collapsed", JSON.stringify(v));
      }
      return { collapsed: v };
    }),
}));
