"use client";

import { useEffect, useRef } from "react";
import { useChatStore } from "@/store/chatStore";
import ChatMessage from "./ChatMessage";

export default function ChatMessages() {
  const { chats, activeChatId } = useChatStore();
  const containerRef = useRef<HTMLDivElement>(null);

  const chat = chats.find((c) => c.id === activeChatId);

  // Scroll automático al final
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [chat?.messages]);

  if (!chat)
    return (
      <div className="flex-1 flex items-center justify-center text-zinc-500">
        Selecciona o crea un chat
      </div>
    );

  return (
    <div
      ref={containerRef}
      className="flex-1 overflow-y-auto p-4 space-y-4 bg-black"
    >
      {chat.messages.map((msg) => (
        <ChatMessage key={msg.id} message={msg} />
      ))}
    </div>
  );
}
