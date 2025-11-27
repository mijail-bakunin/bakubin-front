"use client";

import { useEffect, useRef } from "react";
import { useChatStore } from "@/store/chatStore";
import ChatSidebar from "./ChatSidebar";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
import ChatTopbar from "./ChatTopbar";

export default function ChatLayout() {
  const { activeChatId, chats } = useChatStore();

  const chat = chats.find((c) => c.id === activeChatId);

  // Referencia al contenedor de mensajes para autoscroll
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!messagesEndRef.current) return;
    messagesEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [chat?.messages.length]);

  return (
    <div className="flex w-full h-full overflow-hidden">
      <ChatSidebar />

      {/* Área principal */}
      <div className="flex flex-col flex-1 bg-black text-white h-full">
        {!chat ? (
          <div className="flex flex-1 items-center justify-center opacity-60">
            <div className="text-center">
              <h1 className="text-3xl mb-2 font-semibold">Bienvenido a Bakubin</h1>
              <p className="text-sm">Crea un nuevo chat para comenzar</p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col h-full">
            {/* Header */}
            <ChatTopbar />

            {/* Mensajes */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {chat.messages.map((msg) => (
                <ChatMessage key={msg.id} message={msg} />
              ))}
              {/* ancla para el autoscroll */}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-zinc-800">
              <ChatInput />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
