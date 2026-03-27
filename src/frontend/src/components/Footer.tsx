import { Input } from "@/components/ui/input";
import { useState } from "react";
import { SiFacebook, SiInstagram, SiPinterest, SiX } from "react-icons/si";
import { toast } from "sonner";

const socialLinks = [
  { icon: SiInstagram, label: "Instagram", href: "https://instagram.com" },
  { icon: SiFacebook, label: "Facebook", href: "https://facebook.com" },
  { icon: SiX, label: "X", href: "https://x.com" },
  { icon: SiPinterest, label: "Pinterest", href: "https://pinterest.com" },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "trendora";

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    toast.success("Thank you for subscribing!");
    setEmail("");
  };

  return (
    <footer
      style={{
        background: "oklch(var(--footer-bg))",
        color: "oklch(0.88 0.008 80)",
      }}
    >
      <div className="max-w-[1200px] mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <h3
              className="font-serif text-xl tracking-[0.25em] uppercase mb-3"
              style={{ color: "oklch(var(--gold))" }}
            >
              TRENDORA
            </h3>
            <p
              className="text-xs leading-relaxed"
              style={{ color: "oklch(0.65 0.008 80)" }}
            >
              Premium fashion curated for the discerning individual. Timeless
              style, contemporary edge.
            </p>
            <div className="mt-5 mb-2">
              <p
                className="text-xs tracking-widest uppercase"
                style={{ color: "oklch(var(--gold))" }}
              >
                Follow Us
              </p>
            </div>
            <div className="flex gap-3">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="hover:opacity-70 transition-opacity"
                  data-ocid="footer.link"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Shop links */}
          <div>
            <h4
              className="text-xs tracking-[0.25em] uppercase font-semibold mb-4"
              style={{ color: "oklch(var(--gold))" }}
            >
              Shop
            </h4>
            <ul className="space-y-2.5">
              {[
                "Women",
                "Men",
                "Accessories",
                "New Arrivals",
                "Sale",
                "Collections",
              ].map((item) => (
                <li key={item}>
                  <span
                    className="text-xs cursor-pointer hover:opacity-70 transition-opacity"
                    style={{ color: "oklch(0.65 0.008 80)" }}
                    data-ocid="footer.link"
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Help links */}
          <div>
            <h4
              className="text-xs tracking-[0.25em] uppercase font-semibold mb-4"
              style={{ color: "oklch(var(--gold))" }}
            >
              Help
            </h4>
            <ul className="space-y-2.5">
              {[
                "Shipping & Returns",
                "Size Guide",
                "Track Order",
                "FAQ",
                "Contact Us",
                "Store Locator",
              ].map((item) => (
                <li key={item}>
                  <span
                    className="text-xs cursor-pointer hover:opacity-70 transition-opacity"
                    style={{ color: "oklch(0.65 0.008 80)" }}
                    data-ocid="footer.link"
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4
              className="text-xs tracking-[0.25em] uppercase font-semibold mb-4"
              style={{ color: "oklch(var(--gold))" }}
            >
              Newsletter
            </h4>
            <p
              className="text-xs mb-4"
              style={{ color: "oklch(0.65 0.008 80)" }}
            >
              Subscribe for exclusive offers and the latest arrivals.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
              <Input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-none text-xs bg-transparent border-border placeholder:text-muted-foreground"
                style={{
                  borderColor: "oklch(0.3 0.005 30)",
                  color: "oklch(0.88 0.008 80)",
                }}
                data-ocid="newsletter.input"
              />
              <button
                type="submit"
                className="py-2.5 text-xs tracking-widest uppercase font-medium transition-opacity hover:opacity-80"
                style={{
                  background: "oklch(var(--gold))",
                  color: "oklch(0.13 0.008 30)",
                }}
                data-ocid="newsletter.submit_button"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: "1px solid oklch(0.25 0.005 30)" }}>
        <div className="max-w-[1200px] mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs" style={{ color: "oklch(0.5 0.005 80)" }}>
            &copy; {year}.{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
            >
              Built with love using caffeine.ai
            </a>
          </p>
          <div className="flex gap-4">
            {["Privacy Policy", "Terms of Use", "Cookie Policy"].map((item) => (
              <span
                key={item}
                className="text-xs cursor-pointer hover:opacity-70 transition-opacity"
                style={{ color: "oklch(0.5 0.005 80)" }}
                data-ocid="footer.link"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
