import { useEffect, useRef, useState } from "react";
import { ArrowRight, Heart } from "lucide-react";
import cupcakes from "@/assets/cupcakes.jpg";
import kits from "@/assets/kits.jpg";

const logo = "/logo-doce-e-amor.png";

const PHRASE = "Feito com amor, pra adoçar seu dia.";

function useTyping(text: string, delay = 1200) {
  const [shown, setShown] = useState("");
  useEffect(() => {
    let i = 0;
    let interval: ReturnType<typeof setInterval>;
    const start = setTimeout(() => {
      interval = setInterval(() => {
        i += 1;
        setShown(text.slice(0, i));
        if (i >= text.length) clearInterval(interval);
      }, 52);
    }, delay);
    return () => {
      clearTimeout(start);
      clearInterval(interval);
    };
  }, [text, delay]);
  return shown;
}

export function Hero() {
  const typed = useTyping(PHRASE);
  const heroVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = heroVideoRef.current;
    if (!video) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (
          reduceMotion.matches ||
          document.visibilityState !== "visible" ||
          !entry.isIntersecting
        ) {
          video.pause();
          return;
        }
        void video.play().catch(() => undefined);
      },
      { threshold: 0.1 },
    );
    const syncPlayback = () => {
      if (reduceMotion.matches) video.pause();
      else if (document.visibilityState === "visible") void video.play().catch(() => undefined);
    };
    visibilityObserver.observe(video);
    reduceMotion.addEventListener("change", syncPlayback);
    document.addEventListener("visibilitychange", syncPlayback);
    return () => {
      visibilityObserver.disconnect();
      reduceMotion.removeEventListener("change", syncPlayback);
      document.removeEventListener("visibilitychange", syncPlayback);
    };
  }, []);

  return (
    <section
      id="home"
      className="hero-section relative flex min-h-screen items-center overflow-hidden px-5 pt-28 pb-16 lg:pt-32"
    >
      <div
        aria-hidden="true"
        className="animate-glow-pulse absolute top-1/4 left-1/2 h-[46rem] w-[46rem] -translate-x-1/2 rounded-full bg-white/60 blur-[120px]"
      />
      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="max-w-xl text-center lg:text-left">
          <p className="eyebrow animate-rise" style={{ animationDelay: "0.2s" }}>
            <Heart size={13} fill="currentColor" /> Doceria artesanal · São Paulo
          </p>
          <h1
            className="reveal mt-6 text-5xl leading-[0.98] text-cocoa text-balance-pretty sm:text-7xl"
            data-reveal="subtle"
          >
            Um carinho que
            <span className="block text-rose-deep">chega em forma de doce.</span>
          </h1>
          <p
            className="reveal mt-6 min-h-[1.75rem] max-w-lg text-base font-semibold leading-relaxed tracking-wide text-muted-foreground sm:text-lg"
            data-reveal="subtle"
            style={{ transitionDelay: "120ms" }}
          >
            {typed}
            <span
              aria-hidden="true"
              className="ml-0.5 text-rose-deep"
              style={{ animation: "caret 1s step-end infinite" }}
            >
              |
            </span>
          </p>
          <div
            className="animate-rise mt-9 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
            style={{ animationDelay: "1s" }}
          >
            <a
              href="https://wa.me/5511988690837?text=Ol%C3%A1!%20Quero%20conhecer%20os%20produtos%20da%20Doce%20e%20Amor."
              target="_blank"
              rel="noreferrer"
              className="btn-premium group hover:-translate-y-1 hover:brightness-[1.05]"
            >
              Pedir pelo WhatsApp{" "}
              <ArrowRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
            <a
              href="#destaques"
              className="btn-outline-cocoa hover:-translate-y-1 hover:bg-white/70"
            >
              Ver o catálogo
            </a>
          </div>
          <div
            className="reveal mt-10 flex items-center justify-center gap-6 text-left lg:justify-start"
            data-reveal="subtle"
            style={{ transitionDelay: "1.12s" }}
          >
            <span>
              <strong className="block font-display text-2xl text-cocoa">100%</strong>
              <small className="text-xs font-bold text-muted-foreground">artesanal</small>
            </span>
            <span className="h-9 w-px bg-caramel/35" />
            <span>
              <strong className="block font-display text-2xl text-cocoa">+ carinho</strong>
              <small className="text-xs font-bold text-muted-foreground">em cada detalhe</small>
            </span>
          </div>
        </div>

        <div
          className="reveal hero-gallery relative mx-auto w-full max-w-[38rem]"
          data-reveal="image"
          style={{ transitionDelay: "280ms" }}
        >
          <div className="hero-image-main overflow-hidden rounded-[2.5rem] shadow-[var(--shadow-lift)]">
            <video
              ref={heroVideoRef}
              aria-label="Vídeo de doces artesanais da Doce e Amor"
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              onCanPlay={(event) => {
                if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
                  void event.currentTarget.play().catch(() => undefined);
                }
              }}
              className="h-[24rem] w-full object-cover sm:h-[32rem]"
            >
              <source src="/hero-product.mp4" type="video/mp4" />
            </video>
          </div>
          <div className="hero-image-small absolute -bottom-7 -left-4 w-36 overflow-hidden rounded-3xl border-8 border-cream shadow-[var(--shadow-lift)] sm:-left-8 sm:w-48">
            <img
              src={cupcakes}
              alt="Cupcakes artesanais"
              width={1024}
              height={1024}
              className="aspect-[0.82] w-full object-cover"
            />
          </div>
          <div className="hero-video-card absolute -right-3 -bottom-8 w-28 overflow-hidden rounded-3xl border-8 border-cream shadow-[var(--shadow-lift)] sm:-right-8 sm:w-36">
            <img
              src={kits}
              alt="Kit de doces artesanais"
              width={1280}
              height={1024}
              className="aspect-[0.82] w-full object-cover"
            />
          </div>
          <div className="glass absolute -top-5 right-4 rounded-2xl px-4 py-3 sm:right-8">
            <span className="block text-[0.65rem] font-extrabold tracking-[0.2em] text-rose-deep uppercase">
              feito à mão
            </span>
            <span className="font-display text-lg text-cocoa">com amor</span>
          </div>
        </div>
      </div>
    </section>
  );
}
