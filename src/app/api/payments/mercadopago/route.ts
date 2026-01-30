import { NextResponse } from "next/server";

import { payment } from "@/lib/mercadopago";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const result = await payment.create({
      body: {
        transaction_amount: body.amount,
        description: "Pedido do app",
        payment_method_id: body.method,
        payer: {
          email: body.email,
        },
      },
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro Mercado Pago" }, { status: 500 });
  }
}
