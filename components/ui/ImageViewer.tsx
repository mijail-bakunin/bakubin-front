"use client";

import { useEffect } from "react";
import { useImageViewerStore } from "@/store/useImageViewerStore";
import { X } from "lucide-react";

export default function ImageViewer() {
  const { url, close } = useImageViewerStore();

  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [close]);

  if (!url) return null;

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9999] flex items-center justify-center animate-fade-in"
      onClick={close}
    >
      {/* Botón cerrar */}
      <button
        onClick={close}
        className="absolute top-6 right-6 text-white bg-black/40 hover:bg-black/60 p-2 rounded-full transition"
      >
        <X size={28} />
      </button>

      {/* Imagen centrada */}
      <img
        src={url}
        className="max-w-[90%] max-h-[90%] rounded-lg shadow-2xl animate-zoom-in cursor-zoom-out"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}
    