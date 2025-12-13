"use client";

import { useState } from "react";
import { MessageSquare, Pencil, Trash2 } from "lucide-react";
import { useChatStore, Chat } from "@/store/chatStore";
import clsx from "clsx";

type Props = {
  chat: Chat;
  active: boolean;
};

export default function ChatSidebarItem({ chat, active }: Props) {
  const setActiveChat = useChatStore((s) => s.setActiveChat);
  const renameChat = useChatStore((s) => s.renameChat);
  const openModal = useChatStore((s) => s.openModal);

  const [isEditing, setIsEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(chat.title);

  const handleSelect = () => {
    setActiveChat(chat.id);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    openModal("delete-chat", chat.id); 
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDraftTitle(chat.title);
    setIsEditing(true);
  };

  const commitRename = () => {
    const trimmed = draftTitle.trim();
    if (trimmed && trimmed !== chat.title) {
      renameChat(chat.id, trimmed);
    }
    setIsEditing(false);
  };

  const cancelRename = () => {
    setDraftTitle(chat.title);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") commitRename();
    if (e.key === "Escape") cancelRename();
  };

  return (
    <div
      onClick={handleSelect}
      className={clsx(
        "group flex items-center justify-between px-4 py-3 rounded-lg cursor-pointer",
        "transition bg-zinc-900/40 hover:bg-zinc-900/60",
        active && "bg-red-900/40 border-l-4 border-red-600"
      )}
    >
      {/* Título + Ícono */}
      <div className="flex items-center gap-3 overflow-hidden flex-1 min-w-0">
        <MessageSquare size={16} />

        {isEditing ? (
          <input
            autoFocus
            value={draftTitle}
            onChange={(e) => setDraftTitle(e.target.value)}
            onBlur={commitRename}
            onKeyDown={handleKeyDown}
            className="w-full bg-zinc-900/80 text-sm text-white outline-none border border-red-600 rounded px-2 py-1"
          />
        ) : (
          <span className="truncate text-sm">{chat.title}</span>
        )}
      </div>

      {/* Iconos laterales */}
      {!isEditing && (
        <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition">
          <button
            type="button"
            onClick={handleEdit}
            className="hover:text-red-400 transition"
          >
            <Pencil size={16} />
          </button>

          <button
            type="button"
            onClick={handleDelete}
            className="hover:text-red-400 transition"
          >
            <Trash2 size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
