import Image from "next/image";
import { notFound } from "next/navigation";

import { getRestaurantBySlug } from "@/data/get-restaurant-by-slug";

import ConsumptionMethodOption from "./components/consumption-method-option";

interface RestaurantPageProps {
  params: Promise<{ slug: string }>;
}
const RestaurantPage = async ({ params }: RestaurantPageProps) => {
  const { slug } = await params;

  const restaurant = await getRestaurantBySlug(slug);

  if (!restaurant) {
    return notFound();
  }

  return (
    <div className="bg-purple-700 h-screen flex flex-col items-center justify-center px-6 ">
      <div className="flex flex-col items-center gap-2">
        <Image
          src="/logo.png"
          alt="Logomarca de Ceara Açaí Burguer"
          width={100}
          height={100}
          className="rounded-full"
        />
        <h2 className="font-semibold uppercase text-2xl text-yellow-50">
          {restaurant.name}
        </h2>
      </div>
      <div className="pt-14 text-center space-y-2">
        <h3 className="text-2xl font-semibold text-yellow-300 uppercase">
          Seja bem vindo ao Ceará Açaí Burguer App
        </h3>
        <p className="opacity-55 text-yellow-50">
          Escolha como prefere aproveitar sua refeição. Estamos a oferecer
          praticidade e sabor em cada detalhe
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4 pt-4">
        <ConsumptionMethodOption
          slug={slug}
          option={"DINE_IN"}
          buttonText="Comer aqui"
          imageAlt="Para comer o lanche no restaurante"
          imageUrl="/dine_in.png"
        />
        <ConsumptionMethodOption
          slug={slug}
          option={"TAKEAWAY"}
          buttonText="Retirar aqui"
          imageAlt="Para levar seu lanche para casa"
          imageUrl="/takeaway.png"
        />
      </div>
    </div>
  );
};

export default RestaurantPage;

// server componentes - renderizados no servidor
// podem ser async
// podem chamar recursos do back-end (banco de dados)
// não pode usar hooks
// não pode ter interatividade
