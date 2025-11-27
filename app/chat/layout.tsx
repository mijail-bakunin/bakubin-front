// app/layout.tsx
import "./globals.css";

export const metadata = {
  title: "Bakubin",
  description: "Chat estilo ChatGPT personalizado",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-black text-white flex h-screen overflow-hidden">
        {children}
      </body>
    </html>
  );
}
