import { NextRequest, NextResponse } from "next/server";
import { type CartEntry, formatOrderItems, formatPrice } from "@/app/tienda/products";
import { saveToSheet } from "@/lib/sheets";

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

async function createMpPreference(
  codigo: string,
  form: { nombre: string; apellido: string; email: string; telefono: string },
  total: number
): Promise<string> {
  const baseUrl = process.env.BASE_URL ?? "";
  const res = await fetch("https://api.mercadopago.com/checkout/preferences", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
    },
    body: JSON.stringify({
      items: [
        {
          id: codigo,
          title: "Pedido Locrazo Patrio",
          quantity: 1,
          unit_price: total,
          currency_id: "ARS",
        },
      ],
      payer: {
        name: form.nombre,
        surname: form.apellido,
        email: form.email,
        phone: { number: form.telefono },
      },
      external_reference: codigo,
      back_urls: {
        success: `${baseUrl}/tienda/pedido-exitoso?codigo=${codigo}&metodo=mp`,
        failure: `${baseUrl}/tienda/pedido-exitoso?codigo=${codigo}&metodo=mp&status=failure`,
        pending: `${baseUrl}/tienda/pedido-exitoso?codigo=${codigo}&metodo=mp&status=pending`,
      },
      auto_return: "approved",
      notification_url: `${baseUrl}/api/tienda/mp-webhook`,
    }),
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`MP preference creation failed: ${res.status} ${body}`);
  }
  const data = await res.json();
  return data.init_point as string;
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
      confirmado: "No",
      retirado: "No",
    });

    // TODO: send confirmation email via Resend

    if (form.metodoPago === "mp") {
      const mpCheckoutUrl = await createMpPreference(codigo, form, total);
      return NextResponse.json({ success: true, codigo, mpCheckoutUrl });
    }

    return NextResponse.json({ success: true, codigo });
  } catch (e) {
    console.error("[create-order]", e);
    return NextResponse.json({ success: false, error: "Error interno" }, { status: 500 });
  }
}
