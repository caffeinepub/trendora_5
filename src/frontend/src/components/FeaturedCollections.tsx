import { motion } from "motion/react";

interface FeaturedCollectionsProps {
  onWomens: () => void;
  onMens: () => void;
}

export function FeaturedCollections({
  onWomens,
  onMens,
}: FeaturedCollectionsProps) {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-serif text-3xl md:text-4xl text-center tracking-[0.12em] uppercase mb-12"
        >
          Featured Collections
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Women's */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative overflow-hidden group cursor-pointer"
            style={{ minHeight: "420px" }}
            onClick={onWomens}
            data-ocid="featured.card"
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{
                backgroundImage:
                  "url('/assets/generated/collection-women.dim_700x500.jpg')",
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(15,12,10,0.72) 0%, rgba(15,12,10,0.2) 60%, transparent 100%)",
              }}
            />
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white text-center">
              <p
                className="text-xs tracking-[0.3em] uppercase mb-2"
                style={{ color: "oklch(var(--gold-light))" }}
              >
                Curated For Her
              </p>
              <h3 className="font-serif text-3xl uppercase tracking-wider mb-5">
                Women&apos;s Edit
              </h3>
              <button
                type="button"
                className="px-8 py-2.5 text-xs tracking-[0.2em] uppercase border text-white transition-all hover:bg-white hover:text-foreground"
                style={{ borderColor: "oklch(var(--gold-light))" }}
                data-ocid="featured.primary_button"
              >
                Shop Now
              </button>
            </div>
          </motion.div>

          {/* Men's */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative overflow-hidden group cursor-pointer"
            style={{ minHeight: "420px" }}
            onClick={onMens}
            data-ocid="featured.card"
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{
                backgroundImage:
                  "url('/assets/generated/collection-men.dim_700x500.jpg')",
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(15,12,10,0.72) 0%, rgba(15,12,10,0.2) 60%, transparent 100%)",
              }}
            />
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white text-center">
              <p
                className="text-xs tracking-[0.3em] uppercase mb-2"
                style={{ color: "oklch(var(--gold-light))" }}
              >
                Crafted For Him
              </p>
              <h3 className="font-serif text-3xl uppercase tracking-wider mb-5">
                Men&apos;s Essentials
              </h3>
              <button
                type="button"
                className="px-8 py-2.5 text-xs tracking-[0.2em] uppercase border text-white transition-all hover:bg-white hover:text-foreground"
                style={{ borderColor: "oklch(var(--gold-light))" }}
                data-ocid="featured.primary_button"
              >
                Shop Now
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
