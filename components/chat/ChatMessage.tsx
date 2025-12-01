"use client";

import { Message } from "@/store/chatStore";
import ChatMessageText from "./ChatMessageText";
import ChatMessageAttachment from "./ChatMessageAttachment";

type Props = {
  message: Message;
};

export default function ChatMessage({ message }: Props) {
  // Detectar si es un adjunto
  if (message.type && message.type !== "text") {
    return <ChatMessageAttachment message={message} />;
  }

  // Texto normal
  return <ChatMessageText message={message} />;
}
