"use client";

import { useUIStore } from "@/store/uiStore";
import { useState } from "react";
import clsx from "clsx";
import { Paperclip, Mic, Image, Settings, Trash2 } from "lucide-react";

export default function ChatToolbar() {
  const hide = useUIStore((s) => s.hideToolbar);

  const [active, setActive] = useState<string | null>(null);

  const buttons = [
    { id: "file", icon: <Paperclip />, label: "Adjuntar" },
    { id: "audio", icon: <Mic />, label: "Audio" },
    { id: "image", icon: <Image />, label: "Imagen" },
    { id: "settings", icon: <Settings />, label: "Opciones" },
    { id: "clear", icon: <Trash2 />, label: "Borrar chat" },
  ];

  return (
    <div
      className={clsx(
        "fixed bottom-6 left-1/2 -translate-x-1/2 z-40",
        "transition-all duration-300 ease-out",
        hide
          ? "opacity-0 translate-y-6 pointer-events-none"
          : "opacity-100 translate-y-0"
      )}
    >
      <div
        className={clsx(
          "flex items-center gap-3 px-4 py-2 rounded-2xl shadow-2xl",
          "backdrop-blur-md bg-black/40 border border-red-500/10",
          "transition-all duration-300 ease-out",
          "hover:scale-[1.02] active:scale-[0.97]"
        )}
      >
        {buttons.map((btn, index) => (
          <div key={btn.id} className="flex items-center">

            <button
              onClick={() => setActive(btn.id)}
              className={clsx(
                "p-2 rounded-xl transition-all duration-300",
                "hover:bg-red-700/20 hover:text-red-400",
                active === btn.id
                  ? "text-red-400 bg-red-600/20 shadow-[0_0_10px_rgba(255,80,80,0.5)]"
                  : "text-zinc-300"
              )}
            >
              {btn.icon}
            </button>

            {index < buttons.length - 1 && (
              <div className="w-[1px] h-5 bg-red-500/20 mx-2" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
