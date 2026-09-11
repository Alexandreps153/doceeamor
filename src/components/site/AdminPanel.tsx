import { useEffect, useState, type ChangeEvent } from "react";
import { ArrowDown, ArrowUp, LockKeyhole, Pencil, Plus, Save, Trash2, X } from "lucide-react";
import { defaultProducts, fetchProducts, saveProductsToCloud, type Product } from "@/lib/products";

const STORAGE_KEY = "doce-e-amor-products";

export function AdminPanel() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [products, setProducts] = useState<Product[]>(defaultProducts);
  const [editing, setEditing] = useState<Product | null>(null);
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setProducts(JSON.parse(stored) as Product[]);
    } catch {
      setProducts(defaultProducts);
    }
    void fetchProducts()
      .then((remoteProducts) => setProducts(remoteProducts))
      .catch(() => undefined);
    const refreshFromAnotherTab = (event: StorageEvent) => {
      if (event.key !== STORAGE_KEY) return;
      try {
        setProducts(event.newValue ? (JSON.parse(event.newValue) as Product[]) : defaultProducts);
      } catch {
        setProducts(defaultProducts);
      }
    };
    window.addEventListener("storage", refreshFromAnotherTab);
    return () => window.removeEventListener("storage", refreshFromAnotherTab);
  }, []);

  useEffect(() => {
    if (!editing) return;
    window.requestAnimationFrame(() => {
      document.getElementById("product-editor")?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    });
  }, [editing]);

  function authenticate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (password === "895232") {
      setAuthenticated(true);
      setMessage("");
    } else {
      setMessage("Senha incorreta.");
    }
  }

  function logout() {
    setAuthenticated(false);
    setPassword("");
    setEditing(null);
  }

  async function saveProducts(nextProducts: Product[]): Promise<boolean> {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextProducts));
      await saveProductsToCloud(nextProducts);
      setProducts(nextProducts);
      window.dispatchEvent(
        new CustomEvent<Product[]>("products-updated", { detail: nextProducts }),
      );
      setMessage("Catálogo salvo com sucesso.");
      return true;
    } catch {
      setMessage("Não foi possível salvar online. Verifique a conexão e tente novamente.");
      return false;
    }
  }

  function handleImageUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file || !editing) return;
    if (!file.type.startsWith("image/")) {
      setMessage("Escolha um arquivo de imagem.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const source = new Image();
      source.onload = () => {
        const maxSize = 1200;
        const scale = Math.min(1, maxSize / Math.max(source.width, source.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.max(1, Math.round(source.width * scale));
        canvas.height = Math.max(1, Math.round(source.height * scale));
        canvas.getContext("2d")?.drawImage(source, 0, 0, canvas.width, canvas.height);
        setEditing((current) =>
          current ? { ...current, image: canvas.toDataURL("image/jpeg", 0.82) } : current,
        );
        setMessage("Foto carregada. Clique em salvar produto.");
      };
      source.onerror = () => {
        setMessage("Não foi possível ler esta foto. Escolha JPG, PNG ou WEBP.");
      };
      source.src = String(reader.result);
    };
    reader.readAsDataURL(file);
    event.target.value = "";
  }

  function moveProduct(index: number, direction: -1 | 1) {
    const nextIndex = index + direction;
    if (nextIndex < 0 || nextIndex >= products.length) return;
    const next = [...products];
    [next[index], next[nextIndex]] = [next[nextIndex]!, next[index]!];
    saveProducts(next);
  }

  function removeProduct(id: string) {
    saveProducts(products.filter((product) => product.id !== id));
  }

  async function saveProduct(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!editing || saving) return;
    const product = editing;
    if (!product.image.trim()) {
      setMessage("Escolha uma foto ou informe uma URL antes de salvar.");
      return;
    }
    const productWasCreated = !products.some((item) => item.id === product.id);
    const exists = products.some((item) => item.id === product.id);
    const nextProducts = exists
      ? products.map((item) => (item.id === product.id ? product : item))
      : [...products, product];
    setSaving(true);
    const saved = await saveProducts(nextProducts);
    setSaving(false);
    if (!saved) return;
    setEditing(null);
    if (productWasCreated) {
      window.history.replaceState(null, "", "#destaques");
      window.setTimeout(() => {
        document.getElementById("destaques")?.scrollIntoView({ behavior: "smooth" });
      }, 50);
    }
  }

  if (!authenticated) {
    return (
      <section id="admin" className="relative px-5 py-20">
        <div className="mx-auto max-w-md rounded-[2rem] border border-white/60 bg-white/45 p-7 text-center shadow-[var(--shadow-petal)] backdrop-blur-xl">
          <LockKeyhole className="mx-auto text-rose-deep" size={24} />
          <p className="eyebrow mt-4 justify-center">Área restrita</p>
          <h2 className="mt-3 font-display text-3xl text-cocoa">Gerenciar catálogo</h2>
          <form onSubmit={authenticate} className="mt-6 flex gap-2">
            <input
              aria-label="Senha administrativa"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Senha de acesso"
              className="min-w-0 flex-1 rounded-full border border-input bg-white/60 px-4 py-3 text-sm outline-none focus:border-rose-deep"
            />
            <button type="submit" className="btn-premium px-5">
              <LockKeyhole size={16} />
            </button>
          </form>
          {message && <p className="mt-3 text-sm font-semibold text-rose-deep">{message}</p>}
        </div>
      </section>
    );
  }

  return (
    <section id="admin" className="relative px-5 py-20">
      <div className="mx-auto max-w-6xl rounded-[2rem] border border-white/70 bg-white/55 p-6 shadow-[var(--shadow-petal)] backdrop-blur-xl sm:p-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Painel Doce e Amor</p>
            <h2 className="mt-2 font-display text-3xl text-cocoa">Produtos e preços</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() =>
                setEditing({
                  id: `produto-${Date.now()}`,
                  name: "",
                  price: "",
                  description: "",
                  image: "",
                })
              }
              className="btn-premium"
            >
              <Plus size={17} /> Novo produto
            </button>
            <button type="button" onClick={logout} className="btn-outline-cocoa">
              Sair
            </button>
          </div>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          Alterações salvas neste navegador e refletidas na vitrine.
        </p>
        {message && <p className="mt-4 text-sm font-bold text-rose-deep">{message}</p>}
        <div className="mt-6 grid gap-3">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="flex flex-wrap items-center gap-3 rounded-2xl border border-white/70 bg-white/55 p-3"
            >
              <img src={product.image} alt="" className="h-14 w-14 rounded-xl object-cover" />
              <div className="min-w-0 flex-1">
                <strong className="block truncate text-sm text-cocoa">
                  {product.name || "Produto sem nome"}
                </strong>
                <span className="text-sm font-bold text-rose-deep">{product.price}</span>
              </div>
              <div className="flex gap-1">
                <button
                  type="button"
                  aria-label="Subir produto"
                  onClick={() => moveProduct(index, -1)}
                  className="icon-button"
                >
                  <ArrowUp size={16} />
                </button>
                <button
                  type="button"
                  aria-label="Descer produto"
                  onClick={() => moveProduct(index, 1)}
                  className="icon-button"
                >
                  <ArrowDown size={16} />
                </button>
                <button
                  type="button"
                  aria-label="Editar produto"
                  onClick={() => setEditing(product)}
                  className="icon-button"
                >
                  <Pencil size={16} />
                </button>
                <button
                  type="button"
                  aria-label="Excluir produto"
                  onClick={() => removeProduct(product.id)}
                  className="icon-button text-rose-deep"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
        {editing && (
          <form
            id="product-editor"
            onSubmit={saveProduct}
            className="mt-6 grid gap-3 rounded-2xl border border-rose/50 bg-rose/20 p-5 sm:grid-cols-2"
          >
            <div className="sm:col-span-2 flex items-center justify-between">
              <h3 className="font-display text-xl text-cocoa">Editar produto</h3>
              <button type="button" aria-label="Fechar edição" onClick={() => setEditing(null)}>
                <X size={20} />
              </button>
            </div>
            {(["name", "price"] as const).map((field) => (
              <input
                key={field}
                required
                value={editing[field]}
                onChange={(event) => setEditing({ ...editing, [field]: event.target.value })}
                placeholder={field === "name" ? "Nome do produto" : "Valor"}
                className="rounded-xl border border-input bg-white/70 px-4 py-3 text-sm outline-none focus:border-rose-deep"
              />
            ))}
            <div className="sm:col-span-2">
              <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-rose-deep/40 bg-white/55 px-4 py-4 text-sm font-bold text-cocoa transition-colors hover:bg-white/80">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="sr-only"
                />
                Escolher foto do celular
              </label>
              <p className="mt-2 text-xs text-muted-foreground">
                A imagem será otimizada automaticamente antes de ser salva.
              </p>
              <input
                value={editing.image.startsWith("data:") ? "" : editing.image}
                onChange={(event) => setEditing({ ...editing, image: event.target.value })}
                placeholder="Ou cole a URL da foto"
                className="mt-3 w-full rounded-xl border border-input bg-white/70 px-4 py-3 text-sm outline-none focus:border-rose-deep"
              />
              {editing.image ? (
                <img
                  src={editing.image}
                  alt="Prévia do produto"
                  className="mt-3 h-32 w-full rounded-xl object-cover shadow-[var(--shadow-soft)]"
                />
              ) : (
                <div className="mt-3 flex h-32 items-center justify-center rounded-xl border border-dashed border-input bg-white/35 text-sm text-muted-foreground">
                  A prévia da foto aparecerá aqui
                </div>
              )}
            </div>
            <textarea
              required
              value={editing.description}
              onChange={(event) => setEditing({ ...editing, description: event.target.value })}
              placeholder="Descrição"
              rows={2}
              className="rounded-xl border border-input bg-white/70 px-4 py-3 text-sm outline-none focus:border-rose-deep sm:col-span-2"
            />
            <button
              type="submit"
              disabled={saving}
              className="btn-premium sm:col-span-2 disabled:opacity-60"
            >
              <Save size={16} /> {saving ? "Salvando..." : "Salvar produto"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
