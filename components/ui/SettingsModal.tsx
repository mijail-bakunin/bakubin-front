"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

const sections = [
  { id: "general", label: "General" },
  { id: "personalizacion", label: "Personalización" },
  { id: "seguridad", label: "Seguridad" },
  { id: "perfil", label: "Perfil" },
  { id: "acerca", label: "Acerca de" },
];

// Animación interna
const fadeSlide = `
  transition-all duration-300 ease-out
  opacity-0 translate-x-2
`;

export default function SettingsModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState("general");
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!mounted || !open) return null;

  // Cambio de sección con transición suave
  const onSelectSection = (id: string) => {
    if (id === active) return;
    setTransitioning(true);
    setTimeout(() => {
      setActive(id);
      setTransitioning(false);
    }, 150);
  };

  return createPortal(
    <div
      className="
        fixed inset-0 z-[9999]
        bg-black/70 backdrop-blur-sm
        flex items-center justify-center
      "
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          relative
          w-full max-w-4xl h-[80vh]
          bg-[var(--c2-panel)]
          border border-[var(--c2-border)]
          rounded-[var(--c2-radius)]
          shadow-[var(--c2-shadow)]
          overflow-hidden
          flex
          animate-zoom-in
        "
      >
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="
            absolute top-4 right-4 z-10
            text-[var(--c2-text-soft)]
            hover:text-[var(--c2-text)]
            transition
          "
        >
          <X size={22} />
        </button>

        {/* ============================
            SIDEBAR DE NAVEGACIÓN
        ============================ */}
        <aside
          className="
            w-64
            h-full
            bg-[var(--c2-panel-soft)]
            border-r border-[var(--c2-border)]
            pt-8
          "
        >
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => onSelectSection(s.id)}
              className={`
                w-full text-left px-5 py-3 text-sm transition
                ${
                  active === s.id && !transitioning
                    ? "bg-[var(--c2-panel)] text-[var(--c2-text)] border-r-4 border-[var(--c2-accent)]"
                    : "text-[var(--c2-text-soft)] hover:bg-[var(--c2-panel)] hover:text-[var(--c2-text)]"
                }
              `}
            >
              {s.label}
            </button>
          ))}
        </aside>

        {/* ============================
            CONTENIDO
        ============================ */}
        <section
          className={`
            flex-1 h-full overflow-y-auto p-10 text-[var(--c2-text)]
            transition-all duration-300
            ${transitioning ? "opacity-0 translate-x-2" : "opacity-100 translate-x-0"}
          `}
        >
          {active === "general" && (
            <div>
              <h2 className="text-xl font-semibold mb-4">General</h2>
              <p className="text-[var(--c2-text-soft)]">Contenido de General.</p>
            </div>
          )}

          {active === "personalizacion" && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Personalización</h2>
              <p className="text-[var(--c2-text-soft)]">
                Configuraciones de apariencia, temas y estilo.
              </p>
            </div>
          )}

          {active === "seguridad" && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Seguridad</h2>
              <p className="text-[var(--c2-text-soft)]">
                Claves, privacidad, sesiones activas y protección.
              </p>
            </div>
          )}

          {active === "perfil" && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Perfil</h2>
              <p className="text-[var(--c2-text-soft)]">Información personal.</p>
            </div>
          )}

          {active === "acerca" && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Acerca de</h2>
              <p className="text-[var(--c2-text-soft)]">
                Información sobre la aplicación, versión y créditos.
              </p>
            </div>
          )}
        </section>
      </div>
    </div>,
    document.body
  );
}
