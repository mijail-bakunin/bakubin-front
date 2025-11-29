"use client";

import { useChatStore } from "@/store/chatStore";
import { Info, RotateCcw, Square } from "lucide-react";

export default function ChatTopbar() {
  // Selectores simples → no generan warnings de getSnapshot
  const activeChatId = useChatStore((s) => s.activeChatId);
  const chats = useChatStore((s) => s.chats);

  const activeChat = chats.find((c) => c.id === activeChatId);
  const title = activeChat?.title ?? "Selecciona o crea un chat";

  return (
    <div className="flex items-center justify-between border-b border-zinc-800 px-6 py-3">
      <h1 className="text-lg font-medium text-zinc-100 truncate">
        {title}
      </h1>

      {/* Iconos “fantasma” por ahora, puro front */}
      <div className="flex items-center gap-4 text-zinc-500">
        <button
          type="button"
          className="hover:text-zinc-200 transition"
          aria-label="Regenerar última respuesta"
        >
          <RotateCcw size={18} />
        </button>
        <button
          type="button"
          className="hover:text-zinc-200 transition"
          aria-label="Detener generación"
        >
          <Square size={18} />
        </button>
        <button
          type="button"
          className="hover:text-zinc-200 transition"
          aria-label="Información del chat"
        >
          <Info size={18} />
        </button>
      </div>
    </div>
  );
}
