"use client";

import { useState } from "react";
import { useChatStore } from "@/store/chatStore";

export default function ChatInput() {
  // Selectores seguros, UNO por propiedad:
  const activeChatId = useChatStore((s) => s.activeChatId);
  const addMessage = useChatStore((s) => s.addMessage);
  const addAssistantMessage = useChatStore((s) => s.addAssistantMessage);
  const renameChat = useChatStore((s) => s.renameChat);
  const chats = useChatStore((s) => s.chats);

  const [value, setValue] = useState("");

  const handleSend = () => {
    if (!activeChatId || !value.trim()) return;

    const userMessage = value.trim();

    // 1) Agregar el mensaje del usuario
    addMessage(activeChatId, {
      id: crypto.randomUUID(),
      role: "user",
      content: userMessage,
      createdAt: Date.now(),
    });

    // 2) Si es el PRIMER mensaje del chat → renombrar automáticamente
    const chat = chats.find((c) => c.id === activeChatId);
    if (chat && chat.messages.length === 0) {
      renameChat(activeChatId, userMessage.slice(0, 42));
    }

    // 3) Respuesta simulada
    setTimeout(() => {
      addAssistantMessage(
        activeChatId,
        `Respuesta simulada a: "${userMessage}"`
      );
    }, 400);

    setValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex items-center gap-3 p-3 rounded-lg bg-zinc-900 border border-zinc-800">
      <textarea
        className="flex-1 bg-transparent resize-none outline-none text-sm text-zinc-100"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        rows={1}
        placeholder="Escribe un mensaje..."
      />

      <button
        onClick={handleSend}
        className="px-3 py-1.5 bg-red-600 rounded-md text-sm hover:bg-red-700 transition"
      >
        Enviar
      </button>
    </div>
  );
}
