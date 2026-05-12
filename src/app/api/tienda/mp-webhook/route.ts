import { NextRequest, NextResponse } from "next/server";
import { confirmInSheet } from "@/lib/sheets";

export async function POST(req: NextRequest) {
  // Respond immediately — MP requires a fast 200 ACK
  const body = await req.json().catch(() => null);

  if (body?.type === "payment" && body?.data?.id) {
    const paymentId = body.data.id as string;
    // Fire-and-forget: don't await so response is sent immediately
    void handlePayment(paymentId);
  }

  return NextResponse.json({ received: true });
}

async function handlePayment(paymentId: string) {
  try {
    const res = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
      headers: {
        Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
      },
    });
    if (!res.ok) {
      console.error(`[mp-webhook] Payment fetch failed: ${res.status}`);
      return;
    }
    const payment = await res.json();
    if (payment.status === "approved" && payment.external_reference) {
      await confirmInSheet(payment.external_reference as string);
    }
  } catch (e) {
    console.error("[mp-webhook] Error handling payment:", e);
  }
}
