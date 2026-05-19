// src/components/sections/About.tsx
"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { motion } from "framer-motion";
import Image from "next/image";

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const img1Ref = useRef<HTMLDivElement>(null);
  const img2Ref = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(img1Ref.current, {
        y: "-12%",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      });
      gsap.to(img2Ref.current, {
        y: "-22%",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.8,
        },
      });
      gsap.from(textRef.current?.children ?? [], {
        y: 48,
        opacity: 0,
        duration: 1,
        stagger: 0.14,
        ease: "power3.out",
        scrollTrigger: { trigger: textRef.current, start: "top 78%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      style={{
        position: "relative",
        padding: "6rem 0",
        overflow: "hidden",
        background: "var(--brand-primary)",
      }}
    >
      <div className="about-inner">
        {/* Image stack */}
        <div className="about-images">
          {/* Layer 1 — kiri atas */}
          <div
            ref={img1Ref}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "62%",
              height: "60%",
              borderRadius: "1.5rem",
              overflow: "hidden",
              boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
            }}
          >
            <Image
              src="/images/about/about2.jpg"
              alt="Hydralune story"
              fill
              sizes="(max-width: 768px) 60vw, 30vw"
              style={{ objectFit: "cover", objectPosition: "center" }}
            />
          </div>

          {/* Layer 2 — kanan bawah */}
          <div
            ref={img2Ref}
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              width: "58%",
              height: "58%",
              borderRadius: "1.5rem",
              overflow: "hidden",
              boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
            }}
          >
            <Image
              src="/images/about/about1.jpg"
              alt="Hydralune intention"
              fill
              sizes="(max-width: 768px) 60vw, 30vw"
              style={{ objectFit: "cover", objectPosition: "center" }}
            />
          </div>

          {/* Floating stat card */}
          <motion.div
            style={{
              position: "absolute",
              bottom: "1.5rem",
              left: "1rem",
              zIndex: 10,
              padding: "1rem 1.25rem",
              borderRadius: "1rem",
              background: "rgba(255,255,255,0.9)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.8)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <p
              style={{
                fontSize: "1.5rem",
                fontWeight: 700,
                color: "#1e293b",
                margin: 0,
              }}
            >
              500K+
            </p>
            <p
              style={{
                fontSize: "0.75rem",
                color: "#94a3b8",
                marginTop: "2px",
                letterSpacing: "0.05em",
              }}
            >
              Happy customers
            </p>
          </motion.div>
        </div>

        {/* Text */}
        <div
          ref={textRef}
          style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
        >
          <span
            style={{
              fontSize: "0.7rem",
              letterSpacing: "0.3em",
              color: "#94a3b8",
              textTransform: "uppercase",
            }}
          >
            Our Story
          </span>
          <h2
            style={{
              fontSize: "clamp(2.2rem, 4vw, 3.2rem)",
              fontWeight: 800,
              color: "#1e293b",
              lineHeight: 1.1,
              margin: 0,
            }}
          >
            Born from
            <br />
            pure intention.
          </h2>
          <p
            style={{
              color: "#64748b",
              lineHeight: 1.75,
              fontSize: "1rem",
              maxWidth: "420px",
              margin: 0,
            }}
          >
            Hydralune lahir dari keyakinan bahwa hidrasi bukan sekadar kebutuhan
            — ia adalah ritual. Setiap tetes dirancang dengan presisi untuk
            mendukung tubuh dan pikiran kamu.
          </p>
          <p
            style={{
              color: "#94a3b8",
              lineHeight: 1.7,
              fontSize: "0.875rem",
              maxWidth: "400px",
              margin: 0,
            }}
          >
            Kami bekerja sama dengan para ahli nutrisi dan atlet profesional
            selama 3 tahun sebelum merilis formula pertama kami.
          </p>
          <motion.a
            href="#"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              fontSize: "0.875rem",
              fontWeight: 500,
              color: "#1e293b",
              textDecoration: "none",
              borderBottom: "1px solid #cbd5e1",
              paddingBottom: "2px",
              width: "fit-content",
              transition: "border-color 0.2s",
            }}
            whileHover={{ x: 4 }}
            transition={{ duration: 0.2 }}
          >
            Read the full story
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M2 7h10M8 3l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.a>
        </div>
      </div>

      <style>{`
        .about-inner {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 2rem;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 5rem;
          align-items: center;
        }
        .about-images {
          position: relative;
          height: 520px;
        }

        /* Tablet */
        @media (max-width: 1024px) {
          .about-inner {
            gap: 3rem;
          }
          .about-images {
            height: 400px;
          }
        }

        /* Mobile */
        @media (max-width: 640px) {
          .about-inner {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
          .about-images {
            height: 320px;
          }
        }
      `}</style>
    </section>
  );
}
