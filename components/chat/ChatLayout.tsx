"use client";

import { useEffect } from "react";
import { useChatStore } from "@/store/chatStore";
import ChatSidebar from "./ChatSidebar";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import ChatTopbar from "./ChatTopbar";
import Modal from "../ui/Modal";
import FloatingToolbar from "./FloatingToolbar";

export default function ChatLayout() {
  const activeChatId = useChatStore((s) => s.activeChatId);
  const chats = useChatStore((s) => s.chats);
  const setActiveChat = useChatStore((s) => s.setActiveChat);

  const activeChat = chats.find((c) => c.id === activeChatId) ?? null;

  useEffect(() => {
    if (!activeChatId && chats.length > 0) {
      setActiveChat(chats[0].id);
    }
  }, [activeChatId, chats, setActiveChat]);

  return (
    <div className="flex h-screen w-full bg-black text-white">
      <ChatSidebar />

      <div className="relative flex h-full flex-1 flex-col">
        <FloatingToolbar />

        {activeChat ? (
          <>
            <ChatTopbar />

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <ChatMessages messages={activeChat.messages} />
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
