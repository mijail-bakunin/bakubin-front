"use client";
import { create } from "zustand";

type UIStore = {
  hideToolbar: boolean;
  setHideToolbar: (v: boolean) => void;
};

export const useUIStore = create<UIStore>((set) => ({
  hideToolbar: false,
  setHideToolbar: (v) => set({ hideToolbar: v }),
}));
