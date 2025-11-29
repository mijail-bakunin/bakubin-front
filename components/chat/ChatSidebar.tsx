"use client";

import { useChatStore } from "@/store/chatStore";
import ChatSidebarItem from "./ChatSidebarItem";
import { Plus } from "lucide-react";
import { groupChats } from "@/lib/groupChats";

export default function ChatSidebar() {
  // Selectores 100% seguros (uno por propiedad)
  const chats = useChatStore((s) => s.chats);
  const createChat = useChatStore((s) => s.createChat);
  const activeChatId = useChatStore((s) => s.activeChatId);

  const groups = groupChats(chats);

  return (
    <div className="flex flex-col w-64 bg-black border-r border-zinc-900 h-full p-3 overflow-y-auto">

      {/* Nuevo chat */}
      <button
        onClick={createChat}
        className="flex items-center gap-2 px-3 py-2 mb-4 rounded-lg bg-red-700 hover:bg-red-600 transition"
      >
        <Plus size={16} />
        Nuevo Chat
      </button>

      {/* Listas por grupo */}
      {Object.entries(groups).map(([groupName, list]) =>
        list.length > 0 ? (
          <div key={groupName} className="mb-4">
            <div className="text-xs px-2 py-1 text-zinc-500 uppercase tracking-wide">
              {groupName}
            </div>

            <div className="space-y-1">
              {list.map((chat) => (
                <ChatSidebarItem
                  key={chat.id}
                  chat={chat}
                  active={chat.id === activeChatId}
                />
              ))}
            </div>
          </div>
        ) : null
      )}
    </div>
  );
}
