import { NextResponse } from "next/server";

import mercadopago from "@/lib/mercadopago";
import { db } from "@/lib/prisma";

export async function POST(req: Request) {
  const { orderId } = await req.json();

  const order = await db.order.findUnique({
    where: { id: orderId },
    include: { restaurant: true },
  });

  if (!order || !order.restaurant.mercadoPagoUserId) {
    return NextResponse.json({ error: "Pedido inválido" }, { status: 400 });
  }

  const payment = await mercadopago.payment.create({
    transaction_amount: order.total,
    description: `Pedido ${order.id}`,
    payment_method_id: "pix",
    external_reference: order.id,
    application_fee: order.total * 0.1,
    collector_id: order.restaurant.mercadoPagoUserId,
    payer: { email: "cliente@email.com" },
  });

  await db.order.update({
    where: { id: order.id },
    data: { paymentId: String(payment.body.id) },
  });

  return NextResponse.json(payment.body);
}
