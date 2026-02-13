import { initMercadoPago } from "@mercadopago/sdk-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const useMercadoPago = () => {
  const router = useRouter();

  useEffect(() => {
    const publicKey = process.env.NEXT_PUBLIC_MERCADO_PAGO_PUBLIC_KEY;
    if (publicKey) {
      initMercadoPago(publicKey);
    } else {
      console.warn(
        "Mercado Pago Public Key não encontrada nas variáveis de ambiente.",
      );
    }
  }, []);

  async function createMercadoPagoCheckout(checkoutData: any) {
    try {
      const response = await fetch("/api/mercado-pago/create-checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(checkoutData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erro ao criar checkout");
      }

      const data = await response.json();

      if (data.initPoint) {
        router.push(data.initPoint);
      } else {
        throw new Error("URL de checkout não recebida");
      }
    } catch (error) {
      console.error("Erro no Hook Mercado Pago:", error);
      throw error; // Repassa o erro para ser tratado no componente
    }
  }

  return { createMercadoPagoCheckout };
};

export default useMercadoPago;
