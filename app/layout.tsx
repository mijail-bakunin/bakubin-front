import "./globals.css";
import "@/styles/c2-theme.css";
import "@/styles/c2-components.css";

export const metadata = {
  title: "Bakubin",
  description: "Chat estilo ChatGPT personalizado",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="h-full bg-black">
      <body className="c2 h-full min-h-screen bg-black text-white overflow-hidden">
        {children}
      </body>
    </html>
  );
}
