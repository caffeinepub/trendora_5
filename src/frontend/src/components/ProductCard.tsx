import { Heart, ShoppingBag, Star } from "lucide-react";
import { toast } from "sonner";
import type { Product } from "../backend.d";

interface ProductCardProps {
  product: Product;
  index: number;
  isWishlisted: boolean;
  onAddToCart: (id: bigint) => void;
  onToggleWishlist: (id: bigint) => void;
}

const FALLBACK_IMAGES = [
  "/assets/generated/product-1.dim_400x500.jpg",
  "/assets/generated/product-2.dim_400x500.jpg",
  "/assets/generated/product-3.dim_400x500.jpg",
  "/assets/generated/product-4.dim_400x500.jpg",
];

export function ProductCard({
  product,
  index,
  isWishlisted,
  onAddToCart,
  onToggleWishlist,
}: ProductCardProps) {
  const imgSrc =
    product.imageUrl || FALLBACK_IMAGES[index % FALLBACK_IMAGES.length];
  const displayPrice =
    product.isSale && product.salePrice != null
      ? product.salePrice
      : product.price;

  const handleAddToCart = () => {
    onAddToCart(product.id);
    toast.success(`${product.name} added to cart`);
  };

  const handleToggleWishlist = () => {
    onToggleWishlist(product.id);
  };

  return (
    <div
      className="group relative bg-card border border-border"
      data-ocid={`product.item.${index + 1}`}
    >
      {/* Badge */}
      {(product.isNew || product.isSale) && (
        <div
          className="absolute top-3 left-3 z-10 px-2.5 py-1 text-[10px] tracking-widest uppercase font-semibold text-white"
          style={{
            background: product.isSale
              ? "oklch(0.55 0.2 27)"
              : "oklch(var(--foreground))",
          }}
        >
          {product.isSale ? "Sale" : "New"}
        </div>
      )}

      {/* Wishlist button */}
      <button
        type="button"
        className="absolute top-3 right-3 z-10 p-1.5 bg-white/90 hover:bg-white transition-colors"
        onClick={handleToggleWishlist}
        aria-label="Toggle wishlist"
        data-ocid={`product.toggle.${index + 1}`}
      >
        <Heart
          size={16}
          className={isWishlisted ? "fill-current" : ""}
          style={{
            color: isWishlisted
              ? "oklch(var(--gold))"
              : "oklch(var(--foreground))",
          }}
        />
      </button>

      {/* Image */}
      <div className="overflow-hidden" style={{ aspectRatio: "4/5" }}>
        <img
          src={imgSrc}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* Add to cart overlay */}
      <div className="absolute bottom-16 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 px-4">
        <button
          type="button"
          onClick={handleAddToCart}
          className="w-full py-2.5 text-xs tracking-widest uppercase font-medium text-white flex items-center justify-center gap-2"
          style={{ background: "oklch(var(--foreground))" }}
          data-ocid={`product.primary_button.${index + 1}`}
        >
          <ShoppingBag size={14} />
          Add to Cart
        </button>
      </div>

      {/* Info */}
      <div className="p-4">
        <p className="text-xs tracking-widest uppercase text-muted-foreground mb-1">
          {product.category}
        </p>
        <p className="font-medium text-sm mb-2 truncate">{product.name}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {product.isSale && product.salePrice != null ? (
              <>
                <span
                  className="font-semibold text-sm"
                  style={{ color: "oklch(0.55 0.2 27)" }}
                >
                  ${product.salePrice.toFixed(2)}
                </span>
                <span className="text-xs text-muted-foreground line-through">
                  ${product.price.toFixed(2)}
                </span>
              </>
            ) : (
              <span className="font-semibold text-sm">
                ${displayPrice.toFixed(2)}
              </span>
            )}
          </div>
          {/* Stars */}
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={`star-${product.id.toString()}-${i}`}
                size={11}
                className={i < Math.round(product.rating) ? "fill-current" : ""}
                style={{ color: "oklch(var(--gold))" }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
