"use client";

import { useState } from "react";
import { useChatStore } from "@/store/chatStore";
import {
  Paperclip,
  Mic,
  Image,
} from "lucide-react";

export default function ChatInput() {
  const activeChatId = useChatStore((s) => s.activeChatId);
  const addMessage = useChatStore((s) => s.addMessage);
  const addAssistantMessage = useChatStore((s) => s.addAssistantMessage);
  const renameChat = useChatStore((s) => s.renameChat);
  const chats = useChatStore((s) => s.chats);

  const [value, setValue] = useState("");
  const [openMenu, setOpenMenu] = useState(false);

  const handleSend = () => {
    if (!activeChatId || !value.trim()) return;

    const userMessage = value.trim();

    addMessage(activeChatId, {
      id: crypto.randomUUID(),
      role: "user",
      content: userMessage,
      createdAt: Date.now(),
    });

    const chat = chats.find((c) => c.id === activeChatId);
    if (chat && chat.messages.length === 0) {
      renameChat(activeChatId, userMessage.slice(0, 42));
    }

    setTimeout(() => {
      addAssistantMessage(activeChatId, `Respuesta simulada a "${userMessage}"`);
    }, 400);

    setValue("");
  };

  return (
    <div className="relative">
      {/* Panel vertical */}
      {openMenu && (
        <div className="absolute bottom-14 left-0 flex flex-col gap-2 p-3 rounded-xl bg-zinc-900 border border-zinc-700 shadow-2xl">
          <button className="p-2 rounded-md hover:bg-zinc-700 transition">
            <Paperclip size={18} />
          </button>
          <button className="p-2 rounded-md hover:bg-zinc-700 transition">
            <Image size={18} />
          </button>
          <button className="p-2 rounded-md hover:bg-zinc-700 transition">
            <Mic size={18} />
          </button>
        </div>
      )}

      <div className="flex items-center gap-3 p-3 rounded-lg bg-zinc-900 border border-zinc-800">
        <button
          onClick={() => setOpenMenu(!openMenu)}
          className="p-2 rounded-md hover:bg-zinc-700 transition"
        >
          <span className="text-xl">+</span>
        </button>

        <textarea
          className="flex-1 bg-transparent resize-none outline-none text-sm text-zinc-100"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          rows={1}
          placeholder="Escribe un mensaje…"
        />

        <button
          onClick={handleSend}
          className="p-3 bg-red-600 rounded-md hover:bg-red-700 transition"
        >
          ➤
        </button>
      </div>
    </div>
  );
}
