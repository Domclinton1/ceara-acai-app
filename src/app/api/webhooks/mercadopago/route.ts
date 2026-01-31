import { NextResponse } from "next/server";

import { payment } from "@/lib/mercadopago";
import { db } from "@/lib/prisma";

export async function POST(req: Request) {
  const { orderId } = await req.json();

  const order = await db.order.findUnique({
    where: { id: orderId },
    include: { restaurant: true },
  });

  if (!order) {
    return NextResponse.json(
      { error: "Pedido não encontrado" },
      { status: 404 },
    );
  }

  // Determine which access token to use.
  // If the restaurant has its own mercadoPagoUserId, you might need OAuth.
  // For now, we use the main application token but we can tag the order.

  try {
    const response = await payment.create({
      body: {
        transaction_amount: order.total,
        description: `Pedido ${order.id} - ${order.restaurant.name}`,
        payment_method_id: "pix",
        external_reference: String(order.id),
        // Use an absolute URL for notification if possible, or a relative one that MP can reach
        // Note: MP requires a public URL for webhooks to work.
        notification_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/webhooks/mercadopago`,
        payer: {
          email: "cliente@email.com", // Ideally use order.customerEmail if available
          first_name: order.customerName.split(" ")[0],
          last_name: order.customerName.split(" ").slice(1).join(" "),
          identification: {
            type: "CPF",
            number: order.customerCpf,
          },
        },
      },
    });

    await db.order.update({
      where: { id: order.id },
      data: {
        paymentId: String(response.id),
        mercadoPagoUserId: order.restaurant.mercadoPagoUserId, // Store the restaurant's MP ID in the order
      },
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
