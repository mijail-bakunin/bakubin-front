"use client";

import { useChatStore } from "@/store/chatStore";

export default function ChatTopbar() {
  const chat = useChatStore((s) =>
    s.chats.find((c) => c.id === s.activeChatId)
  );

  return (
    <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
      <h1 className="text-lg font-semibold tracking-wide text-zinc-200">
        {chat?.title ?? "Nuevo chat"}
      </h1>
    </div>
  );
}
