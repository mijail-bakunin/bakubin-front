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

  // Seleccionar primer chat automáticamente
  useEffect(() => {
    if (!activeChatId && chats.length > 0) {
      setActiveChat(chats[0].id);
    }
  }, [activeChatId, chats.length, setActiveChat]);

  const scrollRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="flex h-screen w-full bg-black text-white overflow-hidden">
      <ChatSidebar />

      {/* Zona de chat */}
      <div className="relative flex flex-col flex-1 h-full">

        {/* Floating toolbar SIEMPRE arriba, independiente del scroll */}
        <FloatingToolbar />

        {activeChat ? (
          <>
            <ChatTopbar />

            {/* Área scrollable unificada */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4">
              <ChatMessages
                messages={activeChat.messages}
                scrollRef={scrollRef}
              />
            </div>

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
