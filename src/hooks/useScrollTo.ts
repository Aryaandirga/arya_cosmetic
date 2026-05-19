import { getLenis } from "@/lib/lenis";

export function useScrollTo() {
  const scrollTo = (href: string, offset = -80) => {
    const target = document.querySelector(href);
    if (!target) return;

    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(target as HTMLElement, {
        offset,
        duration: 1.8,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return { scrollTo };
}
