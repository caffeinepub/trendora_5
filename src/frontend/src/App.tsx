import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { CartDrawer } from "./components/CartDrawer";
import { ExploreCategories } from "./components/ExploreCategories";
import { FeaturedCollections } from "./components/FeaturedCollections";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { PromoBar } from "./components/PromoBar";
import { TrendingNow } from "./components/TrendingNow";
import { WishlistDrawer } from "./components/WishlistDrawer";

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 30_000 } },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TrendoraApp />
    </QueryClientProvider>
  );
}

function TrendoraApp() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);

  const handleCategoryChange = (cat: string | null) => {
    setActiveCategory(cat);
    if (cat !== null) {
      // Scroll to trending section
      setTimeout(() => {
        document
          .getElementById("trending")
          ?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <PromoBar />
      <Header
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
        onCartOpen={() => setCartOpen(true)}
        onWishlistOpen={() => setWishlistOpen(true)}
      />
      <main className="flex-1">
        <HeroSection onShopNow={() => handleCategoryChange(null)} />
        <FeaturedCollections
          onWomens={() => handleCategoryChange("women")}
          onMens={() => handleCategoryChange("men")}
        />
        <TrendingNow
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
        <ExploreCategories onCategoryChange={handleCategoryChange} />
      </main>
      <Footer />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      <WishlistDrawer
        open={wishlistOpen}
        onClose={() => setWishlistOpen(false)}
      />
      <Toaster position="bottom-right" />
    </div>
  );
}
