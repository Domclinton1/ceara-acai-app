/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-explicit-any */
const { PrismaClient } = require("@prisma/client");

const prismaClient = new PrismaClient();

const main = async () => {
  await prismaClient.$transaction(async (tx: any) => {
    await tx.restaurant.deleteMany();
    const restaurant = await tx.restaurant.create({
      data: {
        name: "Ceara Burguer Açaí",
        slug: "Ceara-Açai-Burguer",
        description: "O melhor açaí de Belo Horizonte",
        avatarImageUrl: "https://cearaburgueracai.vercel.app/images/logo.webp",
        coverImageUrl: "https://cearaburgueracai.vercel.app/images/banner.webp",
      },
    });
    const acaiCategory = await tx.menuCategory.create({
      data: {
        name: "Creme de Açaí",
        restaurantId: restaurant.id,
      },
    });
    await tx.product.createMany({
      data: [
        {
          name: "CearAçaí 500ml",
          description: "Imagem meramente ilustrativa.",
          price: 14.0,
          imageUrl:
            "https://cearaburgueracai.vercel.app/images/creme-cearacai-500ml.webp",
          menuCategoryId: acaiCategory.id,
          restaurantId: restaurant.id,
          ingredients: ["Creme de Açaí", "Banana", "Granola", "Leite em pó"],
        },
        {
          name: "CearAçaí Casado 500ml",
          description:
            "Creme de açaí com creme de cupuaçu, leite em pó e leite condesado",
          price: 22.0,
          imageUrl:
            "https://cearaburgueracai.vercel.app/images/creme-acai-casado.webp",
          menuCategoryId: acaiCategory.id,
          restaurantId: restaurant.id,
          ingredients: [
            "Creme de açaí",
            "Creme de cupuaçu",
            "Leite em pó",
            "Leite condesado",
          ],
        },
        {
          name: "CearAçaí Ovomaltine 500ml",
          description: "Creme de Açaí com Ovomaltine, morango e chantilly.",
          price: 23.0,
          imageUrl:
            "https://cearaburgueracai.vercel.app/images/creme-acai-ovomaltine-calda-morango.webp",
          menuCategoryId: acaiCategory.id,
          restaurantId: restaurant.id,
          ingredients: ["Creme de açaí", "Ovomaltine", "Morango", "Chantilly"],
        },
        {
          name: "CearAçaí Salada de Frutas 500ml",
          description: "Creme de açaí com morango, manga, banana e leite em pó",
          price: 23.0,
          imageUrl:
            "https://cearaburgueracai.vercel.app/images/creme-acai-salada-de-frutas.webp",
          menuCategoryId: acaiCategory.id,
          restaurantId: restaurant.id,
          ingredients: [
            "Creme de açaí",
            "Morango",
            "Manga",
            "Banana",
            "Leite em pó",
          ],
        },
        {
          name: "CearAçaí Kids 500ml",
          description: "Creme de açaí com leite em pó, MM e chantilly.",
          price: 23.9,
          imageUrl:
            "https://cearaburgueracai.vercel.app/images/creme-acai-kids.webp",
          menuCategoryId: acaiCategory.id,
          restaurantId: restaurant.id,
          ingredients: ["Creme de açaí", "Leite em Pó", "MM's", "Chantilly"],
        },
        {
          name: "CearAçaí Sensação 500ml",
          description:
            "Creme de açaí com morango, raspas de chocolate e leite em pó",
          price: 22.0,
          imageUrl:
            "https://cearaburgueracai.vercel.app/images/creme-sensacao.webp",
          menuCategoryId: acaiCategory.id,
          restaurantId: restaurant.id,
          ingredients: [
            "Creme de açaí",
            "Morango",
            "Raspa de chocolate",
            "Leite em Pó",
          ],
        },
        {
          name: "CearAçaí Açaí Biz 500ml",
          description: "Creme de açaí com biz, chantilly e morango",
          price: 23.9,
          imageUrl:
            "https://cearaburgueracai.vercel.app/images/creme-acai-bis.webp",
          menuCategoryId: acaiCategory.id,
          restaurantId: restaurant.id,
          ingredients: [
            "Creme de açaí",
            "Morango",
            "Raspa de chocolate",
            "Leite em Pó",
          ],
        },
        {
          name: "CearAçaí Açaí Super 500ml",
          description:
            "Creme de açaí morango, nutella, leite em pó e 1 bola de sorvete.",
          price: 29.9,
          imageUrl:
            "https://cearaburgueracai.vercel.app/images/creme-acai-super-nutella.webp",
          menuCategoryId: acaiCategory.id,
          restaurantId: restaurant.id,
          ingredients: [
            "Creme de açaí",
            "Morango",
            "Nutella",
            "Leite em Pó",
            "1 bola de sorvete",
          ],
        },
        {
          name: "Creme de Morango 500ml",
          description: "Creme de morango e leite condesado.",
          price: 24.9,
          imageUrl:
            "https://cearaburgueracai.vercel.app/images/creme-morango.webp",
          menuCategoryId: acaiCategory.id,
          restaurantId: restaurant.id,
          ingredients: ["Creme de morango", "Leite condesado"],
        },
        {
          name: "Creme de Cupuaçu 500ml",
          description: "Creme de cupuaçu e leite condesado.",
          price: 25.9,
          imageUrl:
            "https://cearaburgueracai.vercel.app/images/creme-acai-bis.webp",
          menuCategoryId: acaiCategory.id,
          restaurantId: restaurant.id,
          ingredients: ["Creme de cupuaçu", "Leite condesado"],
        },
      ],
    });
    const hamburguersCategory = await tx.menuCategory.create({
      data: {
        name: "Sanduíches",
        restaurantId: restaurant.id,
      },
    });
    await tx.product.createMany({
      data: [
        {
          name: "Misto Quente",
          description: "Pão de forma, 2 presuntos e 2 queijos..",
          ingredients: ["Pão de forma", "2 queijos", "2 presuntos"],
          price: 9,
          imageUrl:
            "https://cearaburgueracai.vercel.app/images/misto-quente.webp",
          menuCategoryId: hamburguersCategory.id,
          restaurantId: restaurant.id,
        },
        {
          name: "Mistão",
          description: "Pão de forma, 2 presuntos, 2 queijos, bacon e ovo.",
          ingredients: [
            "Pão de forma",
            "2 queijos",
            "2 presuntos",
            "Bacon",
            "Ovo",
          ],
          price: 11,
          imageUrl: "https://cearaburgueracai.vercel.app/images/mistão.webp",
          menuCategoryId: hamburguersCategory.id,
          restaurantId: restaurant.id,
        },
        {
          name: "Hamburguer",
          description: "Pão, hamburguer, maionese e salada.",
          ingredients: [
            "Pão de Hamburguer",
            "Carne de Hamburguer",
            "Maionese",
            "Salada",
          ],
          price: 11.5,
          imageUrl:
            "https://cearaburgueracai.vercel.app/images/hamburguer.webp",
          menuCategoryId: hamburguersCategory.id,
          restaurantId: restaurant.id,
        },
        {
          name: "X-Burguer",
          description: "Pão, hamburguer e queijo.",
          ingredients: ["Pão de Hamburguer", "Carne de Hamburguer", "Queijo"],
          price: 11.5,
          imageUrl: "https://cearaburgueracai.vercel.app/images/x-burguer.webp",
          menuCategoryId: hamburguersCategory.id,
          restaurantId: restaurant.id,
        },
        {
          name: "X-Salada",
          description:
            "Pão, hamburguer, queijo, batata palha, maionese e salada.",
          ingredients: [
            "Pão de Hamburguer",
            "Carne de Hamburguer",
            "Batata Palha",
            "Maionese",
            "Queijo",
            "Salada",
          ],
          price: 13,
          imageUrl: "https://cearaburgueracai.vercel.app/images/x-salada.webp",
          menuCategoryId: hamburguersCategory.id,
          restaurantId: restaurant.id,
        },
        {
          name: "X-Bacon Burguer",
          description:
            "Pão, hamburguer, queijo, bacon, milho, batata palha, maionese e salada.",
          ingredients: [
            "Pão de Hamburguer",
            "Carne de Hamburguer",
            "Batata Palha",
            "Bacon",
            "Milho",
            "Maionese",
            "Queijo",
            "Salada",
          ],
          price: 15,
          imageUrl:
            "https://cearaburgueracai.vercel.app/images/x-bacon-burguer.webp",
          menuCategoryId: hamburguersCategory.id,
          restaurantId: restaurant.id,
        },
        {
          name: "X-Egg Burguer",
          description:
            "Pão, hamburguer, queijo, ovo, presunto, milho, maionese e salada.",
          ingredients: [
            "Pão de Hamburguer",
            "Carne de Hamburguer",
            "Presunto",
            "Milho",
            "Maionese",
            "Queijo",
            "Salada",
          ],
          price: 15,
          imageUrl:
            "https://cearaburgueracai.vercel.app/images/x-egg-burguer.webp",
          menuCategoryId: hamburguersCategory.id,
          restaurantId: restaurant.id,
        },
        {
          name: "X-Egg Burguer Especial",
          description:
            "Pão, hamburguer, queijo, ovo, presunto, milho, batata palha, maionese e salada.",
          ingredients: [
            "Pão de Hamburguer",
            "Carne de Hamburguer",
            "Batata Palha",
            "Presunto",
            "Milho",
            "Maionese",
            "Queijo",
            "Salada",
            "Ovo",
          ],
          price: 15.5,
          imageUrl:
            "https://cearaburgueracai.vercel.app/images/x-egg-burguer-especial.webp",
          menuCategoryId: hamburguersCategory.id,
          restaurantId: restaurant.id,
        },
        {
          name: "X-Lombo",
          description:
            "Pão, hamburguer, lombo defumado, bacon, queijo, presunto, milho, batata palha, maionese.",
          ingredients: [
            "Pão de Hamburguer",
            "Carne de Hamburguer",
            "Lombo Defumado",
            "Batata Palha",
            "Bacon",
            "Presunto",
            "Milho",
            "Maionese",
            "Queijo",
            "Salada",
          ],
          price: 16,
          imageUrl: "https://cearaburgueracai.vercel.app/images/x-lombo.webp",
          menuCategoryId: hamburguersCategory.id,
          restaurantId: restaurant.id,
        },
        {
          name: "X-Calabresa",
          description:
            "Pão, hamburguer, calabresa fatiada, queijo, ovo, milho e salada.",
          ingredients: [
            "Pão de Hamburguer",
            "Carne de Hamburguer",
            "Calabresa fatiada",
            "Milho",
            "Queijo",
            "Salada",
            "Ovo",
          ],
          price: 16,
          imageUrl:
            "https://cearaburgueracai.vercel.app/images/x-calabresa.webp",
          menuCategoryId: hamburguersCategory.id,
          restaurantId: restaurant.id,
        },
        {
          name: "X-Tudo",
          description:
            "Pão, hamburguer, hamburguer de frango, ovo, bacon, queijo, presunto, milho, batata palha, maionese e salada.",
          ingredients: [
            "Pão de Hamburguer",
            "Carne de Hamburguer",
            "Carne de Hamburguer de Frango",
            "Bacon",
            "Presunto",
            "Maionese",
            "Batata Palha",
            "Milho",
            "Queijo",
            "Salada",
            "Ovo",
          ],
          price: 18,
          imageUrl: "https://cearaburgueracai.vercel.app/images/x-tudo.webp",
          menuCategoryId: hamburguersCategory.id,
          restaurantId: restaurant.id,
        },
        {
          name: "X-Filé",
          description:
            "Pão, bife de filé, queijo, ovo, bacon, milho, batata palha, maionese e salada.",
          ingredients: [
            "Pão de Hamburguer",
            "Bifé de Filé",
            "Bacon",
            "Maionese",
            "Batata Palha",
            "Milho",
            "Queijo",
            "Salada",
            "Ovo",
          ],
          price: 18,
          imageUrl: "https://cearaburgueracai.vercel.app/images/x-filé.webp",
          menuCategoryId: hamburguersCategory.id,
          restaurantId: restaurant.id,
        },
        {
          name: "X-Picanha",
          description:
            "Pão, hamburguer de picanha 120g, cheddar, ovo, bacon e salada.",
          ingredients: [
            "Pão de Hamburguer",
            "Hamburguer de Picanha 120g",
            "Bacon",
            "Cheddar",
            "Salada",
            "Ovo",
          ],
          price: 16,
          imageUrl: "https://cearaburgueracai.vercel.app/images/x-picanha.webp",
          menuCategoryId: hamburguersCategory.id,
          restaurantId: restaurant.id,
        },
        {
          name: "X-Picanha Especial",
          description:
            "Pão, hamburguer de picanha 120g, 2 fatias queijos, presunto, ovo e salada.",
          ingredients: [
            "Pão de Hamburguer",
            "Hamburguer de Picanha 120g",
            "2 Fatias de Queijo",
            "Presunto",
            "Salada",
            "Ovo",
          ],
          price: 16,
          imageUrl:
            "https://cearaburgueracai.vercel.app/images/x-picanha-especial.webp",
          menuCategoryId: hamburguersCategory.id,
          restaurantId: restaurant.id,
        },
        {
          name: "Framburguer",
          description:
            "Pão, hamburguer de frango, queijo, ovo, batata palha, maionese e salada.",
          ingredients: [
            "Pão de Hamburguer",
            "Hamburguer de Frango",
            "Queijo",
            "Batata Palha",
            "Maionese",
            "Salada",
            "Ovo",
          ],
          price: 16,
          imageUrl:
            "https://cearaburgueracai.vercel.app/images/framburguer.webp",
          menuCategoryId: hamburguersCategory.id,
          restaurantId: restaurant.id,
        },
        {
          name: "Framburguer Especial",
          description:
            "Pão, hamburguer de frango, queijo, bacon, ovo, presunto, milho batata palha, maionese.",
          ingredients: [
            "Pão de Hamburguer",
            "Hamburguer de Frango",
            "Queijo",
            "Bacon",
            "Batata Palha",
            "Milho",
            "Maionese",
            "Ovo",
          ],
          price: 16,
          imageUrl:
            "https://cearaburgueracai.vercel.app/images/framburguer-especial.webp",
          menuCategoryId: hamburguersCategory.id,
          restaurantId: restaurant.id,
        },
        {
          name: "Big-Frango",
          description:
            "Pão, filé de frango, catupiry, milho, ovo, maionese e salada.",
          ingredients: [
            "Pão de Hamburguer",
            "Filé de Frango",
            "Catupiry",
            "Milho",
            "Maionese",
            "Salada",
          ],
          price: 16,
          imageUrl:
            "https://cearaburgueracai.vercel.app/images/big-frango.webp",
          menuCategoryId: hamburguersCategory.id,
          restaurantId: restaurant.id,
        },
        {
          name: "Frango Desfiado",
          description:
            "Pão, frango desfiado, queijo, ovo, presunto, bacon, milho, batata palha e maionese.",
          ingredients: [
            "Pão de Hamburguer",
            "Frango Desfiado",
            "Batata Palha",
            "Presunto",
            "Bacon",
            "Queijo",
            "Milho",
            "Maionese",
            "Salada",
          ],
          price: 16.5,
          imageUrl:
            "https://cearaburgueracai.vercel.app/images/frango-desfiado.webp",
          menuCategoryId: hamburguersCategory.id,
          restaurantId: restaurant.id,
        },
        {
          name: "Frangão",
          description:
            "Pão, 2 hamburguers de frango, queijo, ovo, bacon, milho, batata palha, maionese e salada.",
          ingredients: [
            "Pão de Hamburguer",
            "2 Carnes de Hamburguer de Frango",
            "Batata Palha",
            "Bacon",
            "Queijo",
            "Milho",
            "Maionese",
            "Salada",
            "Ovo",
          ],
          price: 17.5,
          imageUrl: "https://cearaburgueracai.vercel.app/images/frangão.webp",
          menuCategoryId: hamburguersCategory.id,
          restaurantId: restaurant.id,
        },
        {
          name: "Frango com Catupiry",
          description:
            "Pão, frango desfiado, bacon, catupiry, ovo, milho, batata palha e maionese.",
          ingredients: [
            "Pão de Hamburguer",
            "Frango Desfiado",
            "Batata Palha",
            "Bacon",
            "Catupiry",
            "Milho",
            "Maionese",
            "Ovo",
          ],
          price: 18,
          imageUrl:
            "https://cearaburgueracai.vercel.app/images/frango-com-catupiry.webp",
          menuCategoryId: hamburguersCategory.id,
          restaurantId: restaurant.id,
        },
        {
          name: "Filé com Catupiry",
          description:
            "Pão, bife de filé, bacon, ovo, catupiry, milho, batata palha e maionese.",
          ingredients: [
            "Pão de Hamburguer",
            "Bife de Filé",
            "Batata Palha",
            "Bacon",
            "Catupiry",
            "Milho",
            "Maionese",
          ],
          price: 19,
          imageUrl:
            "https://cearaburgueracai.vercel.app/images/filé-com-catupiry.webp",
          menuCategoryId: hamburguersCategory.id,
          restaurantId: restaurant.id,
        },
        {
          name: "Laçador",
          description:
            "Pão, hamburguer, bacon, presunto, queijo, ovo, milho, batata palha, maionese e salada.",
          ingredients: [
            "Pão de Hamburguer",
            "Carne de Hamburguer",
            "Batata Palha",
            "Bacon",
            "Queijo",
            "Milho",
            "Maionese",
            "Salada",
            "Ovo",
          ],
          price: 16,
          imageUrl: "https://cearaburgueracai.vercel.app/images/laçador.webp",
          menuCategoryId: hamburguersCategory.id,
          restaurantId: restaurant.id,
        },
        {
          name: "Ceará Burguer",
          description:
            "Pão, hamburguer de frango, bacon, queijo, ovo, milho, batata palha, maionese e salada.",
          ingredients: [
            "Pão de Hamburguer",
            "Hamburguer de Frango",
            "Batata Palha",
            "Bacon",
            "Queijo",
            "Milho",
            "Maionese",
            "Salada",
            "Ovo",
          ],
          price: 15.5,
          imageUrl:
            "https://cearaburgueracai.vercel.app/images/ceará-burguer.webp",
          menuCategoryId: hamburguersCategory.id,
          restaurantId: restaurant.id,
        },
        {
          name: "Ceará Burguer 3 em 1",
          description: "Pão, 3 hamburguer, 2 queijos, maionese e salada.",
          ingredients: [
            "Pão de Hamburguer",
            "3 Carnes de Hamburguer",
            "2 Queijos",
            "Maionese",
            "Salada",
          ],
          price: 16,
          imageUrl:
            "https://cearaburgueracai.vercel.app/images/ceara-burguer-3-em-1.webp",
          menuCategoryId: hamburguersCategory.id,
          restaurantId: restaurant.id,
        },
        {
          name: "Ceará Burguer 4x4",
          description:
            "Pão, 2 hamburguers, 2 hamburguers de frango, 2 queijos, bacon, ovo e maionese.",
          ingredients: [
            "Pão de Hamburguer",
            "2 Carnes de Hamburguer Bovina",
            "2 Carnes de Hamburguer de Frango",
            "2 Queijos",
            "Bacon",
            "Maionese",
            "Salada",
            "Ovo",
          ],
          price: 19,
          imageUrl:
            "https://cearaburgueracai.vercel.app/images/ceara-burguer-4x4.webp",
          menuCategoryId: hamburguersCategory.id,
          restaurantId: restaurant.id,
        },
        {
          name: "Ceará Burguer Vegetariano",
          description:
            "Pão, queijo, ovo, banana, cebola, catupiry, milho, batata palha, maionese e salada.",
          ingredients: [
            "Pão de Hamburguer",
            "Queijo",
            "Banana",
            "Cebola",
            "Catupiry",
            "Milho",
            "Batata Palha",
            "Maionese",
            "Salada",
            "Ovo",
          ],
          price: 18,
          imageUrl:
            "https://cearaburgueracai.vercel.app/images/vegetariano.webp",
          menuCategoryId: hamburguersCategory.id,
          restaurantId: restaurant.id,
        },
        {
          name: "Ceará Burguer Duplo Picanha",
          description:
            "Pão, 2 hamburgueres de picanha 120g, queijo, ovo, bacon, milho, batata palha, maionese e salada.",
          ingredients: [
            "Pão de Hamburguer",
            "2 Hamburgueres de Picanha 120g",
            "Queijo",
            "Bacon",
            "Milho",
            "Batata Palha",
            "Maionese",
            "Salada",
            "Ovo",
          ],
          price: 23,
          imageUrl:
            "https://cearaburgueracai.vercel.app/images/duplo-picanha.webp",
          menuCategoryId: hamburguersCategory.id,
          restaurantId: restaurant.id,
        },
      ],
    });
    const espagueteCategory = await tx.menuCategory.create({
      data: {
        name: "Massas",
        restaurantId: restaurant.id,
      },
    });
    await tx.product.createMany({
      data: [
        {
          name: "Espaguete a Bolonhesa Peq",
          description: "Macarrão, molho a bolonhesa e queijo.",
          ingredients: ["Macarrão", "Queijo", "Molho a Bolonhesa"],
          price: 17,
          imageUrl:
            "https://cearaburgueracai.vercel.app/images/espaguete-a-bolonhesa-peq.webp",
          menuCategoryId: espagueteCategory.id,
          restaurantId: restaurant.id,
        },
        {
          name: "Espaguete a Bolonhesa Grd",
          description: "Macarrão, molho a bolonhesa e queijo.",
          ingredients: ["Macarrão", "Queijo", "Molho a Bolonhesa"],
          price: 21,
          imageUrl:
            "https://cearaburgueracai.vercel.app/images/espaguete-a-bolonhesa-grd.webp",
          menuCategoryId: espagueteCategory.id,
          restaurantId: restaurant.id,
        },
        {
          name: "Espaguete na Chapa Peq",
          description:
            "Macarrão, molho shoyu, molho de alho, vinagrete, bacon e frango desfiado.",
          ingredients: [
            "Macarrão",
            "Molho Shoyu",
            "Molho de Alho",
            "Vinagrete",
            "Bacon",
            "Frango Desfiado",
          ],
          price: 15,
          imageUrl:
            "https://cearaburgueracai.vercel.app/images/espaguete-na-chapa-peq.webp",
          menuCategoryId: espagueteCategory.id,
          restaurantId: restaurant.id,
        },
        {
          name: "Espaguete na Chapa Grd",
          description:
            "Macarrão, molho shoyu, molho de alho, vinagrete, bacon e frango desfiado.",
          ingredients: [
            "Macarrão",
            "Molho Shoyu",
            "Molho de Alho",
            "Vinagrete",
            "Bacon",
            "Frango Desfiado",
          ],
          price: 19,
          imageUrl:
            "https://cearaburgueracai.vercel.app/images/espaguete-na-chapa-grd.webp",
          menuCategoryId: espagueteCategory.id,
          restaurantId: restaurant.id,
        },
        {
          name: "Big Espaguete na Chapa",
          description:
            "Macarrão, molho shoyu, molho de alho, vinagrete, bacon e frango desfiado, presunto, queijo e calabresa.",
          ingredients: [
            "Macarrão",
            "Molho Shoyu",
            "Molho de Alho",
            "Vinagrete",
            "Bacon",
            "Frango Desfiado",
            "Presunto",
            "Queijo",
            "Calabresa",
          ],
          price: 25,
          imageUrl:
            "https://cearaburgueracai.vercel.app/images/big-espaguete-na-chapa.webp",
          menuCategoryId: espagueteCategory.id,
          restaurantId: restaurant.id,
        },
      ],
    });
    const omeleteCategory = await tx.menuCategory.create({
      data: {
        name: "Omeletes",
        restaurantId: restaurant.id,
      },
    });
    await tx.product.createMany({
      data: [
        {
          name: "Omelete",
          description:
            "Ovo, queijo, bacon, presunto, frango desfiado, batata, milho e salada.",
          ingredients: [
            "Ovo",
            "Bacon",
            "Queijo",
            "Presunto",
            "Frango Defiado",
            "Batata Palha",
            "Salada",
            "Milho",
          ],
          price: 20,
          imageUrl: "https://cearaburgueracai.vercel.app/images/omelete.webp",
          menuCategoryId: omeleteCategory.id,
          restaurantId: restaurant.id,
        },
        {
          name: "Omelete Especial",
          description:
            "Ovo, bacon, queijo, presunto, frango desfiado, batata palha, salada, cheddar, catupiry, milho.",
          ingredients: [
            "Ovo",
            "Bacon",
            "Queijo",
            "Presunto",
            "Frango Defiado",
            "Batata Palha",
            "Salada",
            "Cheddar",
            "Catupiry",
            "Milho",
          ],
          price: 24,
          imageUrl:
            "https://cearaburgueracai.vercel.app/images/omelete-especial.webp",
          menuCategoryId: omeleteCategory.id,
          restaurantId: restaurant.id,
        },
        {
          name: "Omelete com Cheddar",
          description:
            "Ovo, bacon, queijo, presunto, frango desfiado, batata, milho, salada e cheddar.",
          ingredients: [
            "Ovo",
            "Bacon",
            "Queijo",
            "Presunto",
            "Frango Defiado",
            "Batata Palha",
            "Salada",
            "Cheddar",
            "Milho",
          ],
          price: 22,
          imageUrl:
            "https://cearaburgueracai.vercel.app/images/omelete-com-cheddar.webp",
          menuCategoryId: omeleteCategory.id,
          restaurantId: restaurant.id,
        },
        {
          name: "Omelete com Catupiry",
          description:
            "Ovo, bacon, queijo, presunto, frango desfiado, batata, milho, salada e catupiry.",
          ingredients: [
            "Ovo",
            "Bacon",
            "Queijo",
            "Presunto",
            "Frango Defiado",
            "Batata Palha",
            "Salada",
            "Catupiry",
            "Milho",
          ],
          price: 22,
          imageUrl:
            "https://cearaburgueracai.vercel.app/images/omelete-com-catupiry.webp",
          menuCategoryId: omeleteCategory.id,
          restaurantId: restaurant.id,
        },
        {
          name: "Omelete Tropical",
          description: "Ovo, queijo, milho, catupiry, banana e salada.",
          ingredients: [
            "Ovo",
            "Queijo",
            "Banana",
            "Batata Palha",
            "Salada",
            "Catupiry",
            "Milho",
          ],
          price: 22,
          imageUrl:
            "https://cearaburgueracai.vercel.app/images/omelete-tropical.webp",
          menuCategoryId: omeleteCategory.id,
          restaurantId: restaurant.id,
        },
      ],
    });
    const porcoesCategory = await tx.menuCategory.create({
      data: {
        name: "Porções",
        restaurantId: restaurant.id,
      },
    });
    await tx.product.createMany({
      data: [
        {
          name: "Batatas Fritas 400gr",
          description: "Porção deliciosa de batata frita - 400 gramas.",
          ingredients: [],
          price: 20,
          imageUrl:
            "https://cearaburgueracai.vercel.app/images/fritas-400gr.webp",
          menuCategoryId: porcoesCategory.id,
          restaurantId: restaurant.id,
        },
        {
          name: "Batatas Fritas com Queijo 400gr",
          description:
            "Porção deliciosa de batata frita com queijo - 400 gramas.",
          ingredients: [],
          price: 24,
          imageUrl:
            "https://cearaburgueracai.vercel.app/images/fritas-com-queijo.webp",
          menuCategoryId: porcoesCategory.id,
          restaurantId: restaurant.id,
        },
        {
          name: "Batatas Fritas com Queijo e Bacon 400gr",
          description:
            "Porção deliciosa de batata frita com queijo e bacon.- 400 gramas.",
          ingredients: [],
          price: 27,
          imageUrl:
            "https://cearaburgueracai.vercel.app/images/fritas-bacon-cheddar.webp",
          menuCategoryId: porcoesCategory.id,
          restaurantId: restaurant.id,
        },
      ],
    });
    const drinksCategory = await tx.menuCategory.create({
      data: {
        name: "Bebidas",
        restaurantId: restaurant.id,
      },
    });
    await tx.product.createMany({
      data: [
        {
          name: "Coca-cola Lt 350ml",
          description: "Coca-cola gelada para acompanhar seu lanche.",
          ingredients: [],
          price: 6,
          imageUrl: "https://cearaburgueracai.vercel.app/images/refri-1.webp",
          menuCategoryId: drinksCategory.id,
          restaurantId: restaurant.id,
        },
        {
          name: "Guaraná Antartica Lt 350ml",
          description: "Guaraná geladinho para acompanhar seu lanche.",
          ingredients: [],
          price: 6,
          imageUrl: "https://cearaburgueracai.vercel.app/images/refri-2.webp",
          menuCategoryId: drinksCategory.id,
          restaurantId: restaurant.id,
        },
        {
          name: "SchweppesLt 350ml",
          description: "Schweppes geladinho para acompanhar seu lanche.",
          ingredients: [],
          price: 6,
          imageUrl:
            "https://cearaburgueracai.vercel.app/images/schweppes-350ml.webp",
          menuCategoryId: drinksCategory.id,
          restaurantId: restaurant.id,
        },
        {
          name: "Heineken Latão 473ml",
          description: "Cerveja Latão geladinha.",
          ingredients: [],
          price: 9,
          imageUrl:
            "https://cearaburgueracai.vercel.app/images/heineken-latao.webp",
          menuCategoryId: drinksCategory.id,
          restaurantId: restaurant.id,
        },
        {
          name: "Brahma Latão 473ml",
          description: "Brahma latão geladinha.",
          ingredients: [],
          price: 6.5,
          imageUrl:
            "https://cearaburgueracai.vercel.app/images/brahma-latao.webp",
          menuCategoryId: drinksCategory.id,
          restaurantId: restaurant.id,
        },
        {
          name: "Kaiser Latão 473ml",
          description: "Kaiser latão geladinha.",
          ingredients: [],
          price: 5,
          imageUrl:
            "https://cearaburgueracai.vercel.app/images/kaiser-latao.webp",
          menuCategoryId: drinksCategory.id,
          restaurantId: restaurant.id,
        },
        {
          name: "Skol Latão 473ml",
          description: "Skol latão geladinha.",
          ingredients: [],
          price: 6.5,
          imageUrl:
            "https://cearaburgueracai.vercel.app/images/skol-latao.webp",
          menuCategoryId: drinksCategory.id,
          restaurantId: restaurant.id,
        },
        {
          name: "Energético Red Bull 250ml",
          description: "Energético Red Bull.",
          ingredients: [],
          price: 12,
          imageUrl: "https://cearaburgueracai.vercel.app/images/redbull.webp",
          menuCategoryId: drinksCategory.id,
          restaurantId: restaurant.id,
        },
        {
          name: "Energético Monster 473ml",
          description: "Energético Monster 473ml",
          ingredients: [],
          price: 12,
          imageUrl: "https://cearaburgueracai.vercel.app/images/monster.webp",
          menuCategoryId: drinksCategory.id,
          restaurantId: restaurant.id,
        },
        {
          name: "Gatorade 500ml",
          description: "Gatorade 500ml",
          ingredients: [],
          price: 8,
          imageUrl: "https://cearaburgueracai.vercel.app/images/gatorade.webp",
          menuCategoryId: drinksCategory.id,
          restaurantId: restaurant.id,
        },
        {
          name: "Água 500ml",
          description: "Água gelada 500ml.",
          ingredients: [],
          price: 2.5,
          imageUrl:
            "https://cearaburgueracai.vercel.app/images/agua-500ml.webp",
          menuCategoryId: drinksCategory.id,
          restaurantId: restaurant.id,
        },
        {
          name: "Água com Gás 500ml",
          description: "Água Gelada com Gás 500ml.",
          ingredients: [],
          price: 3.5,
          imageUrl:
            "https://cearaburgueracai.vercel.app/images/agua-500ml.webp",
          menuCategoryId: drinksCategory.id,
          restaurantId: restaurant.id,
        },
        {
          name: "H2O 500ml",
          description: "H2O 500ml.",
          ingredients: [],
          price: 8,
          imageUrl: "https://cearaburgueracai.vercel.app/images/h20-500ml.webp",
          menuCategoryId: drinksCategory.id,
          restaurantId: restaurant.id,
        },
        {
          name: "Água Tônica Lata",
          description: "Água Tônica Lata.",
          ingredients: [],
          price: 8,
          imageUrl:
            "https://cearaburgueracai.vercel.app/images/agua-tonica.webp",
          menuCategoryId: drinksCategory.id,
          restaurantId: restaurant.id,
        },
        {
          name: "Refri Sabores 200ml",
          description: "Refri Sabores 200ml.",
          ingredients: [],
          price: 3,
          imageUrl:
            "https://cearaburgueracai.vercel.app/images/refir-200ml.webp",
          menuCategoryId: drinksCategory.id,
          restaurantId: restaurant.id,
        },
        {
          name: "Mate Couro 1L",
          description: "Mate Couro 1L.",
          ingredients: [],
          price: 8,
          imageUrl:
            "https://cearaburgueracai.vercel.app/images/mate-couro-1l.webp",
          menuCategoryId: drinksCategory.id,
          restaurantId: restaurant.id,
        },
        {
          name: "Coca-Cola 1L",
          description: "Coca-Cola 1L",
          ingredients: [],
          price: 10,
          imageUrl:
            "https://cearaburgueracai.vercel.app/images/coca-cola-2l.webp",
          menuCategoryId: drinksCategory.id,
          restaurantId: restaurant.id,
        },
        {
          name: "Coca-Cola 2L",
          description: "Coca-Cola 2L",
          ingredients: [],
          price: 15,
          imageUrl:
            "https://cearaburgueracai.vercel.app/images/coca-cola-2l.webp",
          menuCategoryId: drinksCategory.id,
          restaurantId: restaurant.id,
        },
        {
          name: "Guaraná Antarctica 2L",
          description: "Guaraná Antarctica 2L",
          ingredients: [],
          price: 12,
          imageUrl:
            "https://cearaburgueracai.vercel.app/images/guarana-antartica.webp",
          menuCategoryId: drinksCategory.id,
          restaurantId: restaurant.id,
        },
        {
          name: "Fanta Laranja 2L",
          description: "Fanta Laranja 2L",
          ingredients: [],
          price: 10,
          imageUrl:
            "https://cearaburgueracai.vercel.app/images/fanta-laranja.webp",
          menuCategoryId: drinksCategory.id,
          restaurantId: restaurant.id,
        },
        {
          name: "Sukita Laranja 2L",
          description: "Sukita Laranja 2L",
          ingredients: [],
          price: 10,
          imageUrl:
            "https://cearaburgueracai.vercel.app/images/sukita-laranja.webp",
          menuCategoryId: drinksCategory.id,
          restaurantId: restaurant.id,
        },
      ],
    });
  });
};

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prismaClient.$disconnect();
  });
