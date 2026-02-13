"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ConsumptionMethod } from "@prisma/client";
import { Loader2Icon } from "lucide-react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import {
  startTransition,
  useContext,
  useEffect,
  useState,
  useTransition,
} from "react";
import { useForm } from "react-hook-form";
import { PatternFormat } from "react-number-format";
import { toast } from "sonner";
import { z } from "zod";

import useMercadoPago from "@/app/hooks/useMercadoPago";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { createOrder } from "../../actions/create-order";
import { CartContext } from "../../contexts/cart";
import { isValidCpf } from "../../helpers/cpf";

const formSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório"),
  cpf: z.string().refine(isValidCpf, "CPF inválido"),
});

type FormSchema = z.infer<typeof formSchema>;
type PaymentMethod = "PIX" | "CARD";

interface FinishOrderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function FinishOrderDialog({
  open,
  onOpenChange,
}: FinishOrderDialogProps) {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { products, clearCart } = useContext(CartContext);

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("PIX");
  const [pixQrCode, setPixQrCode] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const { createMercadoPagoCheckout } = useMercadoPago();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });

  // SDK Mercado Pago (necessário para cartão)
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sdk.mercadopago.com/js/v2";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const onSubmit = (data: FormSchema) => {
    const consumptionMethod = searchParams.get(
      "consumptionMethod",
    ) as ConsumptionMethod;

    startTransition(async () => {
      try {
        // 1️⃣ Cria pedido
        const order = await createOrder({
          consumptionMethod,
          customerCpf: data.cpf,
          customerName: data.name,
          products,
          slug,
        });

        // 2️⃣ Cria pagamento
        if (paymentMethod === "CARD") {
          await createMercadoPagoCheckout({
            orderId: order.orderId,
            method: paymentMethod,
            payer: {
              name: data.name,
              email: "clintindossites@gmail.com", // Substitua por um email real ou obtenha do usuário
              cpf: data.cpf,
            },
            products: products.map((p) => ({
              id: p.id,
              quantity: p.quantity,
              price: p.price,
              name: p.name,
              imageUrl: p.imageUrl,
            })),
          });
          clearCart();
          onOpenChange(false);
          return;
        }

        const response = await fetch("/api/mercado-pago/create-checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            orderId: order.orderId,
            method: paymentMethod,
            payer: {
              name: data.name,
              email: "clintindossites@gmail.com", // Substitua por um email real ou obtenha do usuário
              cpf: data.cpf,
            },
            products: products.map((p) => ({
              id: p.id,
              quantity: p.quantity,
              price: p.price,
              name: p.name,
              imageUrl: p.imageUrl,
            })),
          }),
        });

        if (!response.ok) {
          throw new Error("Erro no pagamento");
        }

        const payment = await response.json();

        // 🟢 PIX
        if (paymentMethod === "PIX") {
          setPixQrCode(
            payment.point_of_interaction?.transaction_data?.qr_code_base64,
          );
          toast.success("PIX gerado");
          return;
        }

        // 🔵 Cartão (quando implementar token)
        // A lógica para cartão agora é tratada pelo createMercadoPagoCheckout
        toast.success("Pagamento aprovado!");
        clearCart();
        onOpenChange(false);
        router.push(`/${order.slug}/orders?cpf=${order.cpf}`);
      } catch (err) {
        console.error(err);
        toast.error("Erro ao finalizar pedido");
      }
    });
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Finalizar Pedido</DrawerTitle>
          <DrawerDescription>
            Preencha os dados para finalizar
          </DrawerDescription>
        </DrawerHeader>

        <div className="flex gap-2 px-4">
          <Button
            variant={paymentMethod === "PIX" ? "default" : "outline"}
            onClick={() => setPaymentMethod("PIX")}
          >
            PIX
          </Button>
          <Button
            variant={paymentMethod === "CARD" ? "default" : "outline"}
            onClick={() => setPaymentMethod("CARD")}
          >
            Cartão
          </Button>
        </div>

        {pixQrCode && (
          <div className="flex justify-center p-4">
            <image
              href={`data:image/png;base64,${pixQrCode}`}
              className="w-52 h-52"
            />
          </div>
        )}

        <div className="p-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cpf"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CPF</FormLabel>
                    <FormControl>
                      <PatternFormat
                        format="###.###.###-##"
                        customInput={Input}
                        onValueChange={(v) => field.onChange(v.value)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DrawerFooter>
                <Button type="submit" disabled={isPending}>
                  {isPending && (
                    <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Finalizar pedido
                </Button>

                <DrawerClose asChild>
                  <Button variant="outline">Cancelar</Button>
                </DrawerClose>
              </DrawerFooter>
            </form>
          </Form>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
