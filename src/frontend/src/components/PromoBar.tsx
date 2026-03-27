import { useEffect, useState } from "react";

const messages = [
  "✦ Free Shipping on Orders Over $75 ✦",
  "✦ Shop New Arrivals — Fresh Styles Just Landed ✦",
  "✦ Up to 40% Off Sale Items — Limited Time ✦",
];

export function PromoBar() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIdx((i) => (i + 1) % messages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="w-full text-center py-2.5 px-4 text-xs tracking-widest font-medium"
      style={{
        background: "oklch(var(--promo-bar))",
        color: "oklch(0.95 0.005 80)",
      }}
    >
      {messages[idx]}
    </div>
  );
}
