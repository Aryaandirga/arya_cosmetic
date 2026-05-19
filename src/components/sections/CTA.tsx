// src/components/sections/CTA.tsx
"use client";
import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import { getLenis } from "@/lib/lenis";
import { ShopModal } from "@/components/ui/ShopModal";
import { useScrollTo } from "@/hooks/useScrollTo";

const WA_NUMBER = process.env.NEXT_PUBLIC_WA_NUMBER ?? "";
const WA_EMAIL = process.env.NEXT_PUBLIC_WA_EMAIL ?? "";

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

const handleScrollTo = (href: string) => {
  const target = document.querySelector(href);
  if (!target) return;
  const lenis = getLenis();
  if (lenis) {
    lenis.scrollTo(target as HTMLElement, {
      offset: -80,
      duration: 1.8,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
  } else {
    target.scrollIntoView({ behavior: "smooth" });
  }
};

type FooterLink = { label: string; href?: string; action?: string };

const footerLinks: Record<string, FooterLink[]> = {
  Product: [
    { label: "Hydralune Original", action: "shop" },
    { label: "Electrolyte+", action: "shop" },
    { label: "Night Formula", action: "shop" },
    { label: "Bundle Pack", action: "shop" },
  ],
  Company: [
    { label: "Our Story", href: "#about" },
    { label: "Press", href: `mailto:${WA_EMAIL}` },
    { label: "Careers", href: `mailto:${WA_EMAIL}` },
    { label: "Sustainability", href: "#about" },
  ],
  Support: [
    { label: "FAQ", href: "#contact" },
    { label: "Shipping", href: `https://wa.me/${WA_NUMBER}` },
    { label: "Returns", href: `https://wa.me/${WA_NUMBER}` },
    { label: "Contact", href: "#contact" },
  ],
};

export function CTA() {
  const [shopOpen, setShopOpen] = useState(false);
  const { scrollTo } = useScrollTo();

  const handleLink = (
    e: React.MouseEvent<HTMLAnchorElement>,
    item: FooterLink,
  ) => {
    if (item.action === "shop") {
      e.preventDefault();
      setShopOpen(true);
      return;
    }
    if (item.href?.startsWith("#")) {
      e.preventDefault();
      scrollTo(item.href);
    }
  };

  return (
    <>
      {/* CTA Section */}
      <section
        style={{
          position: "relative",
          padding: "8rem 0",
          overflow: "hidden",
          background: "var(--brand-primary)",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-20%",
            left: "-10%",
            width: "50vw",
            height: "50vw",
            borderRadius: "9999px",
            opacity: 0.5,
            pointerEvents: "none",
            background: "var(--brand-secondary)",
            filter: "blur(60px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-15%",
            right: "-5%",
            width: "35vw",
            height: "35vw",
            borderRadius: "9999px",
            opacity: 0.4,
            pointerEvents: "none",
            background: "var(--brand-tertiary)",
            filter: "blur(50px)",
          }}
        />

        <motion.div
          style={{
            position: "relative",
            zIndex: 10,
            maxWidth: "700px",
            margin: "0 auto",
            padding: "0 2rem",
            textAlign: "center",
          }}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          <motion.span
            variants={itemVariants}
            style={{
              display: "inline-block",
              fontSize: "0.7rem",
              letterSpacing: "0.4em",
              color: "#94a3b8",
              textTransform: "uppercase",
              marginBottom: "1.5rem",
            }}
          >
            Start Today
          </motion.span>

          <motion.h2
            variants={itemVariants}
            style={{
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              fontWeight: 800,
              color: "#1e293b",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              margin: "0 0 1.5rem",
            }}
          >
            Hydration that
            <br />
            <span style={{ color: "#94a3b8" }}>feels different.</span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            style={{
              color: "#64748b",
              fontSize: "1rem",
              lineHeight: 1.75,
              maxWidth: "400px",
              margin: "0 auto 3rem",
            }}
          >
            Bergabung dengan 500.000+ orang yang sudah merasakan perbedaannya.
            Coba Hydralune hari ini.
          </motion.p>

          <motion.div
            variants={itemVariants}
            style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: "0.75rem",
            }}
          >
            <motion.button
              onClick={() => setShopOpen(true)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.85rem 1.6rem",
                borderRadius: "9999px",
                background: "#1e293b",
                color: "#fff",
                fontSize: "0.85rem",
                fontWeight: 600,
                border: "none",
                cursor: "pointer",
                fontFamily: "var(--font-main)",
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2 }}
            >
              Shop Now
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M2 7h10M8 3l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.button>

            <motion.a
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                handleScrollTo("#about");
              }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "0.875rem 2rem",
                borderRadius: "9999px",
                border: "1px solid rgba(0,0,0,0.12)",
                color: "#475569",
                fontSize: "0.875rem",
                fontWeight: 500,
                textDecoration: "none",
                cursor: "pointer",
              }}
              whileHover={{ scale: 1.04, backgroundColor: "rgba(0,0,0,0.03)" }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2 }}
            >
              Our Story
            </motion.a>
          </motion.div>

          <motion.div
            variants={itemVariants}
            style={{
              marginTop: "4rem",
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: "2.5rem",
            }}
          >
            {[
              "★★★★★ 4.9/5",
              "500K+ Users",
              "12 Countries",
              "Lab Certified",
            ].map((badge) => (
              <span
                key={badge}
                style={{
                  fontSize: "0.7rem",
                  letterSpacing: "0.2em",
                  color: "#94a3b8",
                  textTransform: "uppercase",
                }}
              >
                {badge}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer
        style={{
          padding: "5rem 0 2.5rem",
          borderTop: "1px solid rgba(0,0,0,0.06)",
          background: "var(--brand-neutral)",
        }}
      >
        <div
          style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 2rem" }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.5fr 1fr 1fr 1fr",
              gap: "3rem",
              marginBottom: "4rem",
            }}
          >
            {/* Brand */}
            <div>
              <p
                style={{
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  color: "#1e293b",
                  letterSpacing: "-0.02em",
                  margin: "0 0 0.75rem",
                }}
              >
                hydralune
              </p>
              <p
                style={{
                  fontSize: "0.875rem",
                  color: "#94a3b8",
                  lineHeight: 1.7,
                  maxWidth: "200px",
                  margin: 0,
                }}
              >
                Pure hydration. Crafted with intention. Backed by science.
              </p>
            </div>

            {/* Link columns */}
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <p
                  style={{
                    fontSize: "0.65rem",
                    fontWeight: 600,
                    letterSpacing: "0.25em",
                    color: "#94a3b8",
                    textTransform: "uppercase",
                    margin: "0 0 1.25rem",
                  }}
                >
                  {category}
                </p>
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.75rem",
                  }}
                >
                  {links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href ?? "#"}
                        onClick={(e) => handleLink(e, link)}
                        style={{
                          fontSize: "0.875rem",
                          color: "#64748b",
                          textDecoration: "none",
                          transition: "color 0.2s",
                          cursor: "pointer",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.color = "#1e293b")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.color = "#64748b")
                        }
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom bar */}
          <div
            style={{
              paddingTop: "2rem",
              borderTop: "1px solid rgba(0,0,0,0.06)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            <p style={{ fontSize: "0.75rem", color: "#94a3b8", margin: 0 }}>
              © {new Date().getFullYear()} Hydralune. All rights reserved.
            </p>
            <div style={{ display: "flex", gap: "1.5rem" }}>
              {["Privacy", "Terms", "Cookies"].map((item) => (
                <a
                  key={item}
                  href="#"
                  style={{
                    fontSize: "0.75rem",
                    color: "#94a3b8",
                    textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#1e293b")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "#64748b")
                  }
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      <ShopModal isOpen={shopOpen} onClose={() => setShopOpen(false)} />
    </>
  );
}
