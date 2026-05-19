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
  const [isMobile, setIsMobile] = useState(false);
  const lastY = useRef(0);
  const [shopOpen, setShopOpen] = useState(false);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (!target) return;
    setMenuOpen(false);
    setTimeout(
      () => {
        const lenis = getLenis();
        if (lenis) {
          lenis.scrollTo(target as HTMLElement, {
            offset: -80,
            duration: 1.8,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          });
        } else {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      },
      menuOpen ? 400 : 0,
    );
  };

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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
    return () => { document.body.style.overflow = ""; };
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
          padding: "1rem 1.25rem",
        }}
      >
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0.65rem 1.25rem",
            borderRadius: "9999px",
            background: scrolled ? "rgba(255,248,245,0.92)" : "transparent",
            backdropFilter: scrolled ? "blur(16px)" : "none",
            border: scrolled ? "1px solid rgba(0,0,0,0.07)" : "1px solid transparent",
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
              zIndex: 1,
            }}
          >
            hydralune
          </Link>

          {/* Desktop nav links — hidden on mobile */}
          {!isMobile && (
            <ul
              style={{
                display: "flex",
                alignItems: "center",
                gap: "2rem",
                listStyle: "none",
                margin: 0,
                padding: 0,
              }}
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
                      whiteSpace: "nowrap",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#1e293b")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#64748b")}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          )}

          {/* Right side */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              flexShrink: 0,
            }}
          >
            {/* Shop Now — desktop only */}
            {!isMobile && (
              <motion.button
                onClick={() => setShopOpen(true)}
                style={{
                  display: "inline-flex",
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
                  fontFamily: "var(--font-main)",
                }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2 }}
              >
                Shop Now
              </motion.button>
            )}

            {/* Hamburger — mobile only */}
            {isMobile && (
              <button
                onClick={() => setMenuOpen((v) => !v)}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "5px",
                  width: "38px",
                  height: "38px",
                  borderRadius: "10px",
                  background: scrolled ? "rgba(0,0,0,0.06)" : "rgba(0,0,0,0.05)",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  flexShrink: 0,
                }}
                aria-label="Toggle menu"
              >
                <motion.span
                  animate={menuOpen ? { rotate: 45, y: 6.5 } : { rotate: 0, y: 0 }}
                  style={{
                    display: "block",
                    width: "18px",
                    height: "1.5px",
                    background: "#1e293b",
                    borderRadius: "2px",
                  }}
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                  style={{
                    display: "block",
                    width: "18px",
                    height: "1.5px",
                    background: "#1e293b",
                    borderRadius: "2px",
                  }}
                  transition={{ duration: 0.2 }}
                />
                <motion.span
                  animate={menuOpen ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 }}
                  style={{
                    display: "block",
                    width: "18px",
                    height: "1.5px",
                    background: "#1e293b",
                    borderRadius: "2px",
                  }}
                  transition={{ duration: 0.3 }}
                />
              </button>
            )}
          </div>
        </div>
      </motion.div>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 99,
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
                padding: "0 2rem",
                margin: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "1.75rem",
                width: "100%",
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
                      fontSize: "clamp(2rem, 9vw, 3rem)",
                      fontWeight: 700,
                      color: "#1e293b",
                      textDecoration: "none",
                      display: "block",
                      lineHeight: 1,
                      cursor: "pointer",
                      transition: "color 0.2s",
                      textAlign: "center",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#94a3b8")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#1e293b")}
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}

              {/* Shop Now button */}
              <motion.li
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: navLinks.length * 0.06 + 0.15 }}
              >
                <motion.button
                  onClick={() => { setMenuOpen(false); setShopOpen(true); }}
                  style={{
                    marginTop: "0.5rem",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.875rem 2.5rem",
                    borderRadius: "9999px",
                    background: "#1e293b",
                    color: "#fff",
                    fontWeight: 600,
                    fontSize: "0.9rem",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "var(--font-main)",
                  }}
                  whileTap={{ scale: 0.97 }}
                >
                  Shop Now
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </motion.button>
              </motion.li>
            </ul>

            {/* Bottom brand mark */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              style={{
                position: "absolute",
                bottom: "2rem",
                fontSize: "0.65rem",
                letterSpacing: "0.3em",
                color: "#cbd5e1",
                textTransform: "uppercase",
              }}
            >
              hydralune · pure hydration
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      <ShopModal isOpen={shopOpen} onClose={() => setShopOpen(false)} />
    </>
  );
}
