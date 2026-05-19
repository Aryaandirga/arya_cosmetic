// src/components/sections/Timeline.tsx
"use client";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { motion } from "framer-motion";

const steps = [
  {
    year: "2018",
    title: "The Idea",
    desc: "Founder kami terobsesi mencari air yang benar-benar mendukung performa atlet dan pekerja modern.",
    side: "left",
  },
  {
    year: "2020",
    title: "First Formula",
    desc: "Lab pertama dibuka. Ratusan iterasi formula dilakukan. Satu formula akhirnya berhasil sempurna.",
    side: "right",
  },
  {
    year: "2022",
    title: "Launch",
    desc: "Hydralune resmi hadir ke pasaran. Respons komunitas melampaui semua ekspektasi kami.",
    side: "left",
  },
  {
    year: "2024",
    title: "Global Reach",
    desc: "Hadir di 12 negara dengan 500.000+ pelanggan setia. Perjalanan sesungguhnya baru dimulai.",
    side: "right",
  },
];

export function Timeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);
  const dotsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(progressRef.current, {
        scaleY: 1,
        ease: "none",
        transformOrigin: "top center",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 55%",
          end: "bottom 65%",
          scrub: 1.2,
        },
      });

      itemsRef.current.forEach((item, i) => {
        gsap.from(item, {
          x: steps[i].side === "left" ? -50 : 50,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: item, start: "top 82%" },
        });
        gsap.from(dotsRef.current[i], {
          scale: 0,
          opacity: 0,
          duration: 0.5,
          ease: "back.out(2)",
          scrollTrigger: { trigger: item, start: "top 82%" },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="timeline"
      style={{
        padding: "6rem 0",
        background: "var(--brand-secondary)",
        overflow: "hidden",
      }}
    >
      {/* Wrapper */}
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 2rem" }}>
        {/* Header */}
        <motion.div
          style={{ textAlign: "center", marginBottom: "5rem" }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
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
            Our Journey
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
            Every drop has
            <br />
            <span style={{ color: "#94a3b8" }}>a story.</span>
          </h2>
        </motion.div>

        {/* Timeline track */}
        <div
          style={{ position: "relative", maxWidth: "700px", margin: "0 auto" }}
        >
          {/* Background line */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: 0,
              bottom: 0,
              width: "1px",
              background: "rgba(0,0,0,0.1)",
              transform: "translateX(-50%)",
            }}
          />

          {/* Progress line */}
          <div
            ref={progressRef}
            style={{
              position: "absolute",
              left: "50%",
              top: 0,
              width: "2px",
              height: "100%",
              background: "#1e293b",
              transform: "translateX(-50%) scaleY(0)",
              transformOrigin: "top",
            }}
          />

          {/* Items */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "3.5rem" }}
          >
            {steps.map((step, i) => (
              <div
                key={step.year}
                ref={(el) => {
                  if (el) itemsRef.current[i] = el;
                }}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 24px 1fr",
                  alignItems: "start",
                  gap: "0",
                }}
              >
                {/* Left */}
                <div style={{ paddingRight: "2.5rem", textAlign: "right" }}>
                  {step.side === "left" && (
                    <>
                      <span
                        style={{
                          fontSize: "0.7rem",
                          letterSpacing: "0.25em",
                          color: "#94a3b8",
                          textTransform: "uppercase",
                        }}
                      >
                        {step.year}
                      </span>
                      <h3
                        style={{
                          fontSize: "1.25rem",
                          fontWeight: 700,
                          color: "#1e293b",
                          margin: "0.25rem 0",
                        }}
                      >
                        {step.title}
                      </h3>
                      <p
                        style={{
                          fontSize: "0.875rem",
                          color: "#64748b",
                          lineHeight: 1.65,
                          margin: 0,
                        }}
                      >
                        {step.desc}
                      </p>
                    </>
                  )}
                </div>

                {/* Dot */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    paddingTop: "6px",
                  }}
                >
                  <div
                    ref={(el) => {
                      if (el) dotsRef.current[i] = el;
                    }}
                    style={{
                      width: "12px",
                      height: "12px",
                      borderRadius: "9999px",
                      background: "#1e293b",
                      border: "2px solid white",
                      boxShadow: "0 0 0 3px rgba(0,0,0,0.08)",
                      flexShrink: 0,
                    }}
                  />
                </div>

                {/* Right */}
                <div style={{ paddingLeft: "2.5rem" }}>
                  {step.side === "right" && (
                    <>
                      <span
                        style={{
                          fontSize: "0.7rem",
                          letterSpacing: "0.25em",
                          color: "#94a3b8",
                          textTransform: "uppercase",
                        }}
                      >
                        {step.year}
                      </span>
                      <h3
                        style={{
                          fontSize: "1.25rem",
                          fontWeight: 700,
                          color: "#1e293b",
                          margin: "0.25rem 0",
                        }}
                      >
                        {step.title}
                      </h3>
                      <p
                        style={{
                          fontSize: "0.875rem",
                          color: "#64748b",
                          lineHeight: 1.65,
                          margin: 0,
                        }}
                      >
                        {step.desc}
                      </p>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
