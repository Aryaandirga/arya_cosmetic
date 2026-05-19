// src/lib/lenis.ts
import Lenis from "@studio-freight/lenis";

let lenisInstance: Lenis | null = null;

export function initLenis(): Lenis {
  lenisInstance = new Lenis({
    duration: 1.4,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: "vertical",
    smoothWheel: true,
  });
  return lenisInstance;
}

export function getLenis(): Lenis | null {
  return lenisInstance;
}