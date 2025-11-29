"use client";

import { useChatStore } from "@/store/chatStore";
import { RotateCcw, Info } from "lucide-react";
import clsx from "clsx";

export default function ChatTopbar() {
  // Selectores independientes (seguros)
  const activeChatId = useChatStore((s) => s.activeChatId);
  const chats = useChatStore((s) => s.chats);
  const regenerate = useChatStore((s) => s.regenerateLastMessage);
  const openModal = useChatStore((s) => s.openModal);

  const chat = chats.find((c) => c.id === activeChatId) ?? null;
  const hasMessages = chat && chat.messages.length > 0;

  if (!chat) return null;

  return (
    <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-black/70 backdrop-blur">
      
      {/* Título */}
      <h1 className="text-lg font-medium opacity-90 truncate">
        {chat.title || "Chat sin título"}
      </h1>

      {/* Controles (solo para lectura o acciones rápidas) */}
      <div className="flex items-center gap-3">
        
        {/* Regenerar */}
        <button
          onClick={() => activeChatId && regenerate(activeChatId)}
          disabled={!hasMessages}
          className={clsx(
            "p-2 rounded transition",
            hasMessages
              ? "hover:bg-zinc-800"
              : "opacity-40 cursor-default"
          )}
          title="Regenerar última respuesta"
        >
          <RotateCcw size={18} />
        </button>

        {/* Info → abre modal */}
        <button
          onClick={() => openModal("info")}
          className="p-2 hover:bg-zinc-800 rounded transition"
          title="Información del proyecto"
        >
          <Info size={18} />
        </button>
      </div>
    </div>
  );
}
