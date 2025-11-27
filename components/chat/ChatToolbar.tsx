"use client";

import { useChatStore } from "@/store/chatStore";
import { useParams } from "next/navigation";
import { Trash2, RefreshCcw, Download, Info } from "lucide-react";

export default function ChatToolbar() {
  const params = useParams();
  const chatId = params.id as string;

  const clearChat = useChatStore((s) => s.clearChat);
  const regenerateLastMessage = useChatStore((s) => s.regenerateLastMessage);

  // Exportar como .txt por ahora
  const exportChat = () => {
    const chat = useChatStore.getState().chats.find((c) => c.id === chatId);
    if (!chat) return;

    const text = chat.messages
      .map((m) => `${m.role.toUpperCase()}: ${m.content}`)
      .join("\n\n");

    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `chat-${chatId}.txt`;
    a.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div
      className="
        absolute top-4 right-4
        flex gap-2
        bg-black/40 backdrop-blur-md
        p-2 rounded-lg border border-white/10
        shadow-lg
      "
    >
      {/* Regenerar */}
      <button
        onClick={() => regenerateLastMessage(chatId)}
        className="p-2 rounded hover:bg-red-600/40 transition"
      >
        <RefreshCcw size={18} className="text-white" />
      </button>

      {/* Borrar chat */}
      <button
        onClick={() => clearChat(chatId)}
        className="p-2 rounded hover:bg-red-600/40 transition"
      >
        <Trash2 size={18} className="text-white" />
      </button>

      {/* Exportar */}
      <button
        onClick={exportChat}
        className="p-2 rounded hover:bg-red-600/40 transition"
      >
        <Download size={18} className="text-white" />
      </button>

      {/* Info (por ahora un alert) */}
      <button
        onClick={() => alert(`ID del chat: ${chatId}`)}
        className="p-2 rounded hover:bg-red-600/40 transition"
      >
        <Info size={18} className="text-white" />
      </button>
    </div>
  );
}
