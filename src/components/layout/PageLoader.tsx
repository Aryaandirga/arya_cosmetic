// src/components/layout/PageLoader.tsx
"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export function PageLoader() {
  const loaderRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.from(textRef.current, {
      y: 50,
      opacity: 0,
      duration: 0.75,
      ease: "power3.out",
    })
      .from(
        lineRef.current,
        {
          scaleX: 0,
          duration: 0.9,
          ease: "power3.inOut",
          transformOrigin: "left center",
        },
        "-=0.3",
      )
      .to(loaderRef.current, {
        clipPath: "inset(0 0 100% 0)",
        duration: 1.1,
        ease: "power4.inOut",
        delay: 0.5,
      })
      .set(loaderRef.current, { display: "none" });
  }, []);

  return (
    <div
      ref={loaderRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--brand-neutral)",
        clipPath: "inset(0 0 0 0)",
        padding: "2rem",
      }}
    >
      <div ref={textRef} style={{ textAlign: "center" }}>
        <p
          style={{
            fontSize: "clamp(2.5rem, 10vw, 4.5rem)",
            fontWeight: 700,
            letterSpacing: "-0.04em",
            color: "#1e293b",
            margin: 0,
            lineHeight: 1,
          }}
        >
          hydralune
        </p>
        {/* Gap yang cukup antara judul dan subtitle */}
        <p
          style={{
            marginTop: "1rem",
            fontSize: "0.7rem",
            letterSpacing: "0.5em",
            color: "#94a3b8",
            textTransform: "uppercase",
          }}
        >
          pure hydration
        </p>
      </div>

      {/* Loading line — jarak dari teks */}
      <div
        ref={lineRef}
        style={{
          marginTop: "2.5rem",
          width: "64px",
          height: "1px",
          background: "rgba(0,0,0,0.2)",
          transformOrigin: "left center",
        }}
      />
    </div>
  );
}
