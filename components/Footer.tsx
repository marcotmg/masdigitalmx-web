"use client";

import Link from "next/link";

function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
    </svg>
  );
}

const WA_URL = "https://wa.me/525652107460?text=Hola%2C+me+interesa+automatizar+mi+negocio";

function NavLink({ href, children, external }: { href: string; children: React.ReactNode; external?: boolean }) {
  const style: React.CSSProperties = { color: "var(--color-text-muted)" };
  const hover = (e: React.MouseEvent<HTMLElement>) =>
    (e.currentTarget.style.color = "var(--color-primary-light)");
  const blur = (e: React.MouseEvent<HTMLElement>) =>
    (e.currentTarget.style.color = "var(--color-text-muted)");

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm transition-colors cursor-pointer"
        style={style}
        onMouseEnter={hover}
        onMouseLeave={blur}
      >
        {children}
      </a>
    );
  }
  return (
    <Link
      href={href}
      className="text-sm transition-colors cursor-pointer"
      style={style}
      onMouseEnter={hover}
      onMouseLeave={blur}
    >
      {children}
    </Link>
  );
}

export default function Footer() {
  return (
    <footer style={{ background: "var(--color-canvas)" }}>
      {/* Separator */}
      <div
        aria-hidden="true"
        style={{
          height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(27,110,243,0.5) 50%, transparent)",
        }}
      />

      <div className="mx-auto max-w-6xl px-5 py-14">
        {/* 4-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Col 1: Marca */}
          <div className="flex flex-col gap-3">
            <span
              className="font-heading font-bold text-lg"
              style={{ color: "var(--color-text-base)" }}
            >
              +Digital MX
            </span>
            <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-caption)" }}>
              Automatiza tu negocio con IA
            </p>
            {/* Social icons */}
            <div className="flex gap-4 mt-2">
              <a
                href="https://www.facebook.com/people/MAS-Digital-MX/61576597229117/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook de +Digital MX"
                className="transition-colors cursor-pointer"
                style={{ color: "var(--color-text-muted)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-text-base)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-text-muted)")}
              >
                <FacebookIcon />
              </a>
              <a
                href="https://www.instagram.com/mas_digitalmx/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram de +Digital MX"
                className="transition-colors cursor-pointer"
                style={{ color: "var(--color-text-muted)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-text-base)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-text-muted)")}
              >
                <InstagramIcon />
              </a>
            </div>
          </div>

          {/* Col 2: Productos */}
          <div className="flex flex-col gap-3">
            <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "var(--color-text-caption)" }}>
              Productos
            </p>
            <NavLink href="/#productos">Agente de Voz IA</NavLink>
            <NavLink href="/#productos">Chatbot WhatsApp</NavLink>
            <NavLink href="/#productos">Gestión Documental IA</NavLink>
            <NavLink href="/#productos">Automatización de Procesos</NavLink>
          </div>

          {/* Col 3: Empresa */}
          <div className="flex flex-col gap-3">
            <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "var(--color-text-caption)" }}>
              Empresa
            </p>
            <NavLink href="/#pricing">Precios</NavLink>
            <NavLink href="/#contacto">Contacto</NavLink>
            <NavLink href="/privacidad">Aviso de Privacidad</NavLink>
            <NavLink href="/terminos">Términos y Condiciones</NavLink>
          </div>

          {/* Col 4: Contacto */}
          <div className="flex flex-col gap-3">
            <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "var(--color-text-caption)" }}>
              Contacto
            </p>
            <NavLink href="mailto:contacto@masdigitalmx.com" external>
              contacto@masdigitalmx.com
            </NavLink>
            <NavLink href={WA_URL} external>
              WhatsApp +52 56 5210 7460
            </NavLink>
            <a
              href="tel:+13203226307"
              className="text-sm transition-colors cursor-pointer flex items-center gap-1.5"
              style={{ color: "var(--color-text-muted)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-primary-light)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-text-muted)")}
            >
              <PhoneIcon />
              Llamar a Aurora
            </a>
          </div>
        </div>

        {/* Legal bar */}
        <div
          className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderTop: "1px solid var(--color-border)" }}
        >
          <p className="text-xs" style={{ color: "var(--color-text-caption)" }}>
            © 2026 Servicios +Digital MX. Todos los derechos reservados.
          </p>
          <p className="text-xs" style={{ color: "var(--color-text-caption)" }}>
            Hecho en México 🇲🇽
          </p>
        </div>
      </div>
    </footer>
  );
}
