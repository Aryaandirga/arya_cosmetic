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
      className="fixed inset-0 z-9999 flex flex-col items-center justify-center"
      style={{
        background: "var(--brand-neutral)",
        clipPath: "inset(0 0 0 0)",
      }}
    >
      <div ref={textRef} className="text-center">
        <p className="text-6xl md:text-7xl font-bold tracking-tight text-slate-800">
          hydralune
        </p>
        <p className="mt-3 text-xs tracking-[0.5em] text-slate-400 uppercase">
          pure hydration
        </p>
      </div>
      {/* Loading line */}
      <div
        ref={lineRef}
        className="mt-10 w-16 h-px origin-left"
        style={{ background: "rgba(0,0,0,0.2)" }}
      />
    </div>
  );
}
