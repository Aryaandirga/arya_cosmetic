// src/components/sections/Features.tsx
"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "@/lib/gsap";

const features = [
  {
    title: "Electrolyte Boost",
    desc: "Formula mineral seimbang untuk rehidrasi optimal setelah aktivitas intens.",
    icon: "⚡",
    accent: "var(--brand-primary)",
  },
  {
    title: "Zero Sugar",
    desc: "Murni tanpa pemanis buatan. Rasa alami langsung dari sumbernya.",
    icon: "🌿",
    accent: "var(--brand-secondary)",
  },
  {
    title: "pH Balanced",
    desc: "Alkaline pH 8.0 untuk mendukung keseimbangan tubuh sepanjang hari.",
    icon: "💧",
    accent: "var(--brand-tertiary)",
  },
  {
    title: "BPA-Free Packaging",
    desc: "Kemasan ramah lingkungan, aman untuk tubuh dan bumi kita.",
    icon: "♻️",
    accent: "var(--brand-primary)",
  },
  {
    title: "Cold-Pressed Process",
    desc: "Diproses pada suhu rendah agar nutrisi tetap utuh dan optimal.",
    icon: "❄️",
    accent: "var(--brand-secondary)",
  },
  {
    title: "Lab Certified",
    desc: "Setiap batch diuji ketat dengan standar internasional ISO 22000.",
    icon: "🔬",
    accent: "var(--brand-tertiary)",
  },
];

export function Features() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headRef.current?.children ?? [], {
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: headRef.current, start: "top 80%" },
      });
      gsap.from(cardsRef.current?.querySelectorAll(".feature-card") ?? [], {
        y: 70,
        opacity: 0,
        duration: 0.85,
        stagger: { each: 0.09, from: "start" },
        ease: "power3.out",
        scrollTrigger: { trigger: cardsRef.current, start: "top 76%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="features"
      style={{ padding: "6rem 0", background: "var(--brand-neutral)" }}
    >
      {/* Wrapper */}
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 2rem" }}>
        {/* Header */}
        <div ref={headRef} style={{ marginBottom: "4rem", maxWidth: "520px" }}>
          <span
            style={{
              fontSize: "0.7rem",
              letterSpacing: "0.35em",
              color: "#94a3b8",
              textTransform: "uppercase",
              display: "block",
              marginBottom: "1rem",
            }}
          >
            Why Hydralune
          </span>
          <h2
            style={{
              fontSize: "clamp(2.2rem, 4vw, 3.2rem)",
              fontWeight: 800,
              color: "#1e293b",
              lineHeight: 1.1,
              margin: "0 0 1rem",
            }}
          >
            Crafted with
            <br />
            <span style={{ color: "#cbd5e1" }}>intention.</span>
          </h2>
          <p
            style={{
              color: "#64748b",
              fontSize: "1rem",
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            Setiap keputusan dalam produk kami ada alasannya.
          </p>
        </div>

        {/* Cards grid */}
        <div
          ref={cardsRef}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1.25rem",
          }}
        >
          {features.map((f) => (
            <motion.div
              key={f.title}
              className="feature-card"
              style={{
                padding: "2rem",
                borderRadius: "1.5rem",
                background: f.accent,
                border: "1px solid rgba(0,0,0,0.06)",
                cursor: "default",
                position: "relative",
                overflow: "hidden",
              }}
              whileHover={{
                y: -6,
                transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
              }}
            >
              <span style={{ fontSize: "1.75rem" }}>{f.icon}</span>
              <h3
                style={{
                  marginTop: "1.25rem",
                  fontSize: "1.05rem",
                  fontWeight: 700,
                  color: "#1e293b",
                  lineHeight: 1.3,
                }}
              >
                {f.title}
              </h3>
              <p
                style={{
                  marginTop: "0.5rem",
                  color: "#64748b",
                  fontSize: "0.875rem",
                  lineHeight: 1.65,
                }}
              >
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
