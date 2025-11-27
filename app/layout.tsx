import "./globals.css";

export const metadata = {
  title: "Bakubin",
  description: "Chat estilo ChatGPT personalizado",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="h-full bg-black">
      <body className="h-full min-h-screen bg-black text-white overflow-hidden">
        {children}
      </body>
    </html>
  );
}
