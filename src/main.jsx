import React, { useEffect } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App";
let finish;
export const ready = new Promise((resolve) => {
  finish = resolve;
});
function Storefront() {
  useEffect(() => {
    window.dispatchEvent(new Event("remedy-ready"));
    finish();
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let lenis;
    import("lenis").then(({ default: Lenis }) => {
      lenis = new Lenis({ duration: 1.1, smoothWheel: true });
      function raf(t) { lenis.raf(t); requestAnimationFrame(raf); }
      requestAnimationFrame(raf);
    });
    return () => lenis?.destroy();
  }, []);
  return <App />;
}
const root = document.getElementById("root");
root.firstElementChild
  ? hydrateRoot(root, <Storefront />)
  : createRoot(root).render(<Storefront />);
