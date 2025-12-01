"use client";

import { useState, useEffect } from "react";
import clsx from "clsx";

export default function Tooltip({
  label,
  children,
  side = "right",
  disabled = false, // ← NUEVO
}: {
  label: string;
  children: React.ReactNode;
  side?: "right" | "left" | "top" | "bottom";
  disabled?: boolean;
}) {
  const [visible, setVisible] = useState(false);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  // Si el tooltip está deshabilitado, lo ocultamos inmediatamente
  useEffect(() => {
    if (disabled && visible) setVisible(false);
  }, [disabled, visible]);

  const show = () => {
    if (disabled) return;
    const t = setTimeout(() => setVisible(true), 250);
    setTimer(t);
  };

  const hide = () => {
    if (timer) clearTimeout(timer);
    setVisible(false);
  };

  if (disabled) {
    return <>{children}</>;
  }

  return (
    <div
      className="relative inline-flex items-center"
      onMouseEnter={show}
      onMouseLeave={hide}
    >
      {children}

      {visible && (
        <div
          className={clsx(
            "absolute px-2 py-1 text-xs rounded-md backdrop-blur-md bg-zinc-900/80 text-white shadow-xl",
            "border border-zinc-700 whitespace-nowrap transition-all duration-150",

            side === "right" && "left-full ml-2 top-1/2 -translate-y-1/2",
            side === "left" && "right-full mr-2 top-1/2 -translate-y-1/2",
            side === "top" && "bottom-full mb-2 left-1/2 -translate-x-1/2",
            side === "bottom" && "top-full mt-2 left-1/2 -translate-x-1/2"
          )}
        >
          {label}
        </div>
      )}
    </div>
  );
}
