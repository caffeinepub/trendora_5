import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ShoppingBag, Trash2 } from "lucide-react";
import { toast } from "sonner";
import type { Product } from "../backend.d";
import { useCart, useClearCart, useRemoveFromCart } from "../hooks/useQueries";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

const FALLBACK_IMAGES = [
  "/assets/generated/product-1.dim_400x500.jpg",
  "/assets/generated/product-2.dim_400x500.jpg",
  "/assets/generated/product-3.dim_400x500.jpg",
  "/assets/generated/product-4.dim_400x500.jpg",
];

function getPrice(product: Product): number {
  return product.isSale && product.salePrice != null
    ? product.salePrice
    : product.price;
}

export function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { data: cartItems } = useCart();
  const removeFromCart = useRemoveFromCart();
  const clearCart = useClearCart();

  const total = (cartItems ?? []).reduce((acc, [product, qty]) => {
    return acc + getPrice(product) * Number(qty);
  }, 0);

  const handleRemove = (id: bigint, name: string) => {
    removeFromCart.mutate(id);
    toast.success(`${name} removed from cart`);
  };

  const handleClear = () => {
    clearCart.mutate();
    toast.success("Cart cleared");
  };

  return (
    <Sheet open={open} onOpenChange={(v) => !v && onClose()}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-md flex flex-col p-0"
        data-ocid="cart.sheet"
      >
        <SheetHeader className="px-6 py-5 border-b border-border">
          <SheetTitle className="font-serif text-xl tracking-widest uppercase">
            Your Cart
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {(cartItems ?? []).length === 0 ? (
            <div
              className="flex flex-col items-center justify-center h-full gap-4 py-20"
              data-ocid="cart.empty_state"
            >
              <ShoppingBag size={40} className="text-muted-foreground" />
              <p className="font-serif text-lg">Your cart is empty</p>
              <p className="text-sm text-muted-foreground">
                Add some pieces to get started
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {(cartItems ?? []).map(([product, qty], i) => {
                const price = getPrice(product);
                const imgSrc =
                  product.imageUrl ||
                  FALLBACK_IMAGES[i % FALLBACK_IMAGES.length];
                return (
                  <div
                    key={product.id.toString()}
                    className="flex gap-4"
                    data-ocid={`cart.item.${i + 1}`}
                  >
                    <img
                      src={imgSrc}
                      alt={product.name}
                      className="w-20 h-24 object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">
                        {product.name}
                      </p>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mt-0.5">
                        {product.category}
                      </p>
                      <p className="text-sm font-semibold mt-2">
                        ${price.toFixed(2)} &times; {Number(qty)}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemove(product.id, product.name)}
                      className="p-1.5 text-muted-foreground hover:text-foreground transition-colors flex-shrink-0"
                      aria-label="Remove"
                      data-ocid={`cart.delete_button.${i + 1}`}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {(cartItems ?? []).length > 0 && (
          <div className="border-t border-border px-6 py-5">
            <Separator className="mb-4" />
            <div className="flex justify-between mb-5">
              <span className="text-sm uppercase tracking-wider">Total</span>
              <span className="font-semibold">${total.toFixed(2)}</span>
            </div>
            <Button
              className="w-full mb-2 rounded-none text-xs tracking-widest uppercase py-6"
              style={{
                background: "oklch(var(--foreground))",
                color: "oklch(var(--background))",
              }}
              data-ocid="cart.primary_button"
            >
              Checkout
            </Button>
            <button
              type="button"
              onClick={handleClear}
              className="w-full text-xs text-muted-foreground hover:text-foreground tracking-wider uppercase text-center py-2 transition-colors"
              data-ocid="cart.delete_button"
            >
              Clear Cart
            </button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
