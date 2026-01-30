import { NextResponse } from "next/server";

import mercadopago from "@/lib/mercadopago";
import { db } from "@/lib/prisma";

export async function POST(req: Request) {
  const body = await req.json();

  if (body.type !== "payment") return NextResponse.json({ ok: true });

  const paymentId = body.data.id;
  const payment = await mercadopago.payment.get(paymentId);

  if (payment.body.status === "approved") {
    await db.order.update({
      where: { id: payment.body.external_reference },
      data: { status: "PAID" },
    });
  }

  return NextResponse.json({ received: true });
}
