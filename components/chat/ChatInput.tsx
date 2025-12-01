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
  Maximize2,
} from "lucide-react";
import clsx from "clsx";

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

  // adjuntos múltiples
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  // estado de drag&drop
  const [isDragging, setIsDragging] = useState(false);
  // imagen ampliada
  const [zoomImage, setZoomImage] = useState<string | null>(null);

  const menuRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const dropRef = useRef<HTMLDivElement | null>(null);

  // -----------------------------
  // cerrar menú al click fuera
  // -----------------------------
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  // -----------------------------
  // drag & drop sobre la zona del input
  // -----------------------------
  useEffect(() => {
    const area = dropRef.current;
    if (!area) return;

    const prevent = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
    };

    const handleDragEnter = (e: DragEvent) => {
      prevent(e);
      setIsDragging(true);
    };

    const handleDragOver = (e: DragEvent) => {
      prevent(e);
      setIsDragging(true);
    };

    const handleDragLeave = (e: DragEvent) => {
      prevent(e);
      setIsDragging(false);
    };

    const handleDrop = (e: DragEvent) => {
      prevent(e);
      setIsDragging(false);
      if (!e.dataTransfer?.files) return;
      handleMultipleFiles(e.dataTransfer.files);
    };

    area.addEventListener("dragenter", handleDragEnter);
    area.addEventListener("dragover", handleDragOver);
    area.addEventListener("dragleave", handleDragLeave);
    area.addEventListener("drop", handleDrop);

    return () => {
      area.removeEventListener("dragenter", handleDragEnter);
      area.removeEventListener("dragover", handleDragOver);
      area.removeEventListener("dragleave", handleDragLeave);
      area.removeEventListener("drop", handleDrop);
    };
  }, [activeChatId]);

  // -----------------------------
  // cargar varios archivos
  // -----------------------------
  const handleMultipleFiles = (fileList: FileList) => {
    const files = Array.from(fileList);

    const newAttachments: Attachment[] = files.map((file) => {
      const url = URL.createObjectURL(file);
      const isImage = file.type.startsWith("image/");
      return { url, file, type: isImage ? "image" : "file" };
    });

    setAttachments((prev) => [...prev, ...newAttachments]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    handleMultipleFiles(e.target.files);
    // permitir seleccionar el mismo archivo de nuevo
    e.target.value = "";
    setOpen(false);
  };

  // -----------------------------
  // envío de mensaje
  // -----------------------------
  const handleSend = () => {
    if (!activeChatId) return;

    const trimmed = value.trim();
    const hasText = trimmed.length > 0;
    const hasFiles = attachments.length > 0;

    if (!hasText && !hasFiles) return;

    // texto del usuario
    if (hasText) addUserMessage(trimmed);

    // adjuntos
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

  const simulateAssistantReply = (msg: string) => {
    if (!activeChatId) return;

    setGenerating(activeChatId, true);

    setTimeout(() => {
      addAssistantMessage(activeChatId, `Respuesta simulada a: "${msg}"`);
      setGenerating(activeChatId, false);
    }, 600);
  };

  // -----------------------------
  // icono para cada tipo de archivo
  // -----------------------------
  const getFileIcon = (mime: string) => {
    if (mime.startsWith("audio/")) return <FileAudio size={20} />;
    if (mime.includes("zip") || mime.includes("rar")) return <FileArchive size={20} />;
    if (mime.includes("pdf") || mime.includes("text")) return <FileText size={20} />;
    return <File size={20} />;
  };

  // -----------------------------
  // teclado: Enter para enviar
  // -----------------------------
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleRemoveAttachment = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  // -----------------------------
  // UI
  // -----------------------------
  return (
    <div ref={dropRef} className="relative">

      {/* PREVIEW DE ADJUNTOS (centrada, sin scroll visible) */}
      {attachments.length > 0 && (
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 flex flex-wrap justify-center gap-3 px-3 py-2 rounded-2xl bg-black/80 border border-zinc-700/80 shadow-2xl">
          {attachments.map((att, idx) => (
            <div
              key={idx}
              className="relative group w-20"
            >
              <div
                className={clsx(
                  "w-20 h-20 rounded-xl border border-zinc-700 bg-zinc-900",
                  "flex items-center justify-center overflow-hidden shadow-md",
                  "animate-fade-slide-up"
                )}
              >
                {att.type === "image" ? (
                  <img
                    src={att.url}
                    alt={att.file.name}
                    className="w-full h-full object-cover cursor-pointer"
                    onClick={() => setZoomImage(att.url)}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center px-1 text-[0.7rem] text-zinc-200">
                    {getFileIcon(att.file.type)}
                    <span className="mt-1 w-full truncate text-[0.65rem] leading-tight text-center">
                      {att.file.name}
                    </span>
                  </div>
                )}
              </div>

              {/* Botón X */}
              <button
                onClick={() => handleRemoveAttachment(idx)}
                className="absolute -top-2 -right-2 bg-red-600 hover:bg-red-700 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs shadow-md"
              >
                <X size={12} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* OVERLAY DRAG & DROP */}
      {isDragging && (
        <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center rounded-lg border-2 border-dashed border-red-500/70 bg-red-500/5 backdrop-blur-sm">
          <span className="text-sm text-red-200">
            Suelta archivos para adjuntarlos
          </span>
        </div>
      )}

      {/* MENÚ VERTICAL DEL BOTÓN + */}
      <div ref={menuRef}>
        {open && (
          <div
            className={clsx(
              "absolute bottom-14 left-3 flex flex-col gap-2 bg-zinc-900",
              "border border-zinc-700 rounded-xl p-2 shadow-xl",
              "transition-all duration-200 origin-bottom-left",
              "opacity-100 translate-y-0"
            )}
          >
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
              onClick={() => alert("Audio aún no implementado")}
              className="flex items-center gap-2 p-2 text-sm hover:bg-zinc-800 rounded-md"
            >
              <Mic size={16} /> Audio
            </button>
          </div>
        )}
      </div>

      {/* INPUT FILE OCULTO */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,audio/*,.pdf,.txt,.zip,.rar"
        className="hidden"
        multiple
        onChange={handleFileChange}
      />

      {/* INPUT PRINCIPAL */}
      <div className="flex items-center gap-3 p-3 rounded-lg bg-zinc-900 border border-zinc-800 relative">
        {/* Botón + */}
        <button
          onClick={() => setOpen(!open)}
          className={clsx(
            "p-2 rounded-md transition",
            open ? "bg-red-600 text-white" : "hover:bg-zinc-800"
          )}
        >
          <Plus size={18} />
        </button>

        {/* Textarea */}
        <textarea
          className="flex-1 bg-transparent resize-none outline-none text-sm text-zinc-100"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
          placeholder="Escribe un mensaje..."
        />

        {/* Botón enviar */}
        <button
          onClick={handleSend}
          className="px-3 py-1.5 bg-red-600 rounded-md text-sm hover:bg-red-700 transition"
        >
          Enviar
        </button>
      </div>

      {/* ZOOM DE IMAGEN (overlay pantalla completa) */}
      {zoomImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
          <div className="relative max-w-3xl max-h-[80vh]">
            <button
              onClick={() => setZoomImage(null)}
              className="absolute -top-10 right-0 bg-red-600 hover:bg-red-700 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg"
            >
              <X size={18} />
            </button>
            <div className="flex items-center justify-center gap-2 mb-2 text-zinc-200 text-xs opacity-80">
              <Maximize2 size={14} />
              <span>Vista previa del adjunto</span>
            </div>
            <img
              src={zoomImage}
              className="max-w-full max-h-[80vh] rounded-xl border border-red-500/40 shadow-[0_0_40px_rgba(248,113,113,0.4)] object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}
