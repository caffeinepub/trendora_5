import { motion } from "motion/react";

interface ExploreCategoriesProps {
  onCategoryChange: (cat: string | null) => void;
}

const categories = [
  {
    label: "Women",
    value: "women",
    image: "/assets/generated/category-women.dim_300x300.jpg",
    desc: "Elegant essentials",
  },
  {
    label: "Men",
    value: "men",
    image: "/assets/generated/category-men.dim_300x300.jpg",
    desc: "Refined classics",
  },
  {
    label: "Accessories",
    value: "accessories",
    image: "/assets/generated/category-accessories.dim_400x400.jpg",
    desc: "Statement pieces",
  },
];

export function ExploreCategories({
  onCategoryChange,
}: ExploreCategoriesProps) {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-serif text-3xl md:text-4xl text-center tracking-[0.12em] uppercase mb-2"
        >
          Explore Categories
        </motion.h2>
        <p className="text-center text-muted-foreground text-sm tracking-wider mb-12">
          Shop by style
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-10 md:gap-16">
          {categories.map((cat, i) => (
            <motion.button
              type="button"
              key={cat.value}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              onClick={() => onCategoryChange(cat.value)}
              className="flex flex-col items-center gap-4 group"
              data-ocid="category.button"
            >
              <div
                className="w-36 h-36 md:w-44 md:h-44 rounded-full overflow-hidden border-2 transition-all duration-300 group-hover:shadow-lg"
                style={{ borderColor: "oklch(var(--gold))" }}
              >
                <img
                  src={cat.image}
                  alt={cat.label}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="text-center">
                <p className="text-xs tracking-[0.25em] uppercase font-semibold mb-1">
                  {cat.label}
                </p>
                <p className="text-xs text-muted-foreground">{cat.desc}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
