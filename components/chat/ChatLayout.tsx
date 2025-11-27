"use client";

import ChatSidebar from "./ChatSidebar";
import { useChatStore } from "@/store/chatStore";

export default function ChatLayout() {
  const { activeChatId } = useChatStore();

  return (
    <div className="flex w-full h-full">
      <ChatSidebar />

      <div className="flex flex-col flex-1 items-center justify-center text-gray-300">
        {!activeChatId && (
          <div className="text-center opacity-50">
            <h1 className="text-2xl mb-2">Bienvenido a Bakubin</h1>
            <p>Crea un nuevo chat para comenzar</p>
          </div>
        )}

        {activeChatId && (
          <div className="w-full h-full flex flex-col">
            <div className="flex-1 p-4 overflow-y-auto">
              {/* Los mensajes irán aquí en el siguiente paso */}
              <p className="opacity-40">Chat seleccionado: {activeChatId}</p>
            </div>

            {/* Input va en el paso siguiente */}
          </div>
        )}
      </div>
    </div>
  );
}
