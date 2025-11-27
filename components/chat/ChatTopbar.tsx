"use client";

import { useChatStore } from "@/store/chatStore";
import { RotateCcw, Square, Info } from "lucide-react";

export default function ChatTopbar() {
  const { activeChatId, chats, regenerateLastMessage } = useChatStore();

  const chat = chats.find((c) => c.id === activeChatId);

  if (!chat) return null;

  const isGenerating = false; 
  // Más adelante esto va a reflejar el estado real del streaming

  return (
    <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800 bg-black/70 backdrop-blur">
      {/* Título */}
      <h1 className="text-lg font-medium opacity-90 truncate">
        {chat.title || "Chat sin título"}
      </h1>

      {/* Controles */}
      <div className="flex items-center gap-3">

        {/* Botón Regenerar */}
        <button
          onClick={() => regenerateLastMessage(chat.id)}
          className="p-2 hover:bg-zinc-800 rounded transition"
          title="Regenerar respuesta"
        >
          <RotateCcw size={18} />
        </button>

        {/* Botón Detener Generación (por ahora mock) */}
        <button
          disabled={!isGenerating}
          className="p-2 hover:bg-zinc-800 rounded transition disabled:opacity-40"
          title="Detener generación"
        >
          <Square size={18} />
        </button>

        {/* Botón Info */}
        <button
          className="p-2 hover:bg-zinc-800 rounded transition"
          title="Información del chat"
        >
          <Info size={18} />
        </button>
      </div>
    </div>
  );
}
