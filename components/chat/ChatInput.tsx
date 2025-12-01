"use client";

import { useEffect, useRef, useState } from "react";
import { useChatStore } from "@/store/chatStore";
import {
  Paperclip,
  Image as ImageIcon,
  Mic,
  Plus,
  FileText,
  FileAudio,
  FileArchive,
  File,
  X,
} from "lucide-react";
import clsx from "clsx";
import { useImageViewerStore } from "@/store/useImageViewerStore";

type AttachmentType = "image" | "file";

type Attachment = {
  url: string;
  file: File;
  type: AttachmentType;
};

export default function ChatInput() {
  const activeChatId = useChatStore((s) => s.activeChatId);
  const addMessage = useChatStore((s) => s.addMessage);
  const addAssistantMessage = useChatStore((s) => s.addAssistantMessage);
  const renameChat = useChatStore((s) => s.renameChat);
  const setGenerating = useChatStore((s) => s.setGenerating);
  const chats = useChatStore((s) => s.chats);

  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const { open: openImageViewer } = useImageViewerStore();

  const menuRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const dropRef = useRef<HTMLDivElement | null>(null);

  // -------------------------------------
  // cerrar menú al hacer click afuera
  // -------------------------------------
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  // -------------------------------------
  // drag & drop
  // -------------------------------------
  useEffect(() => {
    const area = dropRef.current;
    if (!area) return;

    const prevent = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
    };

    const enter = (e: DragEvent) => {
      prevent(e);
      setIsDragging(true);
    };

    const over = (e: DragEvent) => {
      prevent(e);
      setIsDragging(true);
    };

    const leave = (e: DragEvent) => {
      prevent(e);
      setIsDragging(false);
    };

    const drop = (e: DragEvent) => {
      prevent(e);
      setIsDragging(false);
      if (!e.dataTransfer?.files) return;
      handleMultipleFiles(e.dataTransfer.files);
    };

    area.addEventListener("dragenter", enter);
    area.addEventListener("dragover", over);
    area.addEventListener("dragleave", leave);
    area.addEventListener("drop", drop);

    return () => {
      area.removeEventListener("dragenter", enter);
      area.removeEventListener("dragover", over);
      area.removeEventListener("dragleave", leave);
      area.removeEventListener("drop", drop);
    };
  }, [activeChatId]);

  // -------------------------------------
  // múltiples archivos
  // -------------------------------------
  const handleMultipleFiles = (fileList: FileList) => {
    const files = Array.from(fileList);

    const mapped = files.map((file) => {
      const url = URL.createObjectURL(file);
      const isImage = file.type.startsWith("image/");
      return { url, file, type: isImage ? "image" : "file" } as Attachment;
    });

    setAttachments((prev) => [...prev, ...mapped]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    handleMultipleFiles(e.target.files);
    e.target.value = "";
    setOpen(false);
  };

  // -------------------------------------
  // enviar mensaje
  // -------------------------------------
  const handleSend = () => {
    if (!activeChatId) return;

    const trimmed = value.trim();
    const hasText = trimmed.length > 0;
    const hasFiles = attachments.length > 0;

    if (!hasText && !hasFiles) return;

    if (hasText) addUserMessage(trimmed);

    if (hasFiles) {
      attachments.forEach((att) => {
        addMessage(activeChatId, {
          id: crypto.randomUUID(),
          role: "user",
          content: att.url,
          createdAt: Date.now(),
          fileName: att.file.name,
          fileType: att.file.type,
          type: att.type,
        });
      });
    }

    simulateAssistantReply(trimmed || "(Adjunto enviado)");
    setAttachments([]);
    setValue("");
  };

  const addUserMessage = (content: string) => {
    if (!activeChatId) return;

    addMessage(activeChatId, {
      id: crypto.randomUUID(),
      role: "user",
      content,
      createdAt: Date.now(),
      type: "text",
    });

    const chat = chats.find((c) => c.id === activeChatId);
    if (chat && chat.messages.length === 0) {
      renameChat(activeChatId, content.slice(0, 42));
    }
  };

  const simulateAssistantReply = (text: string) => {
    if (!activeChatId) return;

    setGenerating(activeChatId, true);

    setTimeout(() => {
      addAssistantMessage(activeChatId, `Respuesta simulada a: "${text}"`);
      setGenerating(activeChatId, false);
    }, 600);
  };

  const getFileIcon = (mime: string) => {
    if (mime.startsWith("audio/")) return <FileAudio size={20} />;
    if (mime.includes("zip") || mime.includes("rar"))
      return <FileArchive size={20} />;
    if (mime.includes("pdf") || mime.includes("text"))
      return <FileText size={20} />;
    return <File size={20} />;
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div ref={dropRef} className="relative">

      {/* PREVIEW ADJUNTOS */}
      {attachments.length > 0 && (
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 flex flex-wrap justify-center gap-3 px-3 py-2 rounded-2xl bg-black/80 border border-zinc-700/80 shadow-2xl">
          {attachments.map((att, i) => (
            <div key={i} className="relative w-20">
              <div
                className={clsx(
                  "w-20 h-20 rounded-xl border border-zinc-700 bg-zinc-900",
                  "flex items-center justify-center overflow-hidden shadow-md"
                )}
              >
                {att.type === "image" ? (
                  <img
                    src={att.url}
                    className="w-full h-full object-cover cursor-pointer"
                    onClick={() => openImageViewer(att.url)}
                  />
                ) : (
                  <div className="flex flex-col items-center text-zinc-200 text-xs px-1">
                    {getFileIcon(att.file.type)}
                    <span className="truncate mt-1 w-full">{att.file.name}</span>
                  </div>
                )}
              </div>

              <button
                onClick={() =>
                  setAttachments((prev) => prev.filter((_, idx) => idx !== i))
                }
                className="absolute -top-2 -right-2 bg-red-600 hover:bg-red-700 text-white w-5 h-5 rounded-full text-xs flex items-center justify-center"
              >
                <X size={12} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* DRAG OVERLAY */}
      {isDragging && (
        <div className="absolute inset-0 flex items-center justify-center border-2 border-dashed border-red-500/70 bg-red-500/5 backdrop-blur-sm text-red-200 rounded-lg pointer-events-none z-10">
          Suelta archivos para adjuntarlos
        </div>
      )}

      {/* MENÚ + */}
      <div ref={menuRef}>
        {open && (
          <div className="absolute bottom-14 left-3 flex flex-col gap-2 bg-zinc-900 border border-zinc-700 rounded-xl p-2 shadow-xl">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 p-2 text-sm hover:bg-zinc-800 rounded-md"
            >
              <Paperclip size={16} /> Archivo
            </button>

            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 p-2 text-sm hover:bg-zinc-800 rounded-md"
            >
              <ImageIcon size={16} /> Imagen
            </button>

            <button
              onClick={() => alert("Audio no implementado aún")}
              className="flex items-center gap-2 p-2 text-sm hover:bg-zinc-800 rounded-md"
            >
              <Mic size={16} /> Audio
            </button>
          </div>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*,audio/*,.pdf,.txt,.zip,.rar"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* INPUT */}
      <div className="flex items-center gap-3 p-3 rounded-lg bg-zinc-900 border border-zinc-800">
        <button
          onClick={() => setOpen((v) => !v)}
          className={clsx(
            "p-2 rounded-md transition",
            open ? "bg-red-600 text-white" : "hover:bg-zinc-800"
          )}
        >
          <Plus size={18} />
        </button>

        <textarea
          rows={1}
          placeholder="Escribe un mensaje..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent resize-none outline-none text-sm text-zinc-100"
        />

        <button
          onClick={handleSend}
          className="px-3 py-1.5 bg-red-600 rounded-md text-sm hover:bg-red-700"
        >
          Enviar
        </button>
      </div>
    </div>
  );
}
