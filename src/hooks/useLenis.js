import { useEffect } from "react";
import { useReducedMotion } from "./useReducedMotion";

export function useLenis() {
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced) return;
    let lenis;
    import("lenis").then(({ default: Lenis }) => {
      lenis = new Lenis({
        duration: 1.1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 1.5,
      });
      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    });
    return () => lenis?.destroy();
  }, [reduced]);
}
