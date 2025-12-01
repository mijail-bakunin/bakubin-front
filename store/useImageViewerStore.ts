"use client";

import { create } from "zustand";

type ImageViewerState = {
  url: string | null;
  open: (url: string) => void;
  close: () => void;
};

export const useImageViewerStore = create<ImageViewerState>((set) => ({
  url: null,
  open: (url) =>
    set({
      url,
    }),
  close: () =>
    set({
      url: null,
    }),
}));
