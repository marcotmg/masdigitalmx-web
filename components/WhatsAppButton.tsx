"use client";

import { MessageCircle } from "lucide-react";

const WA_URL =
  "https://wa.me/525652107460?text=Hola%2C+me+interesa+automatizar+mi+negocio";

export default function WhatsAppButton() {
  return (
    <a
      href={WA_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full text-white shadow-xl cursor-pointer transition-all duration-200 hover:scale-110 hover:shadow-2xl"
      style={{ background: "#25D366" }}
    >
      <MessageCircle size={26} fill="white" strokeWidth={0} />
    </a>
  );
}
