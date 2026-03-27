import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "motion/react";
import {
  ProductCategory,
  useAddToCart,
  useProductsByCategory,
  useToggleWishlist,
  useWishlist,
} from "../hooks/useQueries";
import { ProductCard } from "./ProductCard";

interface TrendingNowProps {
  activeCategory: string | null;
  onCategoryChange: (cat: string | null) => void;
}

const categoryTabs = [
  { label: "All", value: null },
  { label: "Women", value: ProductCategory.women },
  { label: "Men", value: ProductCategory.men },
  { label: "Accessories", value: ProductCategory.accessories },
];

export function TrendingNow({
  activeCategory,
  onCategoryChange,
}: TrendingNowProps) {
  const catEnum = activeCategory as ProductCategory | null;
  const { data: products, isLoading } = useProductsByCategory(catEnum);
  const { data: wishlist } = useWishlist();
  const addToCart = useAddToCart();
  const toggleWishlist = useToggleWishlist();

  const wishlistIds = new Set((wishlist ?? []).map((p) => p.id.toString()));

  return (
    <section
      id="trending"
      className="py-16 md:py-20"
      style={{ background: "oklch(var(--background))" }}
    >
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-serif text-3xl md:text-4xl text-center tracking-[0.12em] uppercase mb-4"
        >
          Trending Now
        </motion.h2>
        <p className="text-center text-muted-foreground text-sm tracking-wider mb-8">
          The season&apos;s most coveted styles
        </p>

        {/* Filter tabs */}
        <div
          className="flex items-center justify-center gap-1 mb-10"
          data-ocid="product.tab"
        >
          {categoryTabs.map((tab) => (
            <button
              type="button"
              key={tab.label}
              onClick={() => onCategoryChange(tab.value)}
              className={`px-5 py-2 text-xs tracking-widest uppercase font-medium transition-all ${
                activeCategory === tab.value
                  ? "text-white"
                  : "text-foreground border border-border hover:border-foreground"
              }`}
              style={
                activeCategory === tab.value
                  ? { background: "oklch(var(--foreground))" }
                  : {}
              }
              data-ocid="product.tab"
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        {isLoading ? (
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-5"
            data-ocid="product.loading_state"
          >
            {Array.from({ length: 8 }).map((_, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: skeleton placeholders
              <div key={i}>
                <Skeleton className="w-full" style={{ aspectRatio: "4/5" }} />
                <Skeleton className="h-4 mt-3 w-3/4" />
                <Skeleton className="h-4 mt-2 w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-5"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.07 } },
            }}
          >
            {(products ?? []).slice(0, 8).map((product, i) => (
              <motion.div
                key={product.id.toString()}
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  show: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.5 }}
              >
                <ProductCard
                  product={product}
                  index={i}
                  isWishlisted={wishlistIds.has(product.id.toString())}
                  onAddToCart={(id) => addToCart.mutate(id)}
                  onToggleWishlist={(id) => toggleWishlist.mutate(id)}
                />
              </motion.div>
            ))}
          </motion.div>
        )}

        {!isLoading && (products ?? []).length === 0 && (
          <div
            className="text-center py-16 text-muted-foreground"
            data-ocid="product.empty_state"
          >
            <p className="font-serif text-xl mb-2">No products found</p>
            <p className="text-sm">Try a different category</p>
          </div>
        )}
      </div>
    </section>
  );
}
