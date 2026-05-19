// src/components/ui/ShopModal.tsx
"use client";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { getLenis } from "@/lib/lenis";

const products = [
  {
    id: 1,
    name: "Morning Ritual Set",
    desc: "Gentle Cleanser · Hydrating Serum · Light Moisturizer",
    volume: "3-piece set",
    price: "Rp 450.000",
    image: "/images/collection/morning_ritual.jpg",
    links: {
      shopee: "https://shopee.co.id/yourstore",
      tokopedia: "https://tokopedia.com/yourstore",
      tiktok: "https://tiktok.com/shop/yourstore",
    },
  },
  {
    id: 2,
    name: "Midday Boost Kit",
    desc: "Refreshing Mist · Lightweight Moisturizer",
    volume: "2-piece set",
    price: "Rp 329.000",
    image: "/images/collection/midday_boost.jpg",
    links: {
      shopee: "https://shopee.co.id/yourstore",
      tokopedia: "https://tokopedia.com/yourstore",
      tiktok: "https://tiktok.com/shop/yourstore",
    },
  },
  {
    id: 3,
    name: "Post-Workout Recovery",
    desc: "Deep Hydration · Skin Renewal · Radiant Glow",
    volume: "30ml / 1.01 fl.oz",
    price: "Rp 299.000",
    image: "/images/collection/post_workout.jpg",
    links: {
      shopee: "https://shopee.co.id/yourstore",
      tokopedia: "https://tokopedia.com/yourstore",
      tiktok: "https://tiktok.com/shop/yourstore",
    },
  },
  {
    id: 4,
    name: "Evening Restore Ritual",
    desc: "Nourish + Brighten · Overnight Repair",
    volume: "50ml / 1.69 fl.oz",
    price: "Rp 379.000",
    image: "/images/collection/evening_restore.jpg",
    links: {
      shopee: "https://shopee.co.id/yourstore",
      tokopedia: "https://tokopedia.com/yourstore",
      tiktok: "https://tiktok.com/shop/yourstore",
    },
  },
  {
    id: 5,
    name: "Night Recovery Cream",
    desc: "Intense Repair · Firm + Protect · Deep Moisture",
    volume: "50ml / 1.69 fl.oz",
    price: "Rp 419.000",
    image: "/images/collection/night_recovery.jpg",
    links: {
      shopee: "https://shopee.co.id/yourstore",
      tokopedia: "https://tokopedia.com/yourstore",
      tiktok: "https://tiktok.com/shop/yourstore",
    },
  },
];

const ShopeeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C9.243 2 7 4.243 7 7H5a2 2 0 00-2 2v11a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-2c0-2.757-2.243-5-5-5zm0 2a3 3 0 013 3H9a3 3 0 013-3zm0 8a2 2 0 110 4 2 2 0 010-4z" />
  </svg>
);

const TokopediaIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
  </svg>
);

const TiktokIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.75a4.85 4.85 0 01-1.01-.06z" />
  </svg>
);

