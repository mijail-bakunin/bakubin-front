import ChatLayout from "@/components/chat/ChatLayout";
import ChatToolbar from "@/components/chat/ChatToolbar";
import ChatMessages from "@/components/chat/ChatMessages";
import ChatInput from "@/components/chat/ChatInput";

export default function ChatPage() {
  return (
    <div className="relative h-full w-full flex flex-col">
      <ChatToolbar />
      <ChatMessages />
      <ChatInput />
    </div>
  );
}
