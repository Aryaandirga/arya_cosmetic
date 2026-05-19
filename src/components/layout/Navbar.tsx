// src/components/layout/Navbar.tsx
"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { motion, AnimatePresence } from "framer-motion";
import { getLenis } from "@/lib/lenis";
import Link from "next/link";
import { ShopModal } from "@/components/ui/ShopModal";

const navLinks = [
  { label: "Story", href: "#about" },
  { label: "Product", href: "#features" },
  { label: "Journey", href: "#timeline" },
  { label: "Collection", href: "#collection" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const navRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastY = useRef(0);
  const [shopOpen, setShopOpen] = useState(false);

  // ✅ Smooth scroll handler pakai Lenis
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();

    const target = document.querySelector(href);
    if (!target) return;

    // Tutup mobile menu dulu kalau terbuka
    setMenuOpen(false);

    // Delay sedikit kalau menu mobile baru ditutup
    setTimeout(
      () => {
        const lenis = getLenis();
        if (lenis) {
          lenis.scrollTo(target as HTMLElement, {
            offset: -80, // offset untuk navbar height
            duration: 1.8,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          });
        } else {
          // Fallback kalau Lenis belum ready
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      },
      menuOpen ? 400 : 0,
    );
  };

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", delay: 2.2 },
    );

    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setHidden(y > lastY.current && y > 100);
      lastY.current = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <motion.div
        ref={navRef}
        animate={{ y: hidden && !menuOpen ? -100 : 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          opacity: 0,
          padding: "1rem 1.5rem",
        }}
      >
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0.75rem 1.5rem",
            borderRadius: "9999px",
            background: scrolled ? "rgba(255,248,245,0.92)" : "transparent",
            backdropFilter: scrolled ? "blur(16px)" : "none",
            border: scrolled
              ? "1px solid rgba(0,0,0,0.07)"
              : "1px solid transparent",
            boxShadow: scrolled ? "0 2px 24px rgba(0,0,0,0.06)" : "none",
            transition: "all 0.3s ease",
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            style={{
              fontSize: "1rem",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              color: "#1e293b",
              textDecoration: "none",
              flexShrink: 0,
            }}
          >
            hydralune
          </Link>

          {/* Desktop links */}
          <ul
            style={{
              display: "flex",
              alignItems: "center",
              gap: "2rem",
              listStyle: "none",
              margin: 0,
              padding: 0,
            }}
            className="hidden md:flex"
          >
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  style={{
                    fontSize: "0.85rem",
                    color: "#64748b",
                    fontWeight: 500,
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

          {/* Right */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              flexShrink: 0,
            }}
          >
            <motion.button
              onClick={() => setShopOpen(true)}
              className="hidden md:inline-flex"
              style={{
                alignItems: "center",
                padding: "0.5rem 1.25rem",
                borderRadius: "9999px",
                background: "#1e293b",
                color: "#fff",
                fontSize: "0.8rem",
                fontWeight: 500,
                border: "none",
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2 }}
            >
              Shop Now
            </motion.button>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="md:hidden"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "5px",
                width: "36px",
                height: "36px",
                borderRadius: "10px",
                background: "rgba(0,0,0,0.05)",
                border: "none",
                cursor: "pointer",
                padding: 0,
              }}
              aria-label="Toggle menu"
            >
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                style={{
                  display: "block",
                  width: "16px",
                  height: "1.5px",
                  background: "#1e293b",
                  borderRadius: "2px",
                }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                style={{
                  display: "block",
                  width: "16px",
                  height: "1.5px",
                  background: "#1e293b",
                  borderRadius: "2px",
                }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                animate={
                  menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }
                }
                style={{
                  display: "block",
                  width: "16px",
                  height: "1.5px",
                  background: "#1e293b",
                  borderRadius: "2px",
                }}
                transition={{ duration: 0.3 }}
              />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-99 md:hidden"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              background: "var(--brand-neutral)",
            }}
          >
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "1.5rem",
              }}
            >
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.label}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  transition={{
                    delay: i * 0.06 + 0.1,
                    duration: 0.45,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    style={{
                      fontSize: "clamp(2rem, 10vw, 3rem)",
                      fontWeight: 700,
                      color: "#1e293b",
                      textDecoration: "none",
                      display: "block",
                      lineHeight: 1,
                      cursor: "pointer",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "#94a3b8")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "#1e293b")
                    }
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: navLinks.length * 0.06 + 0.15 }}
              >
                <a
                  href="#shop"
                  onClick={(e) => handleNavClick(e, "#shop")}
                  style={{
                    marginTop: "1rem",
                    display: "inline-flex",
                    padding: "0.875rem 2rem",
                    borderRadius: "9999px",
                    background: "#1e293b",
                    color: "#fff",
                    fontWeight: 500,
                    fontSize: "0.875rem",
                    textDecoration: "none",
                    cursor: "pointer",
                  }}
                >
                  Shop Now
                </a>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
      <ShopModal isOpen={shopOpen} onClose={() => setShopOpen(false)} />
    </>
  );
}
