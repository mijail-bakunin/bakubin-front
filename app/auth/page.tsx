"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export default function AuthPage() {
  const [mode, setMode] = useState<"login" | "register">("login");

  return (
    <div className="w-full max-w-md p-8 rounded-xl border border-[var(--border-soft)] bg-[var(--bg-secondary)] shadow-lg">
      <h1 className="text-2xl font-semibold mb-6 text-center tracking-wide">
        Bakubin
      </h1>

      <p className="text-sm opacity-80 text-center mb-8">
        Chat sindical con LLM especializado
      </p>

      <div className="flex mb-8">
        <button
          className={`flex-1 py-2 rounded-l-full border border-[var(--border-soft)]
            ${mode === "login" ? "bg-[var(--accent)] text-black" : "bg-[var(--bg-tertiary)]"}`}
          onClick={() => setMode("login")}
        >
          Iniciar sesión
        </button>

        <button
          className={`flex-1 py-2 rounded-r-full border border-[var(--border-soft)]
            ${mode === "register" ? "bg-[var(--accent)] text-black" : "bg-[var(--bg-tertiary)]"}`}
          onClick={() => setMode("register")}
        >
          Crear cuenta
        </button>
      </div>

      {mode === "login" ? <LoginForm /> : <RegisterForm />}
    </div>
  );
}

/* ========================================================================================== */
/* LOGIN FORM */
/* ========================================================================================== */
function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter(); // <—— agregado

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message ?? "Error inesperado");
        return;
      }

      // ===== REDIRECCIÓN =====
      setLoading(true);
      router.push("/chat");

    } catch (err: any) {
      setError("Error de conexión con el servidor.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleLogin}>
      {error && <div className="p-2 text-red-400 text-sm">{error}</div>}

      <div className="flex flex-col gap-1">
        <label className="text-sm opacity-80">Correo electrónico</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-3 py-2 rounded-md bg-[var(--bg-tertiary)] border border-[var(--border-soft)]
            focus:border-[var(--accent)] outline-none transition-colors"
          placeholder="tu@correo.com"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm opacity-80">Contraseña</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="px-3 py-2 rounded-md bg-[var(--bg-tertiary)] border border-[var(--border-soft)]
            focus:border-[var(--accent)] outline-none transition-colors"
          placeholder="********"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-4 py-2 rounded-md bg-[var(--accent)] text-black font-medium
        hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        {loading ? "Ingresando..." : "Entrar"}
      </button>
    </form>
  );
}


/* ========================================================================================== */
/* REGISTER FORM */
/* ========================================================================================== */
function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
          confirmPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message ?? "Error inesperado");
        return;
      }

      setSuccess("Cuenta creada correctamente. Verificá tu email.");

    } catch (err) {
      setError("Error de conexión con el servidor.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleRegister}>
      {error && <div className="p-2 text-red-400 text-sm">{error}</div>}
      {success && <div className="p-2 text-green-400 text-sm">{success}</div>}

      <div className="flex flex-col gap-1">
        <label className="text-sm opacity-80">Nombre o alias</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="px-3 py-2 rounded-md bg-[var(--bg-tertiary)] border border-[var(--border-soft)]
            focus:border-[var(--accent)] outline-none transition-colors"
          placeholder="Ej. Comisión Interna, Delegado..."
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm opacity-80">Correo electrónico</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-3 py-2 rounded-md bg-[var(--bg-tertiary)] border border-[var(--border-soft)]
            focus:border-[var(--accent)] outline-none transition-colors"
          placeholder="tu@correo.com"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm opacity-80">Contraseña</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="px-3 py-2 rounded-md bg-[var(--bg-tertiary)] border border-[var(--border-soft)]
            focus:border-[var(--accent)] outline-none transition-colors"
          placeholder="Mínimo 8 caracteres"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm opacity-80">Repetir contraseña</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="px-3 py-2 rounded-md bg-[var(--bg-tertiary)] border border-[var(--border-soft)]
            focus:border-[var(--accent)] outline-none transition-colors"
          placeholder="Repetir contraseña"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-4 py-2 rounded-md bg-[var(--accent)] text-black font-medium
        hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        {loading ? "Creando cuenta..." : "Crear cuenta"}
      </button>
    </form>
  );
}
