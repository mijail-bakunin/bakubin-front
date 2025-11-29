"use client";

import { Plus, RotateCcw, Eraser, Trash2 } from "lucide-react";
import clsx from "clsx";
import { useChatStore } from "@/store/chatStore";

export default function FloatingToolbar() {
  // Selectores simples: cada uno devuelve un valor estable
  const activeChatId = useChatStore((s) => s.activeChatId);
  const createChat = useChatStore((s) => s.createChat);
  const clearChat = useChatStore((s) => s.clearChat);
  const deleteChat = useChatStore((s) => s.deleteChat);
  const regenerateLastMessage = useChatStore((s) => s.regenerateLastMessage);

  const chatActive = !!activeChatId;

  const handleNewChat = () => {
    createChat();
  };

  const handleRegenerate = () => {
    if (!activeChatId) return;
    regenerateLastMessage(activeChatId);
  };

  const handleClear = () => {
    if (!activeChatId) return;
    clearChat(activeChatId);
  };

  const handleDelete = () => {
    if (!activeChatId) return;
    deleteChat(activeChatId);
  };

  return (
    <div
      className={clsx(
        // Dock flotante, alineado arriba a la derecha
        "group fixed right-6 top-4 z-20",
        "flex items-center rounded-full border border-red-600/40",
        "bg-black/60 px-3 py-1.5 text-zinc-200 shadow-lg backdrop-blur-md",
        "transition-all duration-200 hover:bg-black/80",
        chatActive ? "opacity-100" : "opacity-80"
      )}
    >
      <ToolbarItem
        icon={<Plus size={18} />}
        label="Nuevo chat"
        onClick={handleNewChat}
      />
      <ToolbarItem
        icon={<RotateCcw size={18} />}
        label="Regenerar"
        onClick={handleRegenerate}
        disabled={!chatActive}
      />
      <ToolbarItem
        icon={<Eraser size={18} />}
        label="Limpiar chat"
        onClick={handleClear}
        disabled={!chatActive}
      />
      <ToolbarItem
        icon={<Trash2 size={18} />}
        label="Eliminar chat"
        onClick={handleDelete}
        disabled={!chatActive}
      />
    </div>
  );
}

type ToolbarItemProps = {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  disabled?: boolean;
};

function ToolbarItem({ icon, label, onClick, disabled }: ToolbarItemProps) {
  return (
    <button
      type="button"
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={clsx(
        "relative mx-1 flex h-8 w-8 items-center justify-center rounded-full text-xs",
        "transition-all duration-150",
        // Efecto “dock” en grupo
        "group-hover:mx-2 group-hover:w-9",
        disabled
          ? "cursor-not-allowed text-zinc-500/40"
          : "cursor-pointer text-zinc-100 hover:text-red-400"
      )}
      aria-label={label}
    >
      {icon}
      {/* Tooltip */}
      <span
        className={clsx(
          "pointer-events-none absolute -bottom-7 left-1/2 -translate-x-1/2",
          "whitespace-nowrap rounded bg-zinc-900 px-2 py-1",
          "text-[10px] text-white shadow-md opacity-0",
          "transition-opacity duration-150",
          "group-hover:opacity-100"
        )}
      >
        {label}
      </span>
    </button>
  );
}
