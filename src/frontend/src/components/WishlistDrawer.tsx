import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Heart, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import {
  useAddToCart,
  useToggleWishlist,
  useWishlist,
} from "../hooks/useQueries";

interface WishlistDrawerProps {
  open: boolean;
  onClose: () => void;
}

const FALLBACK_IMAGES = [
  "/assets/generated/product-1.dim_400x500.jpg",
  "/assets/generated/product-2.dim_400x500.jpg",
  "/assets/generated/product-3.dim_400x500.jpg",
  "/assets/generated/product-4.dim_400x500.jpg",
];

export function WishlistDrawer({ open, onClose }: WishlistDrawerProps) {
  const { data: wishlist } = useWishlist();
  const toggleWishlist = useToggleWishlist();
  const addToCart = useAddToCart();

  const handleRemove = (id: bigint, name: string) => {
    toggleWishlist.mutate(id);
    toast.success(`${name} removed from wishlist`);
  };

  const handleMoveToCart = (id: bigint, name: string) => {
    addToCart.mutate(id);
    toast.success(`${name} added to cart`);
  };

  return (
    <Sheet open={open} onOpenChange={(v) => !v && onClose()}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-md flex flex-col p-0"
        data-ocid="wishlist.sheet"
      >
        <SheetHeader className="px-6 py-5 border-b border-border">
          <SheetTitle className="font-serif text-xl tracking-widest uppercase">
            Wishlist
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {(wishlist ?? []).length === 0 ? (
            <div
              className="flex flex-col items-center justify-center h-full gap-4 py-20"
              data-ocid="wishlist.empty_state"
            >
              <Heart size={40} className="text-muted-foreground" />
              <p className="font-serif text-lg">Your wishlist is empty</p>
              <p className="text-sm text-muted-foreground">
                Save pieces you love
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {(wishlist ?? []).map((product, i) => {
                const price =
                  product.isSale && product.salePrice != null
                    ? product.salePrice
                    : product.price;
                const imgSrc =
                  product.imageUrl ||
                  FALLBACK_IMAGES[i % FALLBACK_IMAGES.length];
                return (
                  <div
                    key={product.id.toString()}
                    className="flex gap-4"
                    data-ocid={`wishlist.item.${i + 1}`}
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
                      <p className="text-sm font-semibold mt-1">
                        ${price.toFixed(2)}
                      </p>
                      <button
                        type="button"
                        onClick={() =>
                          handleMoveToCart(product.id, product.name)
                        }
                        className="mt-2 flex items-center gap-1.5 text-xs tracking-wider uppercase font-medium hover:opacity-70 transition-opacity"
                        data-ocid={`wishlist.primary_button.${i + 1}`}
                      >
                        <ShoppingBag size={12} /> Add to Cart
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemove(product.id, product.name)}
                      className="p-1.5 text-muted-foreground hover:text-foreground transition-colors"
                      aria-label="Remove from wishlist"
                      data-ocid={`wishlist.delete_button.${i + 1}`}
                    >
                      <Heart
                        size={16}
                        className="fill-current"
                        style={{ color: "oklch(var(--gold))" }}
                      />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
