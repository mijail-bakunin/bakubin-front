import type { Chat } from "@/store/chatStore";


export function groupChatsByTime(chats: Chat[]): Record<string, Chat[]> {
  const now = new Date();

  const atMidnight = (d: Date) =>
    new Date(d.getFullYear(), d.getMonth(), d.getDate());

  const todayStart = atMidnight(now);

  const yesterdayStart = new Date(todayStart);
  yesterdayStart.setDate(todayStart.getDate() - 1);

  const weekStart = new Date(todayStart);
  const day = (weekStart.getDay() + 6) % 7;
  weekStart.setDate(weekStart.getDate() - day);

  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

  const groups: Record<string, Chat[]> = {
    Hoy: [],
    Ayer: [],
    "Esta semana": [],
    "Este mes": [],
    Anterior: [],
  };

  for (const chat of chats) {
    const d = new Date(chat.createdAt);

    if (isNaN(d.getTime())) {
      groups["Anterior"].push(chat);
      continue;
    }

    if (d >= todayStart) groups["Hoy"].push(chat);
    else if (d >= yesterdayStart) groups["Ayer"].push(chat);
    else if (d >= weekStart) groups["Esta semana"].push(chat);
    else if (d >= monthStart) groups["Este mes"].push(chat);
    else groups["Anterior"].push(chat);
  }

  return groups;
}
