"use client";

import { useChatStore } from "@/store/chatStore";
import Link from "next/link";

export default function ChatSidebar() {
  const { chats, createChat, setActiveChat, activeChatId } = useChatStore();

  const handleNewChat = () => {
    const id = createChat();
    setActiveChat(id);
  };

  return (
    <div className="w-72 bg-zinc-900 h-full border-r border-zinc-800 flex flex-col">
      <div className="p-4 border-b border-zinc-800">
        <button
          onClick={handleNewChat}
          className="w-full py-2 px-3 bg-red-700 hover:bg-red-600 rounded text-white"
        >
          + Nuevo Chat
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {chats.map((chat) => (
          <Link
            key={chat.id}
            href={`/chat/${chat.id}`}
            onClick={() => setActiveChat(chat.id)}
            className={`block p-3 text-sm border-b border-zinc-800 cursor-pointer ${
              activeChatId === chat.id ? "bg-zinc-800 text-red-400" : "text-gray-300"
            }`}
          >
            {chat.title}
          </Link>
        ))}
      </div>
    </div>
  );
}
