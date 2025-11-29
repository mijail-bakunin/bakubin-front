"use client";

import { useEffect, useState } from "react";
import { Message } from "@/store/chatStore";
import clsx from "clsx";
import MarkdownRenderer from "./MarkdownRenderer";

type Props = {
  message: Message;
};

export default function ChatMessage({ message }: Props) {
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
        "p-3 rounded-lg max-w-[80%] text-sm leading-relaxed",
        isUser
          ? "ml-auto bg-red-700 text-white"
          : "mr-auto bg-zinc-800 text-zinc-200"
      )}
    >
      <MarkdownRenderer content={displayed} />
    </div>
  );
}
