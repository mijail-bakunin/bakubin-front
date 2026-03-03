"use client";

import { create } from "zustand";
import { api } from "@/lib/api";

/* ======================
   Tipos
====================== */

export type ChatSummary = {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
};

export type Message = {
  id: string;
  chatId: string;
  role: "user" | "assistant" | "system";
  content: string;
  createdAt: string;
};

export type ModalType = "clear-chat" | "delete-chat" | "info" | null;

export type ChatStore = {
  chats: ChatSummary[];
  activeChatId: string | null;

  messagesByChat: Record<string, Message[]>;
  isGeneratingByChat: Record<string, boolean>;

  modal: {
    type: ModalType;
    chatId?: string;
  };

  /* UI helpers */
  setActiveChat: (chatId: string | null) => void;
  setGenerating: (chatId: string, value: boolean) => void;

  openModal: (type: ModalType, chatId?: string) => void;
  closeModal: () => void;

  /* Queries */
  fetchChats: () => Promise<void>;
  fetchMessages: (chatId: string) => Promise<void>;

  /* Commands */
  createChat: () => Promise<string>;
  sendMessage: (
    chatId: string,
    content: string,
    role?: "user" | "assistant" | "system"
  ) => Promise<void>;

  renameChat: (chatId: string, title: string) => Promise<void>;
  deleteChat: (chatId: string) => Promise<void>;
  clearChat: (chatId: string) => Promise<void>;

  regenerateLastMessage: (chatId: string) => Promise<void>;
};

/* ======================
   Store
====================== */

export const useChatStore = create<ChatStore>((set, get) => ({
  chats: [],
  activeChatId: null,

  messagesByChat: {},
  isGeneratingByChat: {},

  modal: { type: null, chatId: undefined },

  /* ---------- UI helpers ---------- */

  setActiveChat: (chatId) =>
    set((state) => ({
      ...state,
      activeChatId: chatId,
    })),

  setGenerating: (chatId, value) =>
    set((state) => ({
      ...state,
      isGeneratingByChat: {
        ...state.isGeneratingByChat,
        [chatId]: value,
      },
    })),

  openModal: (type, chatId) =>
    set((state) => ({
      ...state,
      modal: { type, chatId },
    })),

  closeModal: () =>
    set((state) => ({
      ...state,
      modal: { type: null, chatId: undefined },
    })),

  /* ---------- Queries ---------- */

  fetchChats: async () => {
    const res = await api<{ chats: ChatSummary[] }>("/chats");

    set((state) => ({
      ...state,
      chats: res.chats ?? [],
    }));
  },

  fetchMessages: async (chatId) => {
    const res = await api<{ messages: Message[] }>(
      `/chats/${chatId}/messages`
    );

    set((state) => ({
      ...state,
      messagesByChat: {
        ...state.messagesByChat,
        [chatId]: res.messages ?? [],
      },
    }));
  },

  /* ---------- Commands ---------- */

  createChat: async () => {
    const res = await api<{ chat: ChatSummary }>("/chats", {
      method: "POST",
    });

    set((state) => ({
      ...state,
      chats: [res.chat, ...(state.chats ?? [])],
      activeChatId: res.chat.id,
    }));

    return res.chat.id;
  },

  sendMessage: async (chatId, content, role = "user") => {
    const res = await api<{ message: Message }>(
      `/chats/${chatId}/messages`,
      {
        method: "POST",
        body: JSON.stringify({ role, content }),
      }
    );

    set((state) => ({
      ...state,
      messagesByChat: {
        ...state.messagesByChat,
        [chatId]: [
          ...(state.messagesByChat[chatId] ?? []),
          res.message,
        ],
      },
    }));
  },

  renameChat: async (chatId, title) => {
    const res = await api<{ chat: ChatSummary }>(
      `/chats/${chatId}`,
      {
        method: "PATCH",
        body: JSON.stringify({ title }),
      }
    );

    set((state) => ({
      ...state,
      chats: state.chats.map((c) =>
        c.id === chatId ? res.chat : c
      ),
    }));
  },

  deleteChat: async (chatId) => {
    await api(`/chats/${chatId}`, { method: "DELETE" });

    set((state) => {
      const chats = state.chats.filter((c) => c.id !== chatId);
      const { [chatId]: _, ...restMessages } = state.messagesByChat;
      const { [chatId]: __, ...restGen } = state.isGeneratingByChat;

      return {
        ...state,
        chats,
        messagesByChat: restMessages,
        isGeneratingByChat: restGen,
        activeChatId:
          state.activeChatId === chatId
            ? chats[0]?.id ?? null
            : state.activeChatId,
      };
    });
  },

  clearChat: async (chatId) => {
    await api(`/chats/${chatId}/messages`, { method: "DELETE" });

    set((state) => ({
      ...state,
      messagesByChat: {
        ...state.messagesByChat,
        [chatId]: [],
      },
    }));
  },

  regenerateLastMessage: async (chatId) => {
    const { messagesByChat, sendMessage, setGenerating } = get();
    const msgs = messagesByChat[chatId] ?? [];
    if (msgs.length === 0) return;

    setGenerating(chatId, true);
    try {
      await sendMessage(chatId, "(Respuesta regenerada mock)", "assistant");
    } finally {
      setGenerating(chatId, false);
    }
  },
}));
