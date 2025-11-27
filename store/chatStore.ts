"use client";

import { create } from "zustand";

export type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: number;
};

export type Chat = {
  id: string;
  title: string;
  messages: Message[];
  createdAt: number;
};

type ChatStore = {
  chats: Chat[];
  activeChatId: string | null;

  // Actions
  createChat: () => string;
  setActiveChat: (id: string) => void;
  addMessage: (chatId: string, message: Message) => void;
  regenerateLastMessage: (chatId: string) => void;
};

export const useChatStore = create<ChatStore>((set, get) => ({
  chats: [],
  activeChatId: null,

  createChat: () => {
    const id = crypto.randomUUID();
    const newChat: Chat = {
      id,
      title: "Nuevo chat",
      messages: [],
      createdAt: Date.now(),
    };

    set((state) => ({
      chats: [newChat, ...state.chats],
      activeChatId: id,
    }));

    return id;
  },

  setActiveChat: (id) => {
    set(() => ({ activeChatId: id }));
  },

  addMessage: (chatId, message) => {
    set((state) => ({
      chats: state.chats.map((c) =>
        c.id === chatId ? { ...c, messages: [...c.messages, message] } : c
      ),
    }));
  },

  regenerateLastMessage: (chatId) => {
    const { chats } = get();
    const chat = chats.find((c) => c.id === chatId);
    if (!chat) return;

    const lastAssistantMessage = [...chat.messages]
      .reverse()
      .find((m) => m.role === "assistant");

    if (!lastAssistantMessage) return;

    // Por ahora, sólo dejamos un placeholder
    const regenerated: Message = {
      id: crypto.randomUUID(),
      role: "assistant",
      content: "(Respuesta regenerada mock)",
      createdAt: Date.now(),
    };

    set((state) => ({
      chats: state.chats.map((c) =>
        c.id === chatId
          ? { ...c, messages: [...c.messages, regenerated] }
          : c
      ),
    }));
  },
}));
