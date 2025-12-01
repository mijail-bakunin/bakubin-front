"use client";

import { Message } from "@/store/chatStore";
import clsx from "clsx";
import { FileText, Image as ImageIcon, Volume2 } from "lucide-react";

type Props = {
  message: Message;
};

export default function ChatMessageAttachment({ message }: Props) {
  const isUser = message.role === "user";
  const isImage =
    message.type === "image" ||
    (message.fileType && message.fileType.startsWith("image/"));
  const isAudio =
    message.type === "audio" ||
    (message.fileType && message.fileType.startsWith("audio/"));

  const label = message.fileName || "Adjunto";

  return (
    <div
      className={clsx(
        "w-full flex",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={clsx(
          "max-w-[80%] rounded-2xl p-3",
          "backdrop-blur-md border",
          "animate-fade-slide-up",
          isUser
            ? [
                "bg-red-600/20 border-red-500/60",
                "shadow-[0_0_22px_rgba(248,113,113,0.45)]",
                "rounded-br-sm",
              ]
            : [
                "bg-zinc-900/80 border-red-500/30",
                "shadow-[0_0_26px_rgba(0,0,0,0.95)]",
                "rounded-bl-sm",
              ]
        )}
      >
        {/* Contenido principal */}
        <div className="flex items-center gap-3 mb-2">
          <div
            className={clsx(
              "flex h-9 w-9 items-center justify-center rounded-xl",
              isUser ? "bg-red-600/40" : "bg-zinc-800/80"
            )}
          >
            {isImage ? (
              <ImageIcon size={18} className="text-zinc-100" />
            ) : isAudio ? (
              <Volume2 size={18} className="text-zinc-100" />
            ) : (
              <FileText size={18} className="text-zinc-100" />
            )}
          </div>

          <div className="flex flex-col min-w-0">
            <span className="text-xs font-medium text-zinc-100 truncate">
              {label}
            </span>
            {message.fileType && (
              <span className="text-[11px] text-zinc-400">
                {message.fileType}
              </span>
            )}
          </div>
        </div>

        {/* Preview si es imagen */}
        {isImage && (
          <div className="mt-1 overflow-hidden rounded-xl border border-zinc-700/70 bg-black/40">
            <a
              href={message.content}
              target="_blank"
              rel="noreferrer"
              className="block"
            >
              <img
                src={message.content}
                alt={label}
                className="max-h-60 w-full object-cover hover:opacity-95 transition"
              />
            </a>
          </div>
        )}

        {/* Link de descarga / apertura */}
        {!isImage && (
          <div className="mt-1">
            <a
              href={message.content}
              target="_blank"
              rel="noreferrer"
              className="text-[11px] text-red-300 hover:text-red-200 underline underline-offset-2"
            >
              Abrir adjunto
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
