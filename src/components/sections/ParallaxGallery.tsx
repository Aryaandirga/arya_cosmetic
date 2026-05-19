// src/components/sections/ParallaxGallery.tsx
"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
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
  {
    id: 1,
    top: "2%",
    left: "5%",
    width: "36%",
    height: "52%",
    speed: 0.4,
    delay: 0,
    image: "/images/gallery/parallax1.jpg",
  },
  {
    id: 2,
    top: "2%",
    left: "39%", // ← tengah atas, isi space kosong
    width: "28%",
    height: "44%",
    speed: 0.6,
    delay: 0.05,
    image: "/images/gallery/parallax4.jpg",
  },
  {
    id: 3,
    top: "10%",
    right: "2%", // ← kanan atas
    width: "30%",
    height: "48%",
    speed: 0.7,
    delay: 0.08,
    image: "/images/gallery/parallax2.jpg",
  },
  {
    id: 4,
    top: "50%",
    left: "10%", // ← kiri bawah
    width: "26%",
    height: "46%",
    speed: 0.25,
    delay: 0.12,
    image: "/images/gallery/parallax3.jpg",
  },
  {
    id: 5,
    top: "48%",
    right: "8%", // ← kanan bawah
    width: "30%",
    height: "50%",
    speed: 0.45,
    delay: 0.1,
    image: "/images/gallery/parallax5.jpg",
  },
];

export function ParallaxGallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title reveal saat masuk
      gsap.fromTo(
        titleRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        },
      );

      // ✅ Title naik saat scroll
      gsap.to(titleRef.current, {
        y: -120, // ← naik 120px seiring scroll
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5, // ← smooth mengikuti scroll
        },
      });

      // ... sisa animasi items tetap sama
      itemsRef.current.forEach((item, i) => {
        gsap.fromTo(
          item,
          { y: 80, opacity: 0, scale: 0.96 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.1,
            ease: "power3.out",
            delay: galleryItems[i].delay,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 60%",
            },
          },
        );

        gsap.to(item, {
          y: () => -(galleryItems[i].speed * 120),
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
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
      style={{
        position: "relative",
        height: "110vh", // ← dari 160vh jadi 110vh
        overflow: "hidden",
        background: "var(--brand-tertiary)",
      }}
    >
      {/* Sticky container */}
      <div
        ref={stickyRef}
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Ambient bg */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 70% 60% at 50% 50%, var(--brand-primary) 0%, var(--brand-tertiary) 60%, transparent 100%)",
            opacity: 0.6,
            pointerEvents: "none",
          }}
        />

        {/* Title — center overlay */}
        <div
          ref={titleRef}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 10,
            textAlign: "center",
            pointerEvents: "none",
            opacity: 0,
          }}
        >
          <span
            style={{
              fontSize: "0.7rem",
              letterSpacing: "0.35em",
              color: "#64748b",
              textTransform: "uppercase",
              display: "block",
              marginBottom: "0.75rem",
            }}
          >
            The Collection
          </span>
          <h2
            style={{
              fontSize: "clamp(2.5rem, 5vw, 5rem)",
              fontWeight: 900,
              color: "#1e293b",
              letterSpacing: "-0.04em",
              lineHeight: 1,
              margin: 0,
            }}
          >
            Pure.
            <br />
            <span style={{ color: "#94a3b8" }}>Clear.</span>
            <br />
            Alive.
          </h2>
        </div>

        {/* Gallery items */}
        {galleryItems.map((item, i) => (
          <div
            key={item.id}
            ref={(el) => {
              if (el) itemsRef.current[i] = el;
            }}
            style={
              {
                position: "absolute",
                top: item.top ?? "auto",
                left: item.left ?? "auto",
                right: item.right ?? "auto",
                bottom: item.bottom ?? "auto",
                width: item.width,
                height: item.height,
                borderRadius: "1.5rem",
                opacity: 0,
                border: "1px solid rgba(255,255,255,0.5)",
                boxShadow: "0 8px 40px rgba(0,0,0,0.08)",
                overflow: "hidden", // ← wajib agar image ikut rounded
              } as React.CSSProperties
            }
          >
            {/* Gambar full cover */}
            <Image
              src={item.image}
              alt={`Gallery ${item.id}`}
              fill
              sizes="(max-width: 768px) 50vw, 30vw"
              style={{
                objectFit: "cover",
                objectPosition: "center",
              }}
            />

            {/* Shimmer overlay */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 60%)",
                pointerEvents: "none",
                zIndex: 1,
              }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
