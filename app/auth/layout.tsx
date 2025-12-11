// app/auth/layout.tsx
export const metadata = {
  title: "Bakubin – Acceso",
  description: "Autenticación para Bakubin",
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[var(--bg-primary)] text-[var(--foreground)] px-4">
      {children}
    </div>
  );
}
