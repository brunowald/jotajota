import { NextRequest, NextResponse } from "next/server";
import { type CartEntry, formatOrderItems, formatPrice } from "@/app/tienda/products";

function generateOrderCode(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  return Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
}

function metodoPagoLabel(metodo: string): string {
  if (metodo === "mp") return "MercadoPago online";
  if (metodo === "transferencia") return "Transferencia bancaria";
  if (metodo === "retiro") return "Al retirar";
  return metodo;
}

function confirmadoDefault(metodo: string): string {
  return metodo === "mp" ? "Sí" : "No";
}

async function saveToSheet(data: Record<string, string>) {
  const url = process.env.APPS_SCRIPT_URL;
  if (!url) return;
  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  } catch (e) {
    console.error("[create-order] Apps Script error:", e);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      entries,
      quantities,
      form,
      total,
    }: {
      entries: CartEntry[];
      quantities: Record<string, number>;
      form: {
        nombre: string;
        apellido: string;
        telefono: string;
        email: string;
        metodoPago: string;
        entrega: string;
        direccion: string;
        observaciones: string;
      };
      total: number;
    } = body;

    const codigo = generateOrderCode();

    const now = new Date().toLocaleString("es-AR", {
      timeZone: "America/Argentina/Buenos_Aires",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    await saveToSheet({
      codigo,
      fechaHora: now,
      nombre: form.nombre,
      apellido: form.apellido,
      telefono: form.telefono,
      email: form.email,
      items: formatOrderItems(entries, quantities),
      total: formatPrice(total),
      metodoPago: metodoPagoLabel(form.metodoPago),
      retiroEnvio: form.entrega === "envio" ? "Envío a domicilio" : "Retiro en JJ",
      direccionEnvio: form.entrega === "envio" ? form.direccion : "",
      observaciones: form.observaciones,
      confirmado: confirmadoDefault(form.metodoPago),
      retirado: "No",
    });

    // TODO: send confirmation email via Resend
    // TODO: redirect to MercadoPago preference URL when metodoPago === "mp"

    return NextResponse.json({ success: true, codigo });
  } catch (e) {
    console.error("[create-order]", e);
    return NextResponse.json({ success: false, error: "Error interno" }, { status: 500 });
  }
}
