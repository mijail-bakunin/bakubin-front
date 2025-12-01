"use client";

import { useEffect } from "react";
import { useUIStore } from "@/store/uiStore";
import { Message } from "@/store/chatStore";
import ChatMessage from "./ChatMessage";

type Props = {
  messages: Message[];
  scrollRef: React.RefObject<HTMLDivElement>;
};

export default function ChatMessages({ messages, scrollRef }: Props) {
  const setHideToolbar = useUIStore((s) => s.setHideToolbar);

  // Detectar scroll
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let lastY = 0;

    const onScroll = () => {
      const currentY = el.scrollTop;
      const goingDown = currentY > lastY;

      setHideToolbar(goingDown && currentY > 30);

      lastY = currentY;
    };

    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, [scrollRef, setHideToolbar]);

  return (
    <div className="flex flex-col gap-4">
      {messages.map((msg) => (
        <ChatMessage key={msg.id} message={msg} />
      ))}
    </div>
  );
}
