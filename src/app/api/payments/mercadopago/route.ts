import { NextResponse } from "next/server";

import { payment } from "@/lib/mercadopago"; // Corrected: Named import for 'payment'
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

  try {
    const response = await payment.create({
      body: {
        // Data must be inside 'body' for SDK v2
        transaction_amount: order.total,
        description: `Pedido ${order.id}`,
        payment_method_id: "pix",
        external_reference: String(order.id), // Fix: Convert order.id to string
        // application_fee: order.total * 0.1, // Uncomment if authorized and configured
        notification_url: "./api/webhooks/mercadopago", // Highly recommended for status updates
        payer: {
          email: "cliente@email.com", // Use actual customer email if available
        },
      },
    });

    await db.order.update({
      where: { id: order.id },
      data: { paymentId: String(response.id) },
    });

    return NextResponse.json(response);
  } catch (error) {
    console.error("Mercado Pago Error:", error);
    return NextResponse.json(
      { error: "Erro ao criar pagamento" },
      { status: 500 },
    );
  }
}
