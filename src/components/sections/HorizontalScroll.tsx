// src/components/sections/HorizontalScroll.tsx
"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import Image from "next/image";

const cards = [
  {
    label: "Morning Ritual",
    sub: "Hydralune 01",
    color: "var(--brand-primary)",
    image: "/images/collection/morning_ritual.jpg",
  },
  {
    label: "Midday Boost",
    sub: "Hydralune 02",
    color: "var(--brand-secondary)",
    image: "/images/collection/midday_boost.jpg",
  },
  {
    label: "Post-Workout",
    sub: "Hydralune 03",
    color: "var(--brand-tertiary)",
    image: "/images/collection/post_workout.jpg",
  },
  {
    label: "Evening Restore",
    sub: "Hydralune 04",
    color: "var(--brand-neutral)",
    image: "/images/collection/evening_restore.jpg",
  },
  {
    label: "Night Recovery",
    sub: "Hydralune 05",
    color: "var(--brand-primary)",
    image: "/images/collection/night_recovery.jpg",
  },
];

export function HorizontalScroll() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return; // mobile pakai vertical scroll biasa

    const ctx = gsap.context(() => {
      const track = trackRef.current;
      if (!track) return;

      const getScrollAmount = () => -(track.scrollWidth - window.innerWidth);

      const anim = gsap.to(track, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${Math.abs(getScrollAmount())}`,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      return () => anim.kill();
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile]);

  /* ── Mobile: vertical grid layout ── */
  if (isMobile) {
    return (
      <section
        id="collection"
        style={{
          background: "var(--brand-neutral)",
          padding: "4rem 0",
        }}
      >
        <div style={{ maxWidth: "600px", margin: "0 auto", padding: "0 1.25rem" }}>
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <span
              style={{
                fontSize: "0.7rem",
                letterSpacing: "0.35em",
                color: "#94a3b8",
                textTransform: "uppercase",
              }}
            >
              Our Collection
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {cards.map((card, i) => (
              <div
                key={i}
                style={{
                  width: "100%",
                  height: "56vw",
                  maxHeight: "280px",
                  borderRadius: "1.25rem",
                  background: card.color,
                  position: "relative",
                  overflow: "hidden",
                  border: "1px solid rgba(0,0,0,0.06)",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
                }}
              >
                <Image
                  src={card.image}
                  alt={card.label}
                  fill
                  sizes="100vw"
                  style={{ objectFit: "cover", objectPosition: "center" }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "50%",
                    background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 100%)",
                    zIndex: 1,
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: "1.25rem 1.5rem",
                    zIndex: 2,
                  }}
                >
                  <span
                    style={{
                      display: "block",
                      fontSize: "0.6rem",
                      letterSpacing: "0.3em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.7)",
                      marginBottom: "0.25rem",
                    }}
                  >
                    {card.sub}
                  </span>
                  <h3
                    style={{
                      fontSize: "1.3rem",
                      fontWeight: 800,
                      color: "#ffffff",
                      margin: 0,
                      lineHeight: 1.1,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {card.label}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  /* ── Desktop/Tablet: horizontal scroll ── */
  return (
    <section
      ref={sectionRef}
      id="collection"
      style={{
        overflow: "hidden",
        background: "var(--brand-neutral)",
      }}
    >
      {/* Section label */}
      <div
        style={{
          position: "absolute",
          top: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
          textAlign: "center",
          pointerEvents: "none",
        }}
      >
        <span
          style={{
            fontSize: "0.7rem",
            letterSpacing: "0.35em",
            color: "#94a3b8",
            textTransform: "uppercase",
          }}
        >
          Our Collection
        </span>
      </div>

      {/* Track */}
      <div
        ref={trackRef}
        style={{
          display: "flex",
          gap: "1.25rem",
          paddingLeft: "5vw",
          paddingRight: "5vw",
          width: "max-content",
          height: "100vh",
          alignItems: "center",
        }}
      >
        {cards.map((card, i) => (
          <div
            key={i}
            style={{
              width: "42vw",
              height: "70vh",
              borderRadius: "1.5rem",
              flexShrink: 0,
              background: card.color,
              position: "relative",
              overflow: "hidden",
              border: "1px solid rgba(0,0,0,0.06)",
              boxShadow: "0 4px 32px rgba(0,0,0,0.06)",
            }}
          >
            <Image
              src={card.image}
              alt={card.label}
              fill
              sizes="42vw"
              style={{ objectFit: "cover", objectPosition: "center" }}
            />
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "45%",
                background: "linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 100%)",
                zIndex: 1,
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                padding: "2rem 2.5rem",
                zIndex: 2,
              }}
            >
              <span
                style={{
                  display: "block",
                  fontSize: "0.65rem",
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.7)",
                  marginBottom: "0.4rem",
                }}
              >
                {card.sub}
              </span>
              <h3
                style={{
                  fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
                  fontWeight: 800,
                  color: "#ffffff",
                  margin: 0,
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                }}
              >
                {card.label}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
