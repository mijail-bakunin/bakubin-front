"use client";

import { useChatStore } from "@/store/chatStore";
import { AnimatePresence, motion } from "framer-motion";

export default function Modal() {
  const modal = useChatStore((s) => s.modal);
  const closeModal = useChatStore((s) => s.closeModal);
  const clearChat = useChatStore((s) => s.clearChat);
  const deleteChat = useChatStore((s) => s.deleteChat);

  const { type, chatId } = modal;

  const handleConfirm = () => {
    if (!chatId) return;

    if (type === "clear-chat") clearChat(chatId);
    if (type === "delete-chat") deleteChat(chatId);

    closeModal();
  };

  const message =
    type === "clear-chat"
      ? "¿Seguro que querés limpiar este chat?"
      : type === "delete-chat"
      ? "¿Seguro que querés eliminar este chat?"
      : type === "info"
      ? "Bakubin — Plataforma de chat personalizada.\n\nAquí irá la información detallada del proyecto."
      : "";

  return (
    <AnimatePresence>
      {type && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Caja modal */}
          <motion.div
            className="bg-zinc-900 text-white p-6 rounded-xl shadow-xl border border-zinc-800 max-w-md w-full"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <h2 className="text-lg font-semibold mb-4">
              {type === "info"
                ? "Información"
                : type === "clear-chat"
                ? "Limpiar chat"
                : type === "delete-chat"
                ? "Eliminar chat"
                : ""}
            </h2>

            <p className="whitespace-pre-wrap text-sm opacity-90 mb-6">
              {message}
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={closeModal}
                className="px-4 py-2 rounded-md bg-zinc-700 hover:bg-zinc-600 transition"
              >
                Cancelar
              </button>

              {type !== "info" && (
                <button
                  onClick={handleConfirm}
                  className="px-4 py-2 rounded-md bg-red-600 hover:bg-red-500 transition"
                >
                  Confirmar
                </button>
              )}

              {type === "info" && (
                <button
                  onClick={closeModal}
                  className="px-4 py-2 rounded-md bg-red-600 hover:bg-red-500 transition"
                >
                  Cerrar
                </button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
