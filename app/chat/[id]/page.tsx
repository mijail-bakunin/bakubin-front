"use client";

import { useChatStore } from "@/store/chatStore";
import ChatToolbar from "@/components/chat/ChatToolbar";
import ChatMessages from "@/components/chat/ChatMessages";
import ChatInput from "@/components/chat/ChatInput";

export default function ChatPage() {
  const chats = useChatStore((s) => s.chats);
  const activeChatId = useChatStore((s) => s.activeChatId);

  const activeChat = chats.find((c) => c.id === activeChatId);
  const messages = activeChat?.messages ?? [];

  return (
    <div className="relative h-full w-full flex flex-col">
      <ChatToolbar />
      <ChatMessages messages={messages} />
      <ChatInput />
    </div>
  );
}
