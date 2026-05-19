// src/components/sections/ParallaxGallery.tsx
"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { motion } from "framer-motion";
import Image from "next/image";

const galleryItems: {
  id: number;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  width: string;
  height: string;
  speed: number;
  delay: number;
  image: string;
}[] = [
  { id: 1, top: "2%",  left: "5%",  width: "36%", height: "52%", speed: 0.4,  delay: 0,    image: "/images/gallery/parallax1.jpg" },
  { id: 2, top: "2%",  left: "39%", width: "28%", height: "44%", speed: 0.6,  delay: 0.05, image: "/images/gallery/parallax4.jpg" },
  { id: 3, top: "10%", right: "2%", width: "30%", height: "48%", speed: 0.7,  delay: 0.08, image: "/images/gallery/parallax2.jpg" },
  { id: 4, top: "50%", left: "10%", width: "26%", height: "46%", speed: 0.25, delay: 0.12, image: "/images/gallery/parallax3.jpg" },
  { id: 5, top: "48%", right: "8%", width: "30%", height: "50%", speed: 0.45, delay: 0.1,  image: "/images/gallery/parallax5.jpg" },
];

const mobileImages = [
  { src: "/images/gallery/parallax1.jpg", label: "Pure" },
  { src: "/images/gallery/parallax2.jpg", label: "Clear" },
  { src: "/images/gallery/parallax3.jpg", label: "Alive" },
  { src: "/images/gallery/parallax4.jpg", label: "Fresh" },
  { src: "/images/gallery/parallax5.jpg", label: "Glow" },
];

export function ParallaxGallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        },
      );

      gsap.to(titleRef.current, {
        y: -120, ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top", end: "bottom top", scrub: 1.5,
        },
      });

      itemsRef.current.forEach((item, i) => {
        gsap.fromTo(
          item,
          { y: 80, opacity: 0, scale: 0.96 },
          {
            y: 0, opacity: 1, scale: 1, duration: 1.1, ease: "power3.out",
            delay: galleryItems[i].delay,
            scrollTrigger: { trigger: sectionRef.current, start: "top 60%" },
          },
        );
        gsap.to(item, {
          y: () => -(galleryItems[i].speed * 120), ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom", end: "bottom top", scrub: 1.5,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="parallax"
      style={{ background: "var(--brand-tertiary)" }}
    >
      {/* ── DESKTOP: parallax sticky ── */}
      <div
        className="parallax-desktop"
        style={{ position: "relative", height: "110vh", overflow: "hidden" }}
      >
        <div
          style={{
            position: "sticky", top: 0, height: "100vh", overflow: "hidden",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >
          {/* Ambient bg */}
          <div style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(ellipse 70% 60% at 50% 50%, var(--brand-primary) 0%, var(--brand-tertiary) 60%, transparent 100%)",
            opacity: 0.6, pointerEvents: "none",
          }} />

          {/* Title */}
          <div
            ref={titleRef}
            style={{
              position: "absolute", top: "50%", left: "50%",
              transform: "translate(-50%, -50%)", zIndex: 10,
              textAlign: "center", pointerEvents: "none", opacity: 0,
            }}
          >
            <span style={{ fontSize: "0.7rem", letterSpacing: "0.35em", color: "#64748b", textTransform: "uppercase", display: "block", marginBottom: "0.75rem" }}>
              The Collection
            </span>
            <h2 style={{ fontSize: "clamp(2.5rem, 5vw, 5rem)", fontWeight: 900, color: "#1e293b", letterSpacing: "-0.04em", lineHeight: 1, margin: 0 }}>
              Pure.<br /><span style={{ color: "#94a3b8" }}>Clear.</span><br />Alive.
            </h2>
          </div>

          {/* Gallery items */}
          {galleryItems.map((item, i) => (
            <div
              key={item.id}
              ref={(el) => { if (el) itemsRef.current[i] = el; }}
              style={{
                position: "absolute",
                top: item.top ?? "auto", left: item.left ?? "auto",
                right: item.right ?? "auto", bottom: item.bottom ?? "auto",
                width: item.width, height: item.height,
                borderRadius: "1.5rem", opacity: 0,
                border: "1px solid rgba(255,255,255,0.5)",
                boxShadow: "0 8px 40px rgba(0,0,0,0.08)", overflow: "hidden",
              } as React.CSSProperties}
            >
              <Image src={item.image} alt={`Gallery ${item.id}`} fill sizes="30vw" style={{ objectFit: "cover", objectPosition: "center" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 60%)", pointerEvents: "none", zIndex: 1 }} />
            </div>
          ))}
        </div>
      </div>

      {/* ── MOBILE: grid dengan animasi ── */}
      <div className="parallax-mobile" style={{ padding: "4rem 0" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto", padding: "0 1.25rem" }}>
          {/* Title */}
          <motion.div
            style={{ textAlign: "center", marginBottom: "2rem" }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <span style={{ fontSize: "0.65rem", letterSpacing: "0.35em", color: "#64748b", textTransform: "uppercase", display: "block", marginBottom: "0.6rem" }}>
              The Collection
            </span>
            <h2 style={{ fontSize: "clamp(2rem, 9vw, 2.8rem)", fontWeight: 900, color: "#1e293b", letterSpacing: "-0.04em", lineHeight: 1, margin: 0 }}>
              Pure. <span style={{ color: "#94a3b8" }}>Clear.</span> Alive.
            </h2>
          </motion.div>

          {/* 2-col masonry-style grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
            {mobileImages.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  position: "relative",
                  borderRadius: "1rem",
                  overflow: "hidden",
                  border: "1px solid rgba(255,255,255,0.5)",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                  // Gambar ke-5 span 2 kolom
                  gridColumn: i === 4 ? "1 / -1" : undefined,
                  height: i === 4 ? "160px" : i % 2 === 0 ? "180px" : "150px",
                }}
              >
                <Image
                  src={img.src}
                  alt={img.label}
                  fill
                  sizes="(max-width: 600px) 50vw, 300px"
                  style={{ objectFit: "cover", objectPosition: "center" }}
                />
                {/* Overlay gradient */}
                <div style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(to top, rgba(0,0,0,0.35) 0%, transparent 60%)",
                  zIndex: 1,
                }} />
                {/* Label */}
                <span style={{
                  position: "absolute", bottom: "0.75rem", left: "0.875rem",
                  zIndex: 2, fontSize: "0.75rem", fontWeight: 700,
                  color: "rgba(255,255,255,0.9)", letterSpacing: "0.05em",
                }}>
                  {img.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .parallax-desktop { display: block; }
        .parallax-mobile  { display: none; }

        @media (max-width: 768px) {
          .parallax-desktop { display: none; }
          .parallax-mobile  { display: block; }
        }
      `}</style>
    </section>
  );
}
