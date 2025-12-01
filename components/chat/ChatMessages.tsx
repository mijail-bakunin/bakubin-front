"use client";

import { useRef, useEffect, useCallback } from "react";
import { Message } from "@/store/chatStore";
import ChatMessage from "./ChatMessage";
import clsx from "clsx";

type Props = {
  messages: Message[];
  isTyping?: boolean;
};

type MessageGroup = {
  dateLabel: string;
  items: Message[];
};

function groupByDate(messages: Message[]): MessageGroup[] {
  const map = new Map<string, Message[]>();

  for (const m of messages) {
    const d = new Date(m.createdAt);
    const key = d.toDateString();
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(m);
  }

  return Array.from(map.entries()).map(([key, items]) => ({
    dateLabel: new Date(key).toLocaleDateString("es-AR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
    items,
  }));
}

export default function ChatMessages({ messages, isTyping }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const grouped = groupByDate(messages ?? []);

  // Detecta si el usuario está en el fondo (importante)
  const isAtBottom = useCallback(() => {
    const el = containerRef.current;
    if (!el) return true;
    const dif = el.scrollHeight - el.scrollTop - el.clientHeight;
    return dif < 20; // margen tolerante
  }, []);

  // Auto-scroll inteligente
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    if (isAtBottom()) {
      el.scrollTo({
        top: el.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages.length, isTyping, isAtBottom]);

  return (
    <div
      ref={containerRef}
      className="flex-1 overflow-y-auto px-6 py-4 space-y-6 custom-scroll"
    >
      {grouped.map((group) => (
        <div key={group.dateLabel} className="space-y-3">
          {/* Separador de fecha */}
          <div className="flex items-center gap-3 text-xs text-zinc-500 select-none">
            <div className="h-px flex-1 bg-zinc-800" />
            <span className="uppercase tracking-wide">{group.dateLabel}</span>
            <div className="h-px flex-1 bg-zinc-800" />
          </div>

          {group.items.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))}
        </div>
      ))}

      {/* Indicador de “escribiendo…” */}
      {isTyping && (
        <div className="w-full flex justify-start mt-2">
          <div className="inline-flex items-center gap-2 px-3 py-2 rounded-2xl bg-zinc-900/80 border border-zinc-800 text-xs text-zinc-300">
            <span className="typing-dots">
              <span />
              <span />
              <span />
            </span>
            <span>Bakubin está escribiendo…</span>
          </div>
        </div>
      )}
    </div>
  );
}
