import { Preference } from "mercadopago";
import { NextRequest, NextResponse } from "next/server";

import mpClient from "@/lib/mercadopago";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("Recebido na API Mercado Pago:", JSON.stringify(body, null, 2));

    const { orderId, method, payer, products } = body;

    if (!orderId) {
      console.error("Erro: orderId ausente");
      return NextResponse.json({ error: "orderId ausente" }, { status: 400 });
    }
    if (!products || products.length === 0) {
      console.error("Erro: produtos ausentes");
      return NextResponse.json({ error: "produtos ausentes" }, { status: 400 });
    }

    const preference = new Preference(mpClient);

    const preferenceData = {
      body: {
        external_reference: String(orderId),
        metadata: {
          order_id: orderId,
          payment_method: method,
        },
        payer: {
          email: payer.email || "cliente@exemplo.com",
          name: payer.name,
          identification: {
            type: "CPF",
            number: payer.cpf.replace(/\D/g, ""),
          },
        },
        items: products.map((product: any) => ({
          id: String(product.id),
          title: product.name,
          quantity: Number(product.quantity),
          unit_price: Number(product.price),
          currency_id: "BRL",
        })),
        auto_return: "approved",
        back_urls: {
          success: `${req.headers.get("origin")}/?status=sucesso`,
          failure: `${req.headers.get("origin")}/?status=falha`,
          pending: `${req.headers.get("origin")}/?status=pendente`,
        },
      },
    };

    console.log("Criando preferência no Mercado Pago...");
    const createdPreference = await preference.create(preferenceData);
    console.log("Preferência criada com sucesso:", createdPreference.id);

    return NextResponse.json({
      preferenceId: createdPreference.id,
      initPoint: createdPreference.init_point,
    });
  } catch (err: any) {
    console.error("Erro detalhado na API do Mercado Pago:", err);
    return NextResponse.json(
      { error: err.message || "Erro interno no servidor" },
      { status: 500 },
    );
  }
}
