"use client";

import { useState } from "react";
import { useChatStore } from "@/store/chatStore";
import { Paperclip, Image as ImageIcon, Mic, Plus } from "lucide-react";
import clsx from "clsx";

export default function ChatInput() {
  const activeChatId = useChatStore((s) => s.activeChatId);
  const addMessage = useChatStore((s) => s.addMessage);
  const addAssistantMessage = useChatStore((s) => s.addAssistantMessage);
  const renameChat = useChatStore((s) => s.renameChat);
  const setGenerating = useChatStore((s) => s.setGenerating);
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

    setGenerating(activeChatId, true);

    setTimeout(() => {
      addAssistantMessage(
        activeChatId,
        `Respuesta simulada a: "${userMessage}"`
      );
      setGenerating(activeChatId, false);
    }, 400);

    setValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // --- HANDLERS DE ADJUNTOS (mock por ahora) ---
  const sendAttachment = (type: string) => {
    if (!activeChatId) return;

    addMessage(activeChatId, {
      id: crypto.randomUUID(),
      role: "user",
      content: `[Adjunto: ${type}]`,
      createdAt: Date.now(),
    });

    setOpenMenu(false);
  };

  return (
    <div className="relative">
      {/* Menú flotante */}
      {openMenu && (
        <div
          className="absolute bottom-14 left-3 flex flex-col gap-2 
          bg-zinc-900 border border-zinc-700 rounded-xl p-2 shadow-xl"
        >
          <button
            onClick={() => sendAttachment("archivo")}
            className="flex items-center gap-2 p-2 text-sm hover:bg-zinc-800 rounded-md"
          >
            <Paperclip size={16} /> Archivo
          </button>

          <button
            onClick={() => sendAttachment("imagen")}
            className="flex items-center gap-2 p-2 text-sm hover:bg-zinc-800 rounded-md"
          >
            <ImageIcon size={16} /> Imagen
          </button>

          <button
            onClick={() => sendAttachment("audio")}
            className="flex items-center gap-2 p-2 text-sm hover:bg-zinc-800 rounded-md"
          >
            <Mic size={16} /> Audio
          </button>
        </div>
      )}

      {/* Caja de input */}
      <div className="flex items-center gap-3 p-3 rounded-lg bg-zinc-900 border border-zinc-800">

        {/* Botón + */}
        <button
          onClick={() => setOpenMenu(!openMenu)}
          className={clsx(
            "p-2 rounded-md transition",
            openMenu ? "bg-red-600 text-white" : "hover:bg-zinc-800"
          )}
        >
          <Plus size={18} />
        </button>

        {/* TEXTO */}
        <textarea
          className="flex-1 bg-transparent resize-none outline-none text-sm text-zinc-100"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
          placeholder="Escribe un mensaje..."
        />

        {/* BOTÓN ENVIAR */}
        <button
          onClick={handleSend}
          className="px-3 py-1.5 bg-red-600 rounded-md text-sm hover:bg-red-700 transition"
        >
          Enviar
        </button>
      </div>
    </div>
  );
}
