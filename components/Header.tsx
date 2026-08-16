"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/#sectores", label: "Soluciones" },
  { href: "/#pricing", label: "Precios" },
  { href: "/#contacto", label: "Contacto" },
];

// Repuntado a la sección de contacto (2026-08-16, autorización explícita de Marco).
// Antes: wa.me/525652107460 — número del MattIAs de demos, ajeno a la marca.
const CONTACT_URL = "/#contacto";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
      style={
        scrolled
          ? {
              background: "rgba(6,11,24,0.92)",
              borderBottom: "1px solid var(--color-border)",
            }
          : undefined
      }
    >
      <div className="mx-auto max-w-6xl px-5 h-16 flex items-center justify-between">
        {/* Logo — Press Start 2P: pixel/bitmap, identidad robótica */}
        <Link href="/" className="flex items-center gap-3 cursor-pointer">
          <span
            className="leading-none"
            style={{
              fontFamily: "var(--font-brand)",
              fontSize: "1.05rem",
              color: "var(--color-text-base)",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              fontWeight: 700,
            }}
          >
            +Digital
          </span>
          <span
            className="px-2.5 py-1 rounded text-white leading-none"
            style={{
              fontFamily: "var(--font-brand)",
              fontSize: "0.65rem",
              background: "var(--color-success)",
              letterSpacing: "0.06em",
              fontWeight: 700,
            }}
          >
            MX
          </span>
        </Link>

        {/* Nav desktop */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-medium transition-colors duration-200 cursor-pointer"
              style={{ color: "var(--color-text-muted)" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--color-text-base)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--color-text-muted)")
              }
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <a
          href={CONTACT_URL}
          className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold text-white transition-all duration-200 cursor-pointer hover:opacity-90 hover:-translate-y-px"
          style={{
            background: "var(--color-cta)",
            boxShadow: "var(--shadow-cta)",
          }}
        >
          Habla con nosotros
        </a>

        {/* Burger mobile */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden cursor-pointer p-1"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          style={{ color: "var(--color-text-base)" }}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          className="md:hidden px-5 py-6 flex flex-col gap-5"
          style={{
            background: "rgba(6,11,24,0.97)",
            borderTop: "1px solid var(--color-border)",
          }}
        >
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-base font-medium transition-colors cursor-pointer"
              style={{ color: "var(--color-text-muted)" }}
            >
              {l.label}
            </Link>
          ))}
          <a
            href={CONTACT_URL}
            className="mt-2 inline-flex justify-center items-center px-5 py-3 rounded-lg text-sm font-bold text-white cursor-pointer"
            style={{ background: "var(--color-cta)" }}
          >
            Habla con nosotros
          </a>
        </div>
      )}
    </header>
  );
}
