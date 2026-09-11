import { useEffect, useState } from "react";
import { Cake, Gift, HeartHandshake, Leaf, Sparkle, Star } from "lucide-react";
import brigadeiros from "@/assets/brigadeiros.jpg";
import bolos from "@/assets/bolos.jpg";
import cupcakes from "@/assets/cupcakes.jpg";
import fitness from "@/assets/fitness.jpg";
import kits from "@/assets/kits.jpg";
import macarons from "@/assets/macarons.jpg";
import semAcucar from "@/assets/sem-acucar.jpg";
import { defaultProducts, fetchProducts, getStoredProducts, type Product } from "@/lib/products";
import { useCart } from "./Cart";

/* ---------------- Sobre ---------------- */

export function About() {
  return (
    <section id="sobre" className="relative px-5 py-24 sm:py-32">
      <div className="mx-auto max-w-4xl">
        <div className="reveal text-center">
          <p className="eyebrow">
            <Sparkle size={13} /> Sobre nós
          </p>
          <h2 className="mt-4 text-3xl leading-tight text-cocoa text-balance-pretty sm:text-5xl">
            Uma doceria feita de tempo, mão cheia e carinho
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            A Doce e Amor nasceu numa cozinha pequena, com um caderno de receitas manuscrito e a
            certeza de que doce bom não tem pressa. Batemos tudo em pequenos lotes, escolhemos
            chocolate belga, frutas da estação e manteiga de verdade — sem pré-mistura, sem atalho.
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Hoje somos o docinho de aniversários, pedidos de casamento e terças-feiras comuns que
            merecem algo especial. E também de quem quer se cuidar: temos linha fitness e sem açúcar
            com o mesmo sabor de sempre.
          </p>

          <ul className="mt-10 grid gap-3 text-left sm:grid-cols-2">
            {[
              {
                icon: HeartHandshake,
                t: "Feito sob encomenda",
                d: "Cada pedido sai fresco no dia.",
              },
              { icon: Leaf, d: "Sem corante e sem conservantes.", t: "Ingredientes limpos" },
              { icon: Cake, t: "Pequenos lotes", d: "Ponto e textura no controle." },
              { icon: Gift, t: "Embalagem afetiva", d: "Pronta para presentear." },
            ].map(({ icon: Icon, t, d }) => (
              <li
                key={t}
                className="card-depth group flex gap-3 p-4 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-secondary text-cocoa transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                  <Icon size={18} />
                </span>
                <span>
                  <strong className="block text-sm text-cocoa">{t}</strong>
                  <span className="text-xs text-muted-foreground">{d}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Especialidades ---------------- */

function useCatalogProducts() {
  const [products, setProducts] = useState<Product[]>(defaultProducts);

  useEffect(() => {
    const refresh = () => {
      void fetchProducts()
        .then(setProducts)
        .catch(() => setProducts(getStoredProducts()));
    };
    const refreshFromEvent = (event: Event) => {
      const detail = (event as CustomEvent<Product[]>).detail;
      setProducts(Array.isArray(detail) ? detail : getStoredProducts());
    };
    refresh();
    window.addEventListener("products-updated", refreshFromEvent);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener("products-updated", refreshFromEvent);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  return products;
}

export function Sweets() {
  const products = useCatalogProducts();

  return (
    <section id="doces" className="relative px-5 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="reveal mx-auto max-w-2xl text-center">
          <p className="eyebrow justify-center">
            <Sparkle size={13} /> Nossas especialidades
          </p>
          <h2 className="mt-4 text-3xl leading-tight text-cocoa text-balance-pretty sm:text-5xl">
            Pequenos luxos para adoçar o seu momento
          </h2>
          <p className="mt-4 text-muted-foreground">
            Morangos, chocolate e recheios generosos feitos sob encomenda.
          </p>
        </div>

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product, i) => (
            <li
              key={product.id}
              className="reveal product-card card-depth group relative overflow-hidden hover:shadow-[var(--shadow-lift)]"
              data-reveal="image"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="product-media relative aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
                <span className="absolute right-3 bottom-3 rounded-full bg-white/80 px-3 py-1 text-xs font-extrabold text-rose-deep backdrop-blur">
                  {product.price}
                </span>
              </div>
              <div className="p-4">
                <h3 className="text-lg leading-tight text-cocoa">{product.name}</h3>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  {product.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------------- Catálogo ---------------- */

export function Featured() {
  const products = useCatalogProducts();
  const { addItem } = useCart();

  return (
    <section id="destaques" className="relative px-5 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="reveal flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <p className="eyebrow">
              <Star size={13} /> Catálogo artesanal
            </p>
            <h2 className="mt-4 text-3xl leading-tight text-cocoa sm:text-5xl">
              Catálogo Artesanal
            </h2>
          </div>
          <a
            href="https://wa.me/5511988690837"
            className="btn-outline-cocoa hover:-translate-y-1 hover:bg-white/70"
          >
            Falar com a gente
          </a>
        </div>

        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p, i) => (
            <li
              key={p.id}
              className="reveal product-card card-depth group overflow-hidden hover:shadow-[var(--shadow-lift)]"
              data-reveal="image"
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              <div className="product-media relative aspect-4/3 overflow-hidden">
                <img
                  src={p.image}
                  alt={p.name}
                  width={1024}
                  height={1024}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
                <span className="glass absolute top-3 left-3 rounded-full px-3 py-1 text-[0.65rem] font-extrabold tracking-widest text-cocoa uppercase">
                  Feito sob encomenda
                </span>
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-linear-to-t from-cocoa/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg leading-tight text-cocoa">{p.name}</h3>
                  <span className="shrink-0 text-sm font-extrabold text-rose-deep">{p.price}</span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {p.description}
                </p>
                <button
                  type="button"
                  onClick={() => addItem(p)}
                  className="btn-premium mt-5 w-full text-sm hover:-translate-y-1"
                >
                  Adicionar à sacola <Sparkle size={15} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------------- Galeria (masonry) ---------------- */

const gallery = [
  { img: bolos, alt: "Bolo artesanal com frutas vermelhas", w: 1024, h: 1280 },
  { img: brigadeiros, alt: "Brigadeiros gourmet em mármore rosa", w: 1024, h: 1024 },
  { img: macarons, alt: "Macarons pastel empilhados", w: 1024, h: 1280 },
  { img: cupcakes, alt: "Fileira de cupcakes com cobertura rosa", w: 1024, h: 1024 },
  { img: kits, alt: "Mesa de festa com doces variados", w: 1280, h: 1024 },
  { img: semAcucar, alt: "Bombons sem açúcar", w: 1024, h: 1024 },
  { img: fitness, alt: "Doces fitness em prato de cerâmica", w: 1024, h: 1024 },
];

export function Gallery() {
  return (
    <section id="galeria" className="relative px-5 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="reveal mx-auto max-w-2xl text-center">
          <p className="eyebrow justify-center">
            <Sparkle size={13} /> Galeria
          </p>
          <h2 className="mt-4 text-3xl leading-tight text-cocoa sm:text-5xl">
            Detalhes que despertam desejo
          </h2>
        </div>

        <div className="mt-14 columns-2 gap-4 lg:columns-3 [&>*]:mb-4">
          {gallery.map((g, i) => (
            <figure
              key={i}
              className="reveal group relative break-inside-avoid overflow-hidden rounded-3xl shadow-[var(--shadow-petal)]"
              style={{ transitionDelay: `${(i % 4) * 80}ms` }}
            >
              <img
                src={g.img}
                alt={g.alt}
                width={g.w}
                height={g.h}
                loading="lazy"
                className="w-full object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.12]"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-linear-to-tr from-rose/50 via-transparent to-white/50 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
