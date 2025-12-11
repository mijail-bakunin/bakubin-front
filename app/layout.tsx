import "@/styles/globals.css";
import "@/styles/c2-theme.css";
import "@/styles/c2-components.css";
import "@/styles/theme-carbon.css";
import "@/styles/theme-light.css";

export const metadata = {
  title: "Bakubin",
  description: "Chat estilo ChatGPT personalizado",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  console.log("ROOT LAYOUT ACTIVO");
  return (
    <html lang="es" className="h-full bg-black">
      <body className="c2 c3-carbon h-full min-h-screen bg-black text-white overflow-hidden">
        {children}
      </body>
    </html>
  );
}
