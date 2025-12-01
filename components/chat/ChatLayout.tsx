"use client";

import { useEffect, useRef } from "react";
import { useChatStore } from "@/store/chatStore";
import ChatSidebar from "./ChatSidebar";
import ChatInput from "./ChatInput";
import ChatMessages from "./ChatMessages";
import ChatTopbar from "./ChatTopbar";
import FloatingToolbar from "./FloatingToolbar";
import Modal from "../ui/Modal";

export default function ChatLayout() {
  const activeChatId = useChatStore((s) => s.activeChatId);
  const chats = useChatStore((s) => s.chats);
  const setActiveChat = useChatStore((s) => s.setActiveChat);

  const activeChat = chats.find((c) => c.id === activeChatId) ?? null;

  // Autoseleccionar el primer chat al cargar
  useEffect(() => {
    if (!activeChatId && chats.length > 0) {
      setActiveChat(chats[0].id);
    }
  }, [activeChatId, chats.length, setActiveChat]);

  // Auto-scroll al final
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [activeChat?.messages.length, activeChat?.isGenerating]);

  return (
    <div className="flex h-screen w-full bg-black text-white overflow-hidden">
      <ChatSidebar />

      {/* Contenedor principal de chat */}
      <div className="relative flex flex-col flex-1 h-full">

        {/* Toolbar flotante — fija y no dependiente del scroll */}
        <FloatingToolbar />

        {activeChat ? (
          <>
            <ChatTopbar />

            {/* Mensajes con scroll */}
            <div className="flex-1 overflow-y-auto">
              <ChatMessages
                messages={activeChat.messages}
                isTyping={activeChat.isGenerating}
              />

              {/* Marcador para auto-scroll */}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-zinc-800 p-4">
              <ChatInput />
            </div>
          </>
        ) : (
          <div className="flex flex-1 items-center justify-center opacity-60">
            <div className="text-center">
              <h1 className="text-3xl mb-2 font-semibold">
                Bienvenido a Bakubin
              </h1>
              <p className="text-sm">Crea un nuevo chat para comenzar</p>
            </div>
          </div>
        )}

        <Modal />
      </div>
    </div>
  );
}
