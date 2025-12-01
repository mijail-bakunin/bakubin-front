"use client";
import { useState } from "react";

export default function ThemeToggle() {
  const [active, setActive] = useState(true);

  return (
    <button
      onClick={() => setActive(!active)}
      className="
        relative w-14 h-7 rounded-full
        bg-zinc-900 border border-red-600/40
        flex items-center transition-all duration-300
        shadow-inner
      "
    >
      <div
        className={`
          absolute top-0.5 h-6 w-6 rounded-full
          transition-all duration-300
          bg-red-600 shadow-[0_0_12px_rgba(255,0,0,0.5)]
          ${active ? "left-0.5" : "left-7"}
        `}
      />
    </button>
  );
}
