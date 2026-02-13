"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ConsumptionMethod } from "@prisma/client";
import { Loader2Icon } from "lucide-react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useContext, useState, useTransition } from "react";
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
  const [isPending, startTransition] = useTransition();
  const { createMercadoPagoCheckout } = useMercadoPago();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      cpf: "",
    },
  });

  const onSubmit = (data: FormSchema) => {
    const consumptionMethod = searchParams.get(
      "consumptionMethod",
    ) as ConsumptionMethod;

    startTransition(async () => {
      try {
        console.log("Iniciando criação do pedido...");

        // 1️⃣ Cria pedido no banco de dados
        const order = await createOrder({
          consumptionMethod,
          customerCpf: data.cpf,
          customerName: data.name,
          products: products.map((p) => ({ id: p.id, quantity: p.quantity })),
          slug,
        });

        console.log("Pedido criado com sucesso:", order);

        // 2️⃣ Chama a API de Checkout do Mercado Pago
        // IMPORTANTE: A action createOrder retorna 'orderId', não 'id'
        const checkoutData = {
          orderId: order.orderId,
          method: paymentMethod,
          payer: {
            name: data.name,
            email: "domlinksolucoesdigitais@gmail.com",
            cpf: data.cpf,
          },
          products: products.map((p) => ({
            id: p.id,
            quantity: p.quantity,
            price: p.price,
            name: p.name,
          })),
        };

        console.log("Enviando dados para o checkout:", checkoutData);

        await createMercadoPagoCheckout(checkoutData);

        clearCart();
        onOpenChange(false);
        toast.success("Redirecionando para o pagamento...");
      } catch (err) {
        console.error("Erro detalhado no onSubmit:", err);
        toast.error(
          "Erro ao processar o pedido. Verifique o console para mais detalhes.",
        );
      }
    });
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Finalizar Pedido</DrawerTitle>
          <DrawerDescription>
            Escolha a forma de pagamento e preencha seus dados.
          </DrawerDescription>
        </DrawerHeader>

        <div className="flex gap-2 px-4 mb-4">
          <Button
            className="flex-1"
            variant={paymentMethod === "PIX" ? "default" : "outline"}
            onClick={() => setPaymentMethod("PIX")}
          >
            PIX
          </Button>
          <Button
            className="flex-1"
            variant={paymentMethod === "CARD" ? "default" : "outline"}
            onClick={() => setPaymentMethod("CARD")}
          >
            Cartão
          </Button>
        </div>

        <div className="p-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome Completo</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite seu nome..." {...field} />
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
                        placeholder="000.000.000-00"
                        onValueChange={(v) => field.onChange(v.value)}
                        value={field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DrawerFooter className="px-0">
                <Button type="submit" disabled={isPending} className="w-full">
                  {isPending && (
                    <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Finalizar e Pagar
                </Button>

                <DrawerClose asChild>
                  <Button variant="outline" className="w-full">
                    Cancelar
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            </form>
          </Form>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
