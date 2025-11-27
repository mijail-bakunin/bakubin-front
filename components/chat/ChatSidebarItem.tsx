"use client";

import { useState } from "react";
import { useChatStore, Chat } from "@/store/chatStore";
import { MessageSquare, Pen, Trash2, Loader2 } from "lucide-react";
import clsx from "clsx";

type Props = {
  chat: Chat;
};

export default function ChatSidebarItem({ chat }: Props) {
  const { activeChatId, setActiveChat, renameChat, deleteChat } = useChatStore();

  const isActive = activeChatId === chat.id;
  const [isRenaming, setIsRenaming] = useState(false);
  const [tempTitle, setTempTitle] = useState(chat.title);

  const handleRename = () => {
    renameChat(chat.id, tempTitle.trim() || "Nuevo chat");
    setIsRenaming(false);
  };

  return (
    <div
      className={clsx(
        "group relative flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition-all",
        isActive
          ? "bg-red-900/40 text-white"
          : "hover:bg-zinc-800/60 text-zinc-300"
      )}
      onClick={() => setActiveChat(chat.id)}
    >
      {/* BARRA ROJA LATERAL (ACTIVO) */}
      {isActive && (
        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-red-600 rounded-r"></div>
      )}

      {/* Contenido */}
      <div className="flex items-center gap-2 flex-1 overflow-hidden">
        <MessageSquare size={16} />
        {isRenaming ? (
          <input
            autoFocus
            className="bg-transparent border-b border-zinc-500 outline-none flex-1"
            value={tempTitle}
            onChange={(e) => setTempTitle(e.target.value)}
            onBlur={handleRename}
            onKeyDown={(e) => e.key === "Enter" && handleRename()}
          />
        ) : (
          <span className="truncate flex items-center gap-2">
            {chat.title}

            {/* Icono “typing” si está generando */}
            {chat.isGenerating && (
              <Loader2 size={14} className="animate-spin text-red-400" />
            )}
          </span>
        )}
      </div>

      {/* Acciones */}
      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsRenaming(true);
          }}
          className="hover:text-white"
        >
          <Pen size={14} />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            deleteChat(chat.id);
          }}
          className="hover:text-red-400"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
}
