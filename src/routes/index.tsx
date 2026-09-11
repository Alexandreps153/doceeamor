import { createFileRoute } from "@tanstack/react-router";
import { FallingSweets } from "@/components/FallingSweets";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { About, Featured } from "@/components/site/Sections";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";
import { AdminPanel } from "@/components/site/AdminPanel";
import { useReveal } from "@/components/site/useReveal";
import { CartProvider } from "@/components/site/Cart";

const title = "Doce e Amor · Doces artesanais por encomenda";
const description =
  "Morangos, cones trufados, brigadeiros e doces gourmet feitos sob encomenda pela Doce e Amor.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Bakery",
  name: "Doce e Amor",
  description,
  servesCuisine: "Confeitaria artesanal",
  telephone: "+55 11 98869-0837",
  openingHours: "Mo-Sa 09:00-19:00",
};

function Index() {
  useReveal();

  return (
    <CartProvider>
      <div className="relative min-h-screen overflow-x-hidden">
        <FallingSweets />
        <Nav />
        <main className="relative z-10">
          <Hero />
          <About />
          <Featured />
          <Contact />
          <AdminPanel />
        </main>
        <div className="relative z-10">
          <Footer />
        </div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </div>
    </CartProvider>
  );
}
