import { Heart, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { useState } from "react";
import { useCart, useWishlist } from "../hooks/useQueries";

interface HeaderProps {
  activeCategory: string | null;
  onCategoryChange: (cat: string | null) => void;
  onCartOpen: () => void;
  onWishlistOpen: () => void;
}

const navLinks = [
  { label: "Women", cat: "women" },
  { label: "Men", cat: "men" },
  { label: "Accessories", cat: "accessories" },
  { label: "Collections", cat: null },
  { label: "New Arrivals", cat: null },
  { label: "Sale", cat: null },
];

export function Header({
  onCartOpen,
  onWishlistOpen,
  onCategoryChange,
  activeCategory,
}: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { data: cart } = useCart();
  const { data: wishlist } = useWishlist();

  const cartCount = cart?.length ?? 0;
  const wishlistCount = wishlist?.length ?? 0;

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border shadow-xs">
      <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
        {/* Wordmark */}
        <button
          type="button"
          className="font-serif text-2xl tracking-[0.25em] uppercase font-bold"
          style={{ color: "oklch(var(--gold))" }}
          data-ocid="nav.link"
          onClick={() => onCategoryChange(null)}
        >
          TRENDORA
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <button
              type="button"
              key={link.label}
              onClick={() => link.cat && onCategoryChange(link.cat)}
              className={`text-xs tracking-widest uppercase font-medium transition-colors hover:text-gold ${
                activeCategory === link.cat && link.cat
                  ? "text-gold border-b border-gold"
                  : "text-foreground"
              }`}
              style={
                activeCategory === link.cat && link.cat
                  ? { color: "oklch(var(--gold))" }
                  : {}
              }
              data-ocid="nav.link"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Icons */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            className="p-1.5 hover:opacity-70 transition-opacity"
            aria-label="Search"
            data-ocid="nav.button"
          >
            <Search size={18} />
          </button>
          <button
            type="button"
            className="p-1.5 hover:opacity-70 transition-opacity"
            aria-label="Account"
            data-ocid="nav.button"
          >
            <User size={18} />
          </button>
          <button
            type="button"
            className="p-1.5 hover:opacity-70 transition-opacity relative"
            aria-label="Wishlist"
            onClick={onWishlistOpen}
            data-ocid="nav.button"
          >
            <Heart size={18} />
            {wishlistCount > 0 && (
              <span
                className="absolute -top-1 -right-1 text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold text-white"
                style={{ background: "oklch(var(--gold))" }}
              >
                {wishlistCount}
              </span>
            )}
          </button>
          <button
            type="button"
            className="p-1.5 hover:opacity-70 transition-opacity relative"
            aria-label="Cart"
            onClick={onCartOpen}
            data-ocid="nav.button"
          >
            <ShoppingBag size={18} />
            {cartCount > 0 && (
              <span
                className="absolute -top-1 -right-1 text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold text-white"
                style={{ background: "oklch(var(--gold))" }}
              >
                {cartCount}
              </span>
            )}
          </button>
          <button
            type="button"
            className="md:hidden p-1.5"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
            data-ocid="nav.button"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-white px-6 pb-4">
          {navLinks.map((link) => (
            <button
              type="button"
              key={link.label}
              className="block w-full text-left py-3 text-xs tracking-widest uppercase font-medium border-b border-border last:border-0 hover:opacity-70"
              onClick={() => {
                if (link.cat) onCategoryChange(link.cat);
                setMobileOpen(false);
              }}
              data-ocid="nav.link"
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
