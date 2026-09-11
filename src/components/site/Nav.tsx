import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { CartButton } from "./Cart";

const logo = "/logo-doce-e-amor.png";

const links = [
  { href: "#sobre", label: "Sobre" },
  { href: "#destaques", label: "Produtos" },
  { href: "#contato", label: "Contato" },
  { href: "#admin", label: "Admin" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <nav
        aria-label="Navegação principal"
        className={`nav-shell mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-full px-4 py-2.5 transition-all duration-500 sm:px-5 ${
          scrolled ? "glass mx-3" : "mx-3 border border-transparent"
        }`}
      >
        <a href="#home" className="flex items-center gap-3">
          <img
            src={logo}
            alt="Doce e Amor"
            width={48}
            height={48}
            className="h-11 w-11 rounded-full object-cover shadow-[var(--shadow-soft)]"
          />
          <span className="font-display text-lg leading-none text-cocoa">Doce e Amor</span>
        </a>

        <ul className="nav-links hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="relative rounded-full px-3.5 py-2 text-sm font-semibold text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/55 hover:text-cocoa after:absolute after:inset-x-3.5 after:-bottom-0.5 after:h-0.5 after:origin-left after:scale-x-0 after:rounded-full after:bg-rose-deep after:transition-transform after:duration-300 hover:after:scale-x-100"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <CartButton />
          <a
            href="https://wa.me/5511988690837"
            className="btn-premium hidden hover:-translate-y-0.5 hover:brightness-[1.04] sm:inline-flex"
            style={{ padding: "0.65rem 1.35rem" }}
          >
            Pedir agora
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            className="glass flex h-11 w-11 items-center justify-center rounded-full text-cocoa lg:hidden"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="glass mx-3 mt-2 animate-rise rounded-3xl p-3 lg:hidden">
          <ul className="grid gap-1">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-2xl px-4 py-3 text-sm font-semibold text-cocoa transition-colors hover:bg-secondary/60"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
