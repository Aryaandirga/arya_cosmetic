// src/app/page.tsx
"use client";
import { useLenis } from "@/hooks/useLenis";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Features } from "@/components/sections/Features";
import { Timeline } from "@/components/sections/Timeline";
import { ParallaxGallery } from "@/components/sections/ParallaxGallery";
import { HorizontalScroll } from "@/components/sections/HorizontalScroll";
import { Contact } from "@/components/sections/Contact";
import { CTA } from "@/components/sections/CTA";

export default function HomePage() {
  useLenis();

  return (
    <main>
      <Hero />
      <About />
      <Features />
      <Timeline />
      <ParallaxGallery />
      <HorizontalScroll />
      <Contact />
      <CTA />
    </main>
  );
}
