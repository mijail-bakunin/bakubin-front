"use client";

import { Message } from "@/store/chatStore";
import ChatMessage from "./ChatMessage";

type Props = {
  messages: Message[];
};

export default function ChatMessages({ messages }: Props) {
  if (!messages || messages.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4">
      {messages.map((msg) => (
        <ChatMessage key={msg.id} message={msg} />
      ))}
    </div>
  );
}
