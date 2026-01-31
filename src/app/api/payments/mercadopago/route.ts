import { OrderStatus } from "@prisma/client";
import { MercadoPagoConfig, Payment } from "mercadopago";
import { NextRequest, NextResponse } from "next/server";

import { db } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (body.type !== "payment") {
      return NextResponse.json({ received: true });
    }

    const client = new MercadoPagoConfig({
      accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!,
    });

    const payment = new Payment(client);

    const paymentData = await payment.get({
      id: body.data.id,
    });

    // external_reference = orderId que você enviou ao criar pagamento
    const orderId = Number(paymentData.external_reference);

    if (!orderId) {
      return NextResponse.json({ error: "Invalid order id" }, { status: 400 });
    }

    let newStatus: OrderStatus;

    // Fix: Use paymentData.status instead of undefined status variable
    switch (paymentData.status) {
      case "pending":
      case "in_process":
        newStatus = OrderStatus.PENDING;
        break;

      case "approved":
        newStatus = OrderStatus.PAID;
        break;

      case "rejected":
      case "cancelled":
      case "refunded":
        newStatus = OrderStatus.PAYMENT_FAILED;
        break;

      default:
        return NextResponse.json({ received: true });
    }

    await db.order.update({
      where: {
        id: orderId,
      },
      data: {
        status: newStatus,
        paymentId: String(paymentData.id),
      },
    });

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook Mercado Pago:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
