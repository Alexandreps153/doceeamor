import { Heart, Instagram, MessageCircle } from "lucide-react";

const logo = "/logo-doce-e-amor.png";

export function Footer() {
  return (
    <footer className="relative mt-8 bg-cocoa-gradient px-5 py-14 text-cream">
      <div className="mx-auto grid max-w-6xl gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2">
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="Doce e Amor"
              width={56}
              height={56}
              loading="lazy"
              className="h-14 w-14 rounded-full object-cover"
            />
            <span className="font-display text-2xl">Doce e Amor</span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed opacity-80">
            Doces artesanais feitos sob encomenda, com acabamento delicado e sabor de verdade.
          </p>
          <div className="mt-6 flex gap-3">
            <a
              href="https://wa.me/5511988690837"
              aria-label="WhatsApp da Doce e Amor"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/25 transition-all duration-300 hover:-translate-y-1 hover:bg-cream/15"
            >
              <MessageCircle size={18} />
            </a>
            <a
              href="https://instagram.com/docee.amor9"
              aria-label="Instagram da Doce e Amor"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/25 transition-all duration-300 hover:-translate-y-1 hover:bg-cream/15"
            >
              <Instagram size={18} />
            </a>
          </div>
        </div>

        <nav aria-label="Seções do site">
          <h3 className="text-sm tracking-widest uppercase opacity-70">Site</h3>
          <ul className="mt-4 grid gap-2 text-sm">
            {[
              ["#sobre", "Sobre nós"],
              ["#destaques", "Produtos"],
            ].map(([href, label]) => (
              <li key={href}>
                <a href={href} className="opacity-80 transition-opacity hover:opacity-100">
                  {label}
                </a>
              </li>
            ))}
            <li>
              <a href="#admin" className="opacity-60 transition-opacity hover:opacity-100">
                Área administrativa
              </a>
            </li>
          </ul>
        </nav>

        <div>
          <h3 className="text-sm tracking-widest uppercase opacity-70">Contato</h3>
          <ul className="mt-4 grid gap-2 text-sm opacity-80">
            <li>(11) 98869-0837</li>
            <li>@docee.amor9</li>
            <li>Atendimento online</li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-6xl flex-wrap items-center justify-between gap-3 border-t border-cream/15 pt-6 text-xs opacity-70">
        <p>© {new Date().getFullYear()} Doce e Amor. Todos os direitos reservados.</p>
        <p className="inline-flex items-center gap-1.5">
          Feito com <Heart size={12} fill="currentColor" strokeWidth={0} /> e muito chocolate
        </p>
      </div>
      <p className="mt-5 text-center text-xs font-semibold tracking-wide opacity-70">
        Desenvolvido por Lopes Designer
      </p>
    </footer>
  );
}