interface ShopModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ShopModal({ isOpen, onClose }: ShopModalProps) {
  useEffect(() => {
    const lenis = getLenis();

    if (isOpen) {
      lenis?.stop();
      const scrollY = window.scrollY;
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
    } else {
      lenis?.start();
      const scrollY = document.body.style.top;
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      window.scrollTo(0, parseInt(scrollY || "0") * -1);
    }

    return () => {
      lenis?.start();
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 200,
              background: "rgba(15,23,42,0.55)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
            }}
          />

          {/* Center wrapper */}
          <div
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 201,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "1.5rem",
              pointerEvents: "none",
            }}
          >
            {/* Modal container */}
            <motion.div
              key="modal"
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.98 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{
                width: "100%",
                maxWidth: "960px",
                maxHeight: "85vh",
                background: "var(--brand-neutral)",
                borderRadius: "2rem",
                boxShadow: "0 40px 100px rgba(0,0,0,0.25)",
                pointerEvents: "all",
                overflow: "hidden", // ← clip scrollbar dalam border radius
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Header — tidak ikut scroll */}
              <div
                style={{
                  flexShrink: 0,
                  padding: "2rem 2.5rem 1.25rem",
                  borderBottom: "1px solid rgba(0,0,0,0.06)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  background: "var(--brand-neutral)",
                }}
              >
                <div>
                  <span
                    style={{
                      fontSize: "0.65rem",
                      letterSpacing: "0.3em",
                      color: "#94a3b8",
                      textTransform: "uppercase",
                      display: "block",
                      marginBottom: "0.25rem",
                    }}
                  >
                    Our Products
                  </span>
                  <h2
                    style={{
                      fontSize: "1.6rem",
                      fontWeight: 800,
                      color: "#1e293b",
                      margin: 0,
                      letterSpacing: "-0.03em",
                    }}
                  >
                    Shop Hydralune
                  </h2>
                </div>

                <motion.button
                  onClick={onClose}
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "9999px",
                    border: "1px solid rgba(0,0,0,0.1)",
                    background: "rgba(0,0,0,0.04)",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M2 2l12 12M14 2L2 14"
                      stroke="#64748b"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </motion.button>
              </div>

              {/* Scrollable body — scroll di sini */}
              <div
                className="modal-scroll"
                onWheel={(e) => e.stopPropagation()}
                style={{
                  flex: 1,
                  overflowY: "auto",
                  overscrollBehavior: "contain",
                }}
              >
                <div style={{ padding: "2rem 2.5rem 2.5rem" }}>
                  {/* Product grid */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(3, 1fr)",
                      gap: "1.25rem",
                    }}
                  >
                    {products.map((product, i) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          delay: i * 0.07,
                          duration: 0.5,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        style={{
                          borderRadius: "1.25rem",
                          overflow: "hidden",
                          background: "white",
                          border: "1px solid rgba(0,0,0,0.06)",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        {/* Image */}
                        <div
                          style={{
                            position: "relative",
                            width: "100%",
                            height: "180px",
                            background: "var(--brand-primary)",
                            flexShrink: 0,
                          }}
                        >
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            sizes="30vw"
                            style={{
                              objectFit: "cover",
                              objectPosition: "center",
                            }}
                          />
                        </div>

                        {/* Info */}
                        <div
                          style={{
                            padding: "1rem 1.1rem 1.25rem",
                            flex: 1,
                            display: "flex",
                            flexDirection: "column",
                            gap: "0.35rem",
                          }}
                        >
                          <h3
                            style={{
                              fontSize: "0.9rem",
                              fontWeight: 700,
                              color: "#1e293b",
                              margin: 0,
                              lineHeight: 1.3,
                            }}
                          >
                            {product.name}
                          </h3>
                          <p
                            style={{
                              fontSize: "0.72rem",
                              color: "#94a3b8",
                              margin: 0,
                              lineHeight: 1.5,
                            }}
                          >
                            {product.desc}
                          </p>
                          <p
                            style={{
                              fontSize: "0.68rem",
                              color: "#cbd5e1",
                              margin: 0,
                            }}
                          >
                            {product.volume}
                          </p>
                          <p
                            style={{
                              fontSize: "1rem",
                              fontWeight: 800,
                              color: "#1e293b",
                              margin: "0.25rem 0 0.75rem",
                            }}
                          >
                            {product.price}
                          </p>

                          {/* Platform buttons — horizontal */}
                          <div
                            style={{
                              display: "grid",
                              gridTemplateColumns: "1fr 1fr 1fr",
                              gap: "0.4rem",
                            }}
                          >
                            <motion.a
                              href={product.links.shopee}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "0.25rem",
                                padding: "0.55rem 0.4rem",
                                borderRadius: "0.75rem",
                                background: "#EE4D2D",
                                color: "#fff",
                                fontSize: "0.65rem",
                                fontWeight: 600,
                                textDecoration: "none",
                                whiteSpace: "nowrap",
                              }}
                              whileHover={{ scale: 1.05, opacity: 0.9 }}
                              whileTap={{ scale: 0.96 }}
                              transition={{ duration: 0.15 }}
                            >
                              <ShopeeIcon />
                              Shopee
                            </motion.a>

                            <motion.a
                              href={product.links.tokopedia}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "0.25rem",
                                padding: "0.55rem 0.4rem",
                                borderRadius: "0.75rem",
                                background: "#42B549",
                                color: "#fff",
                                fontSize: "0.65rem",
                                fontWeight: 600,
                                textDecoration: "none",
                                whiteSpace: "nowrap",
                              }}
                              whileHover={{ scale: 1.05, opacity: 0.9 }}
                              whileTap={{ scale: 0.96 }}
                              transition={{ duration: 0.15 }}
                            >
                              <TokopediaIcon />
                              Toped
                            </motion.a>

                            <motion.a
                              href={product.links.tiktok}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "0.25rem",
                                padding: "0.55rem 0.4rem",
                                borderRadius: "0.75rem",
                                background: "#010101",
                                color: "#fff",
                                fontSize: "0.65rem",
                                fontWeight: 600,
                                textDecoration: "none",
                                whiteSpace: "nowrap",
                              }}
                              whileHover={{ scale: 1.05, opacity: 0.85 }}
                              whileTap={{ scale: 0.96 }}
                              transition={{ duration: 0.15 }}
                            >
                              <TiktokIcon />
                              TikTok
                            </motion.a>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Footer note */}
                  <p
                    style={{
                      textAlign: "center",
                      fontSize: "0.72rem",
                      color: "#cbd5e1",
                      marginTop: "2rem",
                      marginBottom: 0,
                    }}
                  >
                    Tersedia di berbagai platform marketplace terpercaya
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
