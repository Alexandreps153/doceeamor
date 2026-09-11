import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { toast } from "sonner";
import { whatsappNumber, type Product } from "@/lib/products";

type CartItem = { product: Product; quantity: number };
type CartContextValue = {
  items: CartItem[];
  itemCount: number;
  addItem: (product: Product) => void;
  changeQuantity: (id: string, amount: number) => void;
  removeItem: (id: string) => void;
  openCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      itemCount: items.reduce((total, item) => total + item.quantity, 0),
      addItem: (product) => {
        setItems((current) => {
          const existing = current.find((item) => item.product.id === product.id);
          if (existing) {
            return current.map((item) =>
              item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
            );
          }
          return [...current, { product, quantity: 1 }];
        });
        setIsOpen(true);
        toast.success(`${product.name} foi adicionado à sacola.`);
      },
      changeQuantity: (id, amount) => {
        setItems((current) =>
          current
            .map((item) =>
              item.product.id === id ? { ...item, quantity: item.quantity + amount } : item,
            )
            .filter((item) => item.quantity > 0),
        );
      },
      removeItem: (id) => setItems((current) => current.filter((item) => item.product.id !== id)),
      openCart: () => setIsOpen(true),
    }),
    [items],
  );

  function finishOrder() {
    const message = [
      "Olá! Gostaria de fazer o pedido, vim pelo site (Pedido do cliente)",
      "",
      ...items.map(({ product, quantity }) => `• ${quantity}x ${product.name} (${product.price})`),
      "",
      "Podem me confirmar disponibilidade e o valor total?",
    ].join("\n");
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank");
  }

  useEffect(() => {
    if (!isOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isOpen]);

  return (
    <CartContext.Provider value={value}>
      {children}
      {isOpen && (
        <>
          <button
            type="button"
            aria-label="Fechar sacola"
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-[60] bg-cocoa/20 backdrop-blur-[2px]"
          />
          <aside
            aria-label="Minha sacola"
            aria-modal="true"
            role="dialog"
            className="fixed inset-y-0 right-0 z-[70] flex w-full max-w-md flex-col bg-cream p-5 shadow-2xl sm:p-7"
          >
            <div className="flex items-center justify-between border-b border-rose/50 pb-5">
              <div>
                <p className="eyebrow">Seu pedido</p>
                <h2 className="mt-1 font-display text-3xl text-cocoa">Minha sacola</h2>
              </div>
              <button
                type="button"
                aria-label="Fechar sacola"
                onClick={() => setIsOpen(false)}
                className="icon-button"
              >
                <X size={20} />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center text-center">
                <ShoppingBag size={38} className="text-rose-deep" />
                <p className="mt-4 font-display text-2xl text-cocoa">Sua sacola está vazia</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Escolha seus doces favoritos no catálogo.
                </p>
              </div>
            ) : (
              <>
                <ul className="flex-1 space-y-4 overflow-y-auto py-6">
                  {items.map(({ product, quantity }) => (
                    <li key={product.id} className="flex gap-3 border-b border-rose/30 pb-4">
                      <img
                        src={product.image}
                        alt=""
                        className="h-16 w-16 rounded-2xl object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex justify-between gap-2">
                          <strong className="text-sm text-cocoa">{product.name}</strong>
                          <button
                            type="button"
                            aria-label={`Remover ${product.name}`}
                            onClick={() => value.removeItem(product.id)}
                            className="text-muted-foreground hover:text-rose-deep"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <span className="mt-1 block text-xs font-bold text-rose-deep">
                          {product.price}
                        </span>
                        <div className="mt-3 flex items-center gap-2">
                          <button
                            type="button"
                            aria-label="Diminuir quantidade"
                            onClick={() => value.changeQuantity(product.id, -1)}
                            className="icon-button h-7 w-7 border border-input"
                          >
                            <Minus size={13} />
                          </button>
                          <span className="w-5 text-center text-sm font-bold text-cocoa">
                            {quantity}
                          </span>
                          <button
                            type="button"
                            aria-label="Aumentar quantidade"
                            onClick={() => value.changeQuantity(product.id, 1)}
                            className="icon-button h-7 w-7 border border-input"
                          >
                            <Plus size={13} />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <button type="button" onClick={finishOrder} className="btn-premium w-full">
                  Finalizar compra no WhatsApp <ShoppingBag size={16} />
                </button>
              </>
            )}
          </aside>
        </>
      )}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart precisa ser usado dentro de CartProvider");
  return context;
}

export function CartButton() {
  const { itemCount, openCart } = useCart();
  return (
    <button
      type="button"
      onClick={openCart}
      className="cart-button"
      aria-label={`Abrir sacola com ${itemCount} itens`}
    >
      <ShoppingBag size={18} />
      <span className="hidden sm:inline">Sacola</span>
      {itemCount > 0 && <b>{itemCount}</b>}
    </button>
  );
}
