import brigadeiro from "@/assets/doces/brigadeiro.svg";
import boloVulcao from "@/assets/doces/bolo-vulcao.svg";
import coneTrufado from "@/assets/doces/cone-trufado.svg";
import coxinhaMorango from "@/assets/doces/coxinha-morango.svg";
import morangoAmor from "@/assets/doces/morango-amor.svg";
import morangoCravejado from "@/assets/doces/morango-cravejado.svg";
import paoDeMel from "@/assets/doces/pao-de-mel.svg";
import quindim from "@/assets/doces/quindim.svg";
import surpresaMorangoUva from "@/assets/doces/surpresa-morango-uva.svg";
import legacyBrigadeiros from "@/assets/brigadeiros.jpg";
import legacyBolos from "@/assets/bolos.jpg";
import legacyCupcakes from "@/assets/cupcakes.jpg";
import legacyKits from "@/assets/kits.jpg";
import legacyMacarons from "@/assets/macarons.jpg";

export type Product = {
  id: string;
  name: string;
  price: string;
  description: string;
  image: string;
};

export const defaultProducts: Product[] = [
  {
    id: "coxinha-morango",
    name: "Coxinha de Morango",
    price: "R$ 10,00",
    description: "Morangos frescos envolvidos em brigadeiro cremoso.",
    image: coxinhaMorango,
  },
  {
    id: "surpresa-morango-uva",
    name: "Surpresa de Morango/Uva",
    price: "R$ 10,00",
    description: "Duas frutas, uma casquinha delicada e muito recheio.",
    image: surpresaMorangoUva,
  },
  {
    id: "cone-branco-leite",
    name: "Cone Trufado (Chocolate Branco ou ao Leite)",
    price: "R$ 10,00",
    description: "Cone crocante recheado com chocolate à sua escolha.",
    image: paoDeMel,
  },
  {
    id: "cone-nutella",
    name: "Cone Trufado com Nutella",
    price: "R$ 12,00",
    description: "A combinação cremosa que nunca passa despercebida.",
    image: coneTrufado,
  },
  {
    id: "mini-bolo-vulcao",
    name: "Mini Bolo Vulcão",
    price: "A partir de R$ 20,00",
    description: "Bolo macio com uma avalanche de recheio.",
    image: boloVulcao,
  },
  {
    id: "cento-docinhos",
    name: "Cento de Docinhos",
    price: "A partir de R$ 110,00",
    description: "Docinhos gourmet para deixar sua comemoração inesquecível.",
    image: brigadeiro,
  },
  {
    id: "morango-amor",
    name: "Morango do Amor",
    price: "R$ 13,00",
    description: "Morango inteiro, brigadeiro e uma casquinha brilhante.",
    image: morangoAmor,
  },
  {
    id: "morango-cravejado",
    name: "Morango Cravejado",
    price: "R$ 15,00",
    description: "Morangos selecionados finalizados com chocolate e textura.",
    image: morangoCravejado,
  },
];

export const whatsappNumber = "5511988690837";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const STORAGE_KEY = "doce-e-amor-products";

function supabaseHeaders() {
  return {
    apikey: supabaseKey,
    Authorization: `Bearer ${supabaseKey}`,
    "Content-Type": "application/json",
  };
}

const legacyImages = new Set([
  legacyBrigadeiros,
  legacyBolos,
  legacyCupcakes,
  legacyKits,
  legacyMacarons,
]);

function normalizeProducts(products: Product[]) {
  const defaultsById = new Map(defaultProducts.map((product) => [product.id, product.image]));
  return products.map((product) =>
    legacyImages.has(product.image)
      ? { ...product, image: defaultsById.get(product.id) ?? product.image }
      : product,
  );
}

export async function fetchProducts(): Promise<Product[]> {
  if (!supabaseUrl || !supabaseKey) return getStoredProducts();
  const response = await fetch(`${supabaseUrl}/rest/v1/products?select=*&order=position.asc`, {
    headers: supabaseHeaders(),
  });
  if (!response.ok) throw new Error("Não foi possível carregar o catálogo.");
  const products = (await response.json()) as Product[];
  return products.length ? normalizeProducts(products) : getStoredProducts();
}

export async function saveProductsToCloud(products: Product[]) {
  if (!supabaseUrl || !supabaseKey) return;
  const currentResponse = await fetch(`${supabaseUrl}/rest/v1/products?select=id`, {
    headers: supabaseHeaders(),
  });
  if (!currentResponse.ok) throw new Error("Não foi possível consultar o catálogo online.");
  const currentProducts = (await currentResponse.json()) as Array<{ id: string }>;
  const nextIds = new Set(products.map((product) => product.id));
  await Promise.all(
    currentProducts
      .filter(({ id }) => !nextIds.has(id))
      .map(({ id }) =>
        fetch(`${supabaseUrl}/rest/v1/products?id=eq.${encodeURIComponent(id)}`, {
          method: "DELETE",
          headers: supabaseHeaders(),
        }).then((response) => {
          if (!response.ok) throw new Error("Não foi possível remover o produto online.");
        }),
      ),
  );
  const response = await fetch(`${supabaseUrl}/rest/v1/products?on_conflict=id`, {
    method: "POST",
    headers: { ...supabaseHeaders(), Prefer: "resolution=merge-duplicates" },
    body: JSON.stringify(products.map((product, position) => ({ ...product, position }))),
  });
  if (!response.ok) throw new Error("Não foi possível salvar o catálogo online.");
}

export function getStoredProducts(): Product[] {
  if (typeof window === "undefined") return defaultProducts;
  try {
    const stored = window.localStorage.getItem("doce-e-amor-products");
    return stored ? normalizeProducts(JSON.parse(stored) as Product[]) : defaultProducts;
  } catch {
    return defaultProducts;
  }
}

export function productWhatsappUrl(productName: string) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Olá! Quero encomendar: ${productName}.`)}`;
}
