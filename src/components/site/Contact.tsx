import { useState } from "react";
import { Instagram, MessageCircle, Send, Sparkles } from "lucide-react";
import { whatsappNumber } from "@/lib/products";

export function Contact() {
  return (
    <section id="contato" className="relative px-5 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="reveal mx-auto max-w-2xl text-center">
          <p className="eyebrow justify-center">
            <MessageCircle size={13} /> Contato
          </p>
          <h2 className="mt-4 text-3xl leading-tight text-cocoa text-balance-pretty sm:text-5xl">
            Conte o que você quer adoçar
          </h2>
          <p className="mt-4 text-muted-foreground">
            Atendimento online para encomendas especiais, presentes e celebrações.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <form
            className="reveal card-depth p-6 sm:p-8"
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.currentTarget;
              const data = new FormData(form);
              const message = `Olá! Meu nome é ${data.get("nome")}. WhatsApp: ${data.get("telefone")}. Entrega: ${data.get("endereco")}. Pedido: ${data.get("mensagem")}`;
              window.open(
                `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
                "_blank",
              );
              form.reset();
            }}
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field id="nome" label="Seu nome" placeholder="Maria Silva" />
              <Field id="telefone" label="WhatsApp" type="tel" placeholder="(11) 98869-0837" />
            </div>
            <div className="mt-5">
              <Field
                id="endereco"
                label="Endereço para entrega"
                placeholder="Rua, número, bairro e cidade"
              />
            </div>
            <div className="mt-5">
              <label
                htmlFor="mensagem"
                className="text-xs font-extrabold tracking-widest text-muted-foreground uppercase"
              >
                O que você precisa?
              </label>
              <textarea
                id="mensagem"
                name="mensagem"
                required
                rows={5}
                placeholder="Ex: 100 brigadeiros gourmet para dia 20, sabores pistache e maracujá."
                className="mt-2 w-full resize-none rounded-3xl border border-input bg-muted/60 px-4 py-3 text-sm text-cocoa transition-all duration-300 outline-none placeholder:text-muted-foreground/70 focus:border-rose-deep focus:bg-card focus:shadow-[var(--shadow-petal)]"
              />
            </div>
            <button
              type="submit"
              className="btn-premium mt-6 w-full hover:-translate-y-1 hover:brightness-[1.05] disabled:translate-y-0 disabled:opacity-70"
            >
              Enviar pedido pelo WhatsApp
              <Send size={16} />
            </button>
          </form>

          <div className="reveal grid gap-4" style={{ transitionDelay: "120ms" }}>
            <a
              href="https://wa.me/5511988690837"
              className="card-depth group flex items-center gap-4 p-5 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary text-cocoa transition-transform duration-500 group-hover:scale-110">
                <MessageCircle size={20} />
              </span>
              <span>
                <strong className="block text-sm text-cocoa">WhatsApp</strong>
                <span className="text-xs text-muted-foreground">
                  (11) 98869-0837 — atendimento online
                </span>
              </span>
            </a>

            <a
              href="https://instagram.com/docee.amor9"
              className="card-depth group flex items-center gap-4 p-5 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary text-cocoa transition-transform duration-500 group-hover:scale-110">
                <Instagram size={20} />
              </span>
              <span>
                <strong className="block text-sm text-cocoa">Instagram</strong>
                <span className="text-xs text-muted-foreground">
                  @docee.amor9 — novidades e encomendas
                </span>
              </span>
            </a>

            <div className="card-depth flex items-center gap-4 p-5">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary text-cocoa">
                <Sparkles size={20} />
              </span>
              <span>
                <strong className="block text-sm text-cocoa">Horários</strong>
                <span className="text-xs text-muted-foreground">
                  Segunda a sábado · atendimento por mensagem
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  id,
  label,
  type = "text",
  placeholder,
}: {
  id: string;
  label: string;
  type?: string;
  placeholder: string;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="text-xs font-extrabold tracking-widest text-muted-foreground uppercase"
      >
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required
        placeholder={placeholder}
        className="mt-2 w-full rounded-full border border-input bg-muted/60 px-4 py-3 text-sm text-cocoa transition-all duration-300 outline-none placeholder:text-muted-foreground/70 focus:border-rose-deep focus:bg-card focus:shadow-[var(--shadow-petal)]"
      />
    </div>
  );
}
