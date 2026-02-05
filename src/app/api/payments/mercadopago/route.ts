import { MercadoPagoConfig, Payment } from "mercadopago";
import { NextResponse } from "next/server";

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN!,
});

export async function POST(req: Request) {
  const { method, orderId, cpf } = await req.json();

  const payment = new Payment(client);

  // PIX
  if (method === "PIX") {
    const response = await payment.create({
      body: {
        transaction_amount: 100,
        description: `Pedido ${orderId}`,
        payment_method_id: "pix",
        payer: {
          identification: {
            type: "CPF",
            number: cpf,
          },
        },
      },
    });

    return NextResponse.json(response);
  }

  // Cartão (token vem do frontend)
  if (method === "CARD") {
    const response = await payment.create({
      body: {
        transaction_amount: 100,
        token: "CARD_TOKEN",
        installments: 1,
        payment_method_id: "visa",
        payer: {
          email: "cliente@email.com",
        },
      },
    });

    return NextResponse.json(response);
  }
}
