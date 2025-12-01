"use client";

import { useChatStore } from "@/store/chatStore";
import { useSidebarStore } from "@/store/useSidebarStore";

import ChatSidebarItem from "./ChatSidebarItem";
import { Plus, Search, Library, Folder, ChevronLeft, ChevronRight } from "lucide-react";
import { groupChats } from "@/lib/groupChats";
import clsx from "clsx";

export default function ChatSidebar() {
  const chats = useChatStore((s) => s.chats);
  const createChat = useChatStore((s) => s.createChat);
  const activeChatId = useChatStore((s) => s.activeChatId);

  const { collapsed, toggle } = useSidebarStore();

  const groups = groupChats(chats);

  return (
    <div
      className={clsx(
        "h-full border-r border-zinc-900 bg-black/60 backdrop-blur-md transition-all duration-300",
        "flex flex-col",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* HEADER – TOGGLE BUTTON */}
      <div className="flex items-center justify-between p-3">
        <button
          onClick={toggle}
          className="p-2 rounded-md hover:bg-zinc-800 transition"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      {/* TOP ACTION BUTTONS */}
      <div className={clsx("flex flex-col gap-2 px-3", collapsed && "items-center px-1")}>
        
        {/* Nuevo chat */}
        <button
          onClick={createChat}
          className={clsx(
            "flex items-center gap-2 px-3 py-2 rounded-md bg-red-700 hover:bg-red-600 transition text-white w-full",
            collapsed && "justify-center px-0"
          )}
        >
          <Plus size={16} />
          {!collapsed && "Nuevo chat"}
        </button>

        {/* Buscar chats */}
        <SidebarButton collapsed={collapsed} icon={<Search size={16} />} label="Buscar chats" />

        {/* Biblioteca */}
        <SidebarButton collapsed={collapsed} icon={<Library size={16} />} label="Biblioteca" />

        {/* Proyectos */}
        <SidebarButton collapsed={collapsed} icon={<Folder size={16} />} label="Proyectos" />

      </div>

      {/* LISTA DE CHATS – solo mostrar cuando NO está colapsado */}
      {!collapsed && (
        <div className="flex-1 overflow-y-auto mt-4 px-2">
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
      )}
    </div>
  );
}

function SidebarButton({
  collapsed,
  icon,
  label,
}: {
  collapsed: boolean;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      className={clsx(
        "flex items-center gap-2 px-3 py-2 rounded-md hover:bg-zinc-800 transition text-zinc-200 w-full",
        collapsed && "justify-center px-0"
      )}
    >
      {icon}
      {!collapsed && label}
    </button>
  );
}
