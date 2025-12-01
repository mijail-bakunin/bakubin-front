"use client";

import { Plus, RotateCcw, Eraser, Trash2, Info } from "lucide-react";
import clsx from "clsx";
import { useChatStore } from "@/store/chatStore";
import ThemeToggle from "../ui/ThemeToggle";

export default function FloatingToolbar() {
  const activeChatId = useChatStore((s) => s.activeChatId);
  const chats = useChatStore((s) => s.chats);

  const createChat = useChatStore((s) => s.createChat);
  const regenerateLastMessage = useChatStore((s) => s.regenerateLastMessage);

  const openModal = useChatStore((s) => s.openModal);

  const activeChat = chats.find((c) => c.id === activeChatId);
  const hasMessages = !!activeChat && activeChat.messages.length > 0;

  return (
    <div
      className={clsx(
        "fixed top-4 right-6 z-40",
        "flex items-center gap-3",
        "rounded-2xl border border-red-600/40",
        "bg-black/50 backdrop-blur-md",
        "px-4 py-2 shadow-lg",
        "transition-all duration-200 ease-out",
        "hover:bg-black/80 hover:scale-[1.03]"
      )}
    >
      <ToolbarItem
        label="Nuevo chat"
        onClick={() => createChat()}
        icon={<Plus size={18} />}
      />

      <ToolbarItem
        label="Regenerar"
        onClick={() => activeChatId && regenerateLastMessage(activeChatId)}
        icon={<RotateCcw size={18} />}
        disabled={!hasMessages}
      />

      <ToolbarItem
        label="Limpiar chat"
        onClick={() => openModal("clear-chat", activeChatId)}
        icon={<Eraser size={18} />}
        disabled={!hasMessages}
      />

      <ToolbarItem
        label="Eliminar chat"
        onClick={() => openModal("delete-chat", activeChatId)}
        icon={<Trash2 size={18} />}
        disabled={!activeChatId}
      />

      <ToolbarItem
        label="Información"
        onClick={() => openModal("info")}
        icon={<Info size={18} />}
      />
      
    </div>
  );
}

type ToolbarItemProps = {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  disabled?: boolean;
};

function ToolbarItem({ icon, label, onClick, disabled }: ToolbarItemProps) {
  return (
    <div className="relative flex items-center justify-center">
      <button
        type="button"
        disabled={disabled}
        onClick={disabled ? undefined : onClick}
        className={clsx(
          "group inline-flex items-center justify-center",
          "text-zinc-200 transition",
          disabled
            ? "opacity-40 cursor-default"
            : "cursor-pointer hover:text-red-400"
        )}
      >
        {icon}
      </button>

      <div
        className={clsx(
          "pointer-events-none absolute top-full mt-1 left-1/2 -translate-x-1/2",
          "rounded-md bg-zinc-900 px-2 py-1 text-xs text-white shadow-xl whitespace-nowrap",
          "opacity-0 transition-opacity duration-150",
          "group-hover:opacity-100"
        )}
      >
        {label}
      </div>
    </div>
  );
}