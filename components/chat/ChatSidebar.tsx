"use client";

import { useEffect, useState } from "react";
import { useChatStore } from "@/store/chatStore";
import { useSidebarStore } from "@/store/useSidebarStore";
import { groupChatsByTime } from "@/lib/groupChatsByTime";
import ChatSidebarItem from "./ChatSidebarItem";
import Tooltip from "../ui/Tooltip";

import {
  Plus,
  Search,
  Library,
  Folder,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import clsx from "clsx";

export default function ChatSidebar() {
  const chats = useChatStore((s) => s.chats);
  const createChat = useChatStore((s) => s.createChat);
  const activeChatId = useChatStore((s) => s.activeChatId);

  const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>({});

  const { collapsed, toggle, setCollapsed, hydrated, hydrate } = useSidebarStore();

  const groups = groupChatsByTime(chats);

  const toggleGroup = (groupName: string) => {
    setCollapsedGroups(prev => ({
      ...prev,
      [groupName]: !prev[groupName]
    }));
  };

  // Hidratar store
  useEffect(() => {
    hydrate();
  }, [hydrate]);

  // Auto-colapsar en mobile
  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 900) setCollapsed(true);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [setCollapsed]);

  // Evitar Hydration Mismatch
  if (!hydrated) {
    return <div className="w-16 h-full border-r border-zinc-900 bg-black/60" />;
  }

  return (
    <div
      className={clsx(
        "h-full border-r border-zinc-900 bg-black/60 backdrop-blur-md",
        "transition-all duration-300 ease-[cubic-bezier(0.18,0.89,0.32,1.28)]",
        "flex flex-col",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* HEADER TOGGLE */}
      <div className="flex items-center justify-between p-3">
        <Tooltip label={collapsed ? "Expandir" : "Colapsar"} disabled={false}>
          <button
            onClick={toggle}
            className="p-2 rounded-md hover:bg-zinc-800 transition text-zinc-300"
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </Tooltip>
      </div>

      {/* BOTONES SUPERIORES */}
      <div className={clsx("flex flex-col gap-2 px-3", collapsed && "items-center px-1")}>

        {/* NUEVO CHAT */}
        <Tooltip label="Nuevo chat" side="right" disabled={collapsed}>
          <button
            onClick={createChat}
            className={clsx(
              "flex items-center gap-2 px-3 py-2 rounded-md bg-red-700 hover:bg-red-600 transition text-white w-full shadow-sm",
              collapsed && "justify-center px-0"
            )}
          >
            <Plus size={16} />
            {!collapsed && "Nuevo chat"}
          </button>
        </Tooltip>

        <SidebarMinimalButton collapsed={collapsed} icon={<Search size={16} />} label="Buscar chats" />
        <SidebarMinimalButton collapsed={collapsed} icon={<Library size={16} />} label="Biblioteca" />
        <SidebarMinimalButton collapsed={collapsed} icon={<Folder size={16} />} label="Proyectos" />
      </div>

      {/* LISTA DE CHATS */}
      {!collapsed && (
        <div className="flex-1 overflow-y-auto mt-4 px-2 custom-scroll">
          {Object.entries(groups).map(([groupName, list]) =>
            list.length > 0 && (
              <div key={groupName} className="mb-3">

                {/* HEADER DEL GRUPO */}
                <button
                  onClick={() => toggleGroup(groupName)}
                  className="w-full flex items-center justify-between px-2 py-1 text-xs text-zinc-400 hover:text-zinc-200 transition"
                >
                  <span>{groupName}</span>
                  <span>{collapsedGroups[groupName] ? "›" : "⌄"}</span>
                </button>

                {/* CHATS DEL GRUPO */}
                {!collapsedGroups[groupName] && (
                  <div className="space-y-1 mt-1">
                    {list.map((chat) => (
                      <ChatSidebarItem
                        key={chat.id}
                        chat={chat}
                        active={chat.id === activeChatId}
                      />
                    ))}
                  </div>
                )}
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}

function SidebarMinimalButton({
  collapsed,
  icon,
  label,
}: {
  collapsed: boolean;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <Tooltip label={label} side="right" disabled={collapsed}>
      <button
        className={clsx(
          "flex items-center gap-2 px-3 py-2 rounded-md hover:bg-zinc-800 transition text-zinc-200 w-full",
          collapsed && "justify-center px-0"
        )}
      >
        {icon}
        {!collapsed && label}
      </button>
    </Tooltip>
  );
}
