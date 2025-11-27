import { Chat } from "@/store/chatStore";

export function groupChats(chats: Chat[]) {
  const groups: Record<string, Chat[]> = {
    Hoy: [],
    "Esta semana": [],
    "Este mes": [],
    "Anteriores": [],
  };

  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const weekStart = todayStart - 6 * 24 * 60 * 60 * 1000;
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).getTime();

  chats.forEach((chat) => {
    const created = chat.createdAt;

    if (created >= todayStart) groups["Hoy"].push(chat);
    else if (created >= weekStart) groups["Esta semana"].push(chat);
    else if (created >= monthStart) groups["Este mes"].push(chat);
    else groups["Anteriores"].push(chat);
  });

  return groups;
}
