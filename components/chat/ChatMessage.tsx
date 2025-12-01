"use client";

import { memo } from "react";
import { Message } from "@/store/chatStore";
import ChatMessageText from "./ChatMessageText";
import ChatMessageAttachment from "./ChatMessageAttachment";

type Props = {
  message: Message;
};

function ChatMessageBase({ message }: Props) {
  if (message.type && message.type !== "text") {
    return <ChatMessageAttachment message={message} />;
  }
  return <ChatMessageText message={message} />;
}

export default memo(ChatMessageBase);
