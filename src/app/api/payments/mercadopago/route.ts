import { MercadoPagoConfig, Payment } from "mercadopago";
import { NextResponse } from "next/server";

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN!,
});

export async function POST(req: Request) {
  try {
    const { method, orderId, payer } = await req.json();

    if (!method || !orderId || !payer?.email || !payer?.cpf) {
      return NextResponse.json(
        { error: "Dados obrigatórios ausentes" },
        { status: 400 },
      );
    }

    const payment = new Payment(client);

    // =====================
    // PIX
    // =====================
    if (method === "PIX") {
      const response = await payment.create({
        body: {
          transaction_amount: 100, // ajuste para o total do pedido
          payment_method_id: "pix",
          description: `Pedido ${orderId}`,
          payer: {
            email: payer.email,
            identification: {
              type: "CPF",
              number: payer.cpf,
            },
          },
        },
      });

      return NextResponse.json(response);
    }

    return NextResponse.json(
      { error: "Método de pagamento inválido" },
      { status: 400 },
    );
  } catch (error) {
    console.error("Erro Mercado Pago:", error);
    return NextResponse.json(
      { error: "Erro interno ao criar pagamento" },
      { status: 500 },
    );
  }
}
