import { motion } from "motion/react";

interface HeroSectionProps {
  onShopNow: () => void;
}

export function HeroSection({ onShopNow }: HeroSectionProps) {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ minHeight: "85vh" }}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('/assets/generated/hero-fashion.dim_1400x800.jpg')",
        }}
      />
      {/* Overlay gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, rgba(15,12,10,0.15) 0%, rgba(15,12,10,0.45) 60%, rgba(15,12,10,0.65) 100%)",
        }}
      />

      {/* Content: right-aligned */}
      <div
        className="relative z-10 max-w-[1200px] mx-auto px-6 h-full flex items-center"
        style={{ minHeight: "85vh" }}
      >
        <div className="ml-auto max-w-md text-right">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xs tracking-[0.3em] uppercase mb-4"
            style={{ color: "oklch(var(--gold-light))" }}
          >
            Spring / Summer 2026
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="font-serif text-5xl md:text-6xl lg:text-7xl uppercase leading-tight tracking-wide text-white mb-5"
          >
            Define
            <br />
            Your
            <br />
            Style
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-sm tracking-wider mb-8"
            style={{ color: "rgba(255,255,255,0.8)" }}
          >
            Curated fashion for the modern individual.
            <br />
            Timeless pieces, contemporary edge.
          </motion.p>
          <motion.button
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            onClick={onShopNow}
            className="inline-block px-10 py-3.5 text-xs tracking-[0.25em] uppercase font-medium text-white border transition-all hover:bg-white hover:text-foreground"
            style={{ borderColor: "oklch(var(--gold-light))" }}
            data-ocid="hero.primary_button"
          >
            Shop The Collection
          </motion.button>
        </div>
      </div>
    </section>
  );
}
