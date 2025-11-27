"use client";

import { useState } from "react";
import { useChatStore } from "@/store/chatStore";

export default function ChatInput() {
  const [text, setText] = useState("");
  const { activeChatId, addMessage, addAssistantMessage } = useChatStore();

  const handleSend = () => {
    if (!text.trim() || !activeChatId) return;

    addMessage(activeChatId, {
      id: crypto.randomUUID(),
      role: "user",
      content: text,
      createdAt: Date.now(),
    });

    const userMessage = text;
    setText("");

    // Respuesta automática (mock)
    setTimeout(() => {
      addAssistantMessage(
        activeChatId,
        `Respuesta automática a: "${userMessage}"`
      );
    }, 600);
  };

  return (
    <div className="flex gap-2">
      <input
        className="flex-1 bg-zinc-900 text-white p-3 rounded border border-zinc-700 outline-none"
        value={text}
        placeholder="Escribe un mensaje..."
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
      />

      <button
        onClick={handleSend}
        className="px-4 bg-red-700 hover:bg-red-600 rounded text-white"
      >
        Enviar
      </button>
    </div>
  );
}
