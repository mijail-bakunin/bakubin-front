import ChatLayout from "@/components/chat/ChatLayout";
import { redirect } from "next/navigation";

export default function HomePage() {
  redirect("/auth");
}
