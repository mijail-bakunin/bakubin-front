import "@/styles/globals.css";
import "@/styles/c2-theme.css";
import "@/styles/c2-components.css";
import "@/styles/theme-carbon.css";
import "@/styles/theme-light.css";
import AuthHydration from "@/components/chat/AuthHydration";

export const metadata = {
  title: "Bakubin",
  description: "Chat estilo ChatGPT personalizado",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="h-full bg-black">
      <body className="c2 c3-carbon h-full min-h-screen bg-black text-white overflow-hidden">
         <AuthHydration />
        {children}
      </body>
    </html>
  );
}
