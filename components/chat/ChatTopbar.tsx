"use client";

import { useChatStore } from "@/store/chatStore";

export default function ChatTopbar() {
  // SELECTORES SEPARADOS (seguro)
  const activeChatId = useChatStore((s) => s.activeChatId);
  const chats = useChatStore((s) => s.chats);

  // NO se ejecuta dentro del selector → es seguro
  const chat = chats.find((c) => c.id === activeChatId) ?? null;

  return (
    <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
      <h1 className="text-lg font-semibold tracking-wide text-zinc-200">
        {chat?.title ?? "Nuevo chat"}
      </h1>
    </div>
  );
}
