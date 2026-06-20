import { NextResponse } from "next/server";

// W-EXPRESS-01: Endpoint deshabilitado temporalmente — mitigación LFPDPPP
// Restaurar cuando el Aviso de Privacidad Corporativo esté publicado en masdigitalmx.com/privacidad
//
// const FORMSUBMIT_URL =
//   "https://formsubmit.co/ajax/contacto@masdigitalmx.com";

export async function POST(_request: Request) {
  return NextResponse.json(
    {
      error:
        "Endpoint temporalmente fuera de servicio. Por favor escríbanos directamente a contacto@masdigitalmx.com",
    },
    { status: 503 }
  );
}

// export async function POST(request: Request) {
//   try {
//     const body = await request.json();

//     // Formsubmit requiere Referer/Origin para distinguir requests legítimos
//     // de archivos HTML locales. Usamos el origen del navegador si está disponible.
//     const origin =
//       request.headers.get("origin") ??
//       request.headers.get("referer") ??
//       "https://masdigitalmx.com";

//     const res = await fetch(FORMSUBMIT_URL, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//         Referer: origin,
//         Origin: origin,
//       },
//       body: JSON.stringify({
//         nombre: body.nombre ?? "",
//         whatsapp: body.whatsapp ?? "",
//         email: body.email ?? "",
//         sector: body.sector ?? "",
//         mensaje: body.mensaje ?? "",
//         _subject: "Nueva solicitud de demo — +Digital MX",
//         _captcha: "false",
//       }),
//     });

//     const data = await res.json().catch(() => ({}));

//     if (res.ok && data.success === "true") {
//       return NextResponse.json({ ok: true });
//     }

//     return NextResponse.json({ ok: false, detail: data }, { status: 502 });
//   } catch (err) {
//     return NextResponse.json(
//       { ok: false, detail: String(err) },
//       { status: 500 }
//     );
//   }
// }
