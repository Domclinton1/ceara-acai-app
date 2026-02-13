import { Preference } from "mercadopago";
import { NextRequest, NextResponse } from "next/server";

import mpClient from "@/lib/mercadopago";

export async function POST(req: NextRequest) {
  const { orderId, method, payer, products } = await req.json();

  try {
    const preference = new Preference(mpClient);

    const createdPreference = await preference.create({
      body: {
        external_reference: orderId, // IMPORTANTE: Isso aumenta a pontuação da sua integração com o Mercado Pago - É o id da compra no nosso sistema
        metadata: {
          order_id: orderId,
          payment_method: method,
        },
        payer: {
          email: payer.email,
          first_name: payer.name.split(" ")[0],
          last_name: payer.name.split(" ").slice(1).join(" "),
          identification: {
            type: "CPF",
            number: payer.cpf,
          },
        },
        items: products.map((product: any) => ({
          id: product.id,
          description: product.name,
          title: product.name,
          quantity: product.quantity,
          unit_price: product.price,
          currency_id: "BRL",
          category_id: "food", // Pode ser ajustado conforme a categoria real do produto
        })),
        payment_methods: {
          // Descomente para desativar métodos de pagamento
          //   excluded_payment_methods: [
          //     {
          //       id: "bolbradesco",
          //     },
          //     {
          //       id: "pec",
          //     },
          //   ],
          //   excluded_payment_types: [
          //     {
          //       id: "debit_card",
          //     },
          //     {
          //       id: "credit_card",
          //     },
          //   ],
          installments: 12, // Número máximo de parcelas permitidas - calculo feito automaticamente
        },
        auto_return: "approved",
        back_urls: {
          success: `${req.headers.get("origin")}/?status=sucesso`,
          failure: `${req.headers.get("origin")}/?status=falha`,
          pending: `${req.headers.get("origin")}/api/mercado-pago/pending`, // Criamos uma rota para lidar com pagamentos pendentes
        },
      },
    });

    if (!createdPreference.id) {
      throw new Error("No preferenceID");
    }

    return NextResponse.json({
      preferenceId: createdPreference.id,
      initPoint: createdPreference.init_point,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.error();
  }
}
