// src/components/sections/Hero.tsx
"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { motion } from "framer-motion";
import Image from "next/image";
import { useScrollTo } from "@/hooks/useScrollTo";
import { ShopModal } from "@/components/ui/ShopModal";

export function Hero() {
  const sectionRef   = useRef<HTMLElement>(null);
  const bgTextRef    = useRef<HTMLDivElement>(null);
  const imgWrapRef   = useRef<HTMLDivElement>(null);
  const imgFloatRef  = useRef<HTMLDivElement>(null);
  const leftRef      = useRef<HTMLDivElement>(null);
  const rightRef     = useRef<HTMLDivElement>(null);
  const scrollRef    = useRef<HTMLDivElement>(null);
  const [shopOpen, setShopOpen] = useState(false);
  const { scrollTo } = useScrollTo();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 1.9 });

      tl.fromTo(leftRef.current?.children ?? [],
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.1, ease: "power3.out" },
        "-=0.3",
      )
      .fromTo(rightRef.current?.children ?? [],
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.1, ease: "power3.out" },
        "-=0.7",
      )
      .fromTo(imgWrapRef.current,
        { y: 60, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: "power4.out" },
        "-=0.8",
      )
      .fromTo(scrollRef.current,
        { opacity: 0 }, { opacity: 1, duration: 0.8 }, "-=0.2",
      );

      gsap.to(bgTextRef.current, {
        y: "-15%", ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: 2 },
      });

      gsap.to(imgWrapRef.current, {
        y: 50, ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: 1.5 },
      });

      gsap.to(imgFloatRef.current, {
        y: -16, duration: 3, ease: "sine.inOut", repeat: -1, yoyo: true,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        style={{
          position: "relative",
          minHeight: "100vh",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "var(--brand-neutral)",
        }}
      >
        {/* Ambient blobs */}
        <div style={{ position: "absolute", top: "5%", left: "-5%", width: "45vw", height: "45vw", borderRadius: "9999px", background: "var(--brand-primary)", opacity: 0.5, filter: "blur(100px)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "0%", right: "-5%", width: "40vw", height: "40vw", borderRadius: "9999px", background: "var(--brand-secondary)", opacity: 0.4, filter: "blur(100px)", pointerEvents: "none" }} />

        {/* BG text */}
        <div ref={bgTextRef} style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 0, pointerEvents: "none", userSelect: "none", whiteSpace: "nowrap", fontSize: "clamp(4rem, 18vw, 22rem)", fontWeight: 900, letterSpacing: "-0.04em", color: "transparent", WebkitTextStroke: "1px rgba(0,0,0,0.05)", lineHeight: 1 }}>
          HYDRALUNE
        </div>

        {/* Navbar spacer */}
        <div style={{ height: "80px", flexShrink: 0 }} />

        {/* ── Main grid — satu layout, CSS yang atur breakpoint ── */}
        <div className="hero-outer">
          <div className="hero-grid">

            {/* LEFT */}
            <div ref={leftRef} className="hero-left">
              <h1 className="hero-h1">
                Water<br />
                <span style={{ color: "#94a3b8" }}>that</span><br />
                moves.
              </h1>
              <p className="hero-desc">
                Formula hidrasi premium untuk mendukung performa tubuh dan pikiran sepanjang hari.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
                <motion.button
                  onClick={() => setShopOpen(true)}
                  style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.85rem 1.6rem", borderRadius: "9999px", background: "#1e293b", color: "#fff", fontSize: "0.85rem", fontWeight: 600, border: "none", cursor: "pointer", fontFamily: "var(--font-main)" }}
                  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} transition={{ duration: 0.2 }}
                >
                  Shop Now
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </motion.button>
                <motion.a
                  href="#about"
                  onClick={(e) => { e.preventDefault(); scrollTo("#about"); }}
                  style={{ display: "inline-flex", alignItems: "center", padding: "0.85rem 1.6rem", borderRadius: "9999px", border: "1px solid rgba(0,0,0,0.1)", color: "#475569", fontSize: "0.85rem", fontWeight: 500, textDecoration: "none", background: "rgba(255,255,255,0.5)", backdropFilter: "blur(8px)", cursor: "pointer" }}
                  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} transition={{ duration: 0.2 }}
                >
                  Our Story
                </motion.a>
              </div>
            </div>

            {/* CENTER — image */}
            <div ref={imgWrapRef} className="hero-image" style={{ opacity: 0 }}>
              <div style={{ position: "absolute", inset: "8%", borderRadius: "9999px", background: "radial-gradient(circle, rgba(214,236,255,0.8) 0%, rgba(234,220,248,0.6) 60%, transparent 85%)", filter: "blur(24px)", zIndex: 0 }} />
              <div ref={imgFloatRef} style={{ position: "relative", width: "100%", height: "100%", zIndex: 1 }}>
                <Image
                  src="/images/Hero_section.png"
                  alt="Hydralune product collection"
                  fill priority
                  sizes="(max-width: 640px) 70vw, (max-width: 1024px) 45vw, 30vw"
                  style={{ objectFit: "contain", objectPosition: "center", filter: "drop-shadow(0 24px 48px rgba(150,130,190,0.2))" }}
                />
              </div>
            </div>

            {/* RIGHT */}
            <div ref={rightRef} className="hero-right">
              <span style={{ fontSize: "0.65rem", letterSpacing: "0.3em", color: "#94a3b8", textTransform: "uppercase" }}>Welcome to</span>
              <h2 style={{ fontSize: "clamp(1.4rem, 2.5vw, 2.2rem)", fontWeight: 800, color: "#1e293b", letterSpacing: "-0.02em", margin: 0, lineHeight: 1.1 }}>Hydralune</h2>
              <p style={{ fontSize: "0.9rem", color: "#64748b", lineHeight: 1.75, maxWidth: "280px", margin: 0 }}>
                Di mana keunggulan bertemu dengan kesehatan. Setiap produk kami adalah komitmen untuk tubuh yang lebih baik.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                {["Zero Sugar Formula", "Lab Certified", "500K+ Customers"].map((item) => (
                  <div key={item} style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                    <div style={{ width: "5px", height: "5px", borderRadius: "9999px", background: "#94a3b8", flexShrink: 0 }} />
                    <span style={{ fontSize: "0.85rem", color: "#64748b" }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Scroll indicator */}
        <div ref={scrollRef} style={{ position: "relative", zIndex: 10, marginTop: "2.5rem", marginBottom: "2rem", display: "flex", alignItems: "center", gap: "0.75rem", opacity: 0 }}>
          <motion.div
            style={{ width: "1px", height: "36px", background: "#cbd5e1", originY: 0 }}
            animate={{ scaleY: [0, 1, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
          <span style={{ fontSize: "0.65rem", letterSpacing: "0.35em", color: "#94a3b8", textTransform: "uppercase" }}>Scroll</span>
        </div>
      </section>

      <style>{`
        /* ── Outer wrapper ── */
        .hero-outer {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 1300px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }

        /* ── Desktop: 3-col grid ── */
        .hero-grid {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          grid-template-areas: "left center right";
          gap: 3rem;
          align-items: center;
        }

        .hero-left  {
          grid-area: left;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .hero-image {
          grid-area: center;
          position: relative;
          width: clamp(260px, 30vw, 500px);
          height: clamp(260px, 30vw, 500px);
          flex-shrink: 0;
        }
        .hero-right {
          grid-area: right;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .hero-h1 {
          font-size: clamp(2.4rem, 5vw, 5.5rem);
          font-weight: 900;
          line-height: 1.0;
          letter-spacing: -0.04em;
          color: #1e293b;
          margin: 0;
        }
        .hero-desc {
          font-size: 0.95rem;
          color: #64748b;
          line-height: 1.75;
          max-width: 320px;
          margin: 0;
        }

        /* ── Tablet (768px – 1024px): 2-col, right hilang ── */
        @media (max-width: 1024px) and (min-width: 641px) {
          .hero-grid {
            grid-template-columns: 1fr auto;
            grid-template-areas: "left center";
            gap: 2rem;
          }
          .hero-right { display: none; }
          .hero-image {
            width: clamp(200px, 38vw, 360px);
            height: clamp(200px, 38vw, 360px);
          }
        }

        /* ── Mobile (≤ 640px): stack vertikal, image di atas ── */
        @media (max-width: 640px) {
          .hero-outer {
            padding: 0 1.25rem;
          }
          .hero-grid {
            grid-template-columns: 1fr;
            grid-template-areas:
              "center"
              "left";
            gap: 1.5rem;
            justify-items: center;
          }
          .hero-right { display: none; }
          .hero-image {
            width: clamp(200px, 68vw, 300px);
            height: clamp(200px, 68vw, 300px);
          }
          .hero-left {
            align-items: center;
            text-align: center;
            width: 100%;
          }
          .hero-h1 {
            font-size: clamp(2.6rem, 11vw, 3.5rem);
          }
          .hero-desc {
            max-width: 100%;
            text-align: center;
          }
        }
      `}</style>

      <ShopModal isOpen={shopOpen} onClose={() => setShopOpen(false)} />
    </>
  );
}
