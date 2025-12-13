"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronUp, ChevronDown, LogOut, Settings } from "lucide-react";
import SettingsModal from "@/components/ui/SettingsModal";
import { useAuthStore } from "@/store/authStore";

export default function UserMenu({
  collapsed,
}: {
  collapsed: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);

  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  // Seguridad defensiva: si por alguna razón no hay usuario
  if (!user) return null;

  const name = user.name ?? user.email;
  const plan = "Plus"; // hardcodeado por ahora, como ChatGPT

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  function handleLogout() {
    logout();
    localStorage.removeItem("auth_user");
    router.push("/auth");
  }

  return (
    <div className="absolute bottom-4 left-0 w-full px-2">
      {/* ============================
          MODO COLAPSADO
         ============================ */}
      {collapsed ? (
        <div className="flex justify-center relative">
          <div
            onClick={() => setOpen(!open)}
            className="cursor-pointer w-10 h-10 rounded-full bg-orange-600 flex items-center justify-center text-white font-bold text-sm hover:opacity-80 transition"
          >
            {initials}
          </div>

          {open && (
            <div className="absolute left-[4.5rem] bottom-0 bg-zinc-900 rounded-md overflow-hidden border border-zinc-800 w-40 z-50">
              <button
                onClick={() => {
                  setOpen(false);
                  setOpenSettings(true);
                }}
                className="w-full flex items-center gap-3 px-3 py-2 hover:bg-zinc-800 text-sm text-zinc-300"
              >
                <Settings size={16} />
                Configuración
              </button>

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-3 py-2 hover:bg-zinc-800 text-sm text-red-400"
              >
                <LogOut size={16} />
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      ) : (
        /* ============================
           MODO EXPANDIDO
           ============================ */
        <div className="w-full">
          <button
            onClick={() => setOpen(!open)}
            className="w-full flex items-center gap-3 p-2 rounded-md hover:bg-zinc-800 transition"
          >
            <div className="w-10 h-10 rounded-full bg-orange-600 flex items-center justify-center text-white font-bold">
              {initials}
            </div>

            <div className="flex flex-col text-left">
              <span className="text-sm font-medium text-white">
                {name}
              </span>
              <span className="text-xs text-zinc-400">{plan}</span>
            </div>

            <div className="ml-auto text-zinc-400">
              {open ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
            </div>
          </button>

          {open && (
            <div className="mt-2 bg-zinc-900 rounded-md overflow-hidden border border-zinc-800">
              <button
                onClick={() => {
                  setOpen(false);
                  setOpenSettings(true);
                }}
                className="w-full flex items-center gap-3 px-3 py-2 hover:bg-zinc-800 text-sm text-zinc-300"
              >
                <Settings size={16} />
                Configuración
              </button>

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-3 py-2 hover:bg-zinc-800 text-sm text-red-400"
              >
                <LogOut size={16} />
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      )}

      {/* MODAL DE CONFIGURACIÓN */}
      <SettingsModal
        open={openSettings}
        onClose={() => setOpenSettings(false)}
      />
    </div>
  );
}
