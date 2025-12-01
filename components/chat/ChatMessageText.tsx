"use client";

import { useEffect, useState } from "react";
import { Message } from "@/store/chatStore";
import clsx from "clsx";
import MarkdownRenderer from "./MarkdownRenderer";

type Props = {
  message: Message;
};

export default function ChatMessageText({ message }: Props) {
  const isUser = message.role === "user";

  const [displayed, setDisplayed] = useState(
    isUser ? message.content : ""
  );

  useEffect(() => {
    if (isUser) {
      setDisplayed(message.content);
      return;
    }

    let i = 0;
    setDisplayed("");

    const interval = setInterval(() => {
      i++;
      setDisplayed(message.content.slice(0, i));
      if (i >= message.content.length) {
        clearInterval(interval);
      }
    }, 15);

    return () => clearInterval(interval);
  }, [message.content, isUser]);

  return (
    <div
      className={clsx(
        "w-full flex",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={clsx(
          "max-w-[80%] text-sm leading-relaxed",
          "rounded-2xl px-4 py-3",
          "backdrop-blur-md",
          "border",
          "animate-fade-slide-up",
          !isUser && "animate-assistant-bounce",
          isUser
            ? [
                "bg-red-600/30 border-red-500/60",
                "shadow-[0_0_18px_rgba(248,113,113,0.45)]",
                "rounded-br-sm",
              ]
            : [
                "bg-zinc-900/70 border-zinc-700",
                "shadow-[0_0_24px_rgba(0,0,0,0.90)]",
                "rounded-bl-sm",
              ]
        )}
      >
        <MarkdownRenderer content={displayed} />
      </div>
    </div>
  );
}
