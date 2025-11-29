"use client";

import { create } from "zustand";

export type ModalType = "clear-chat" | "delete-chat" | "info" | null;

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
  isGenerating?: boolean;
};

export type ChatStore = {
  chats: Chat[];
  activeChatId: string | null;

  modal: {
    type: ModalType;
    chatId?: string;
  };

  openModal: (type: ModalType, chatId?: string) => void;
  closeModal: () => void;

  createChat: () => string;
  setActiveChat: (id: string | null) => void;
  addMessage: (chatId: string, message: Message) => void;
  addAssistantMessage: (chatId: string, content: string) => void;
  regenerateLastMessage: (chatId: string) => void;
  clearChat: (chatId: string) => void;

  renameChat: (chatId: string, newTitle: string) => void;
  deleteChat: (chatId: string) => void;

  setGenerating: (chatId: string, value: boolean) => void;
};

export const useChatStore = create<ChatStore>((set, get) => ({
  chats: [],
  activeChatId: null,

  modal: { type: null, chatId: undefined },

  openModal: (type, chatId) =>
    set(() => ({
      modal: { type, chatId },
    })),

  closeModal: () =>
    set(() => ({
      modal: { type: null, chatId: undefined },
    })),

  createChat: () => {
    const id = crypto.randomUUID();
    const newChat: Chat = {
      id,
      title: "Nuevo chat",
      messages: [],
      createdAt: Date.now(),
      isGenerating: false,
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

  addAssistantMessage: (chatId, content) => {
    set((state) => ({
      chats: state.chats.map((chat) =>
        chat.id === chatId
          ? {
              ...chat,
              messages: [
                ...chat.messages,
                {
                  id: crypto.randomUUID(),
                  role: "assistant",
                  content,
                  createdAt: Date.now(),
                },
              ],
            }
          : chat
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


  clearChat: (chatId : String) => {
    set((state) => ({
      chats: state.chats.map((c) =>
        c.id === chatId ? { ...c, messages: [] } : c
      ),
    }));
  },

  renameChat: (chatId, newTitle) => {
    set((state) => ({
      chats: state.chats.map((c) =>
        c.id === chatId ? { ...c, title: newTitle } : c
      ),
    }));
  },

  deleteChat: (chatId) => {
    set((state) => {
      const newChats = state.chats.filter((c) => c.id !== chatId);
      const newActive =
        state.activeChatId === chatId ? newChats[0]?.id || null : state.activeChatId;

      return {
        chats: newChats,
        activeChatId: newActive,
      };
    });
  },

  setGenerating: (chatId, value) => {
    set((state) => ({
      chats: state.chats.map((c) =>
        c.id === chatId ? { ...c, isGenerating: value } : c
      ),
    }));
  },
}));
