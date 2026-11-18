import React, { useEffect, useRef } from "react";
import catalog from "./catalog.json";
import reviews from "./videos.json";
export const { products, bundles } = catalog;
export const allProducts = [
  ...products,
  ...bundles,
  ...(catalog.storyProducts || []),
];
export const { clips } = reviews;
const assets = { ...catalog.assets, ...reviews.assets };
export function Photo({ name, alt = "", ...props }) {
  const asset = assets[name];
  return (
    <img
      width={asset.width}
      height={asset.height}
      src={
        import.meta.env.VITE_REMOTE_IMAGES === "true" ? asset.url : asset.local
      }
      srcSet={
        asset.small && import.meta.env.VITE_REMOTE_IMAGES !== "true"
          ? asset.small +
            " " +
            asset.smallWidth +
            "w, " +
            asset.local +
            " " +
            asset.width +
            "w"
          : undefined
      }
      sizes={
        name.startsWith("product-")
          ? "(max-width:767px) 50vw, 21vw"
          : ["stephanie", "sarah", "melvina"].includes(name)
            ? "(max-width:767px) 49vw, 22vw"
            : name === "skinpedia"
              ? "100vw"
              : "(max-width:767px) 100vw, 50vw"
      }
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={(e) => {
        if (!e.currentTarget.src.endsWith(asset.local))
          e.currentTarget.src = asset.local;
      }}
      {...props}
    />
  );
}
const paths = {
  cart: "M3 7h18v14H3z M8 7a4 4 0 0 1 8 0",
  account: "M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0 M3 21c0-8 18-8 18 0z",
  menu: "M2 5h20M2 12h20M2 19h20",
  arrow: "M3 12h17M13 5l7 7-7 7",
  close: "M5 5l14 14M19 5L5 19",
  muted: "M3 9h4l5-5v16l-5-5H3z M16 9l6 6m0-6-6 6",
  sound: "M3 9h4l5-5v16l-5-5H3z M16 8q5 4 0 8 M19 5q8 7 0 14",
  plus: "M12 3v18M3 12h18",
  play: "M7 3l14 9-14 9z",
  pause: "M8 4v16M16 4v16",
};
export function Icon({ name }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={paths[name]} />
    </svg>
  );
}
export function Dialog({ label, close, children, drawer = false }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    const last = document.activeElement;
    el.showModal();
    const before = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    if (!matchMedia("(prefers-reduced-motion: reduce)").matches)
      import("motion/mini").then(({ animate }) => {
        if (el.open)
          animate(
            el,
            {
              opacity: [0, 1],
              transform: [
                drawer ? "translateX(20px)" : "translateY(8px)",
                "none",
              ],
            },
            { duration: 0.17 },
          );
      });
    return () => {
      el.close();
      document.body.style.overflow = before;
      last?.focus?.({ preventScroll: true });
    };
  }, [drawer]);
  return (
    <dialog
      className={drawer ? "drawer" : "modal"}
      ref={ref}
      aria-label={label}
      onCancel={(e) => {
        e.preventDefault();
        close();
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          const b = e.currentTarget.getBoundingClientRect();
          if (
            e.clientX < b.left ||
            e.clientX > b.right ||
            e.clientY < b.top ||
            e.clientY > b.bottom
          )
            close();
        }
      }}
    >
      <div className="dialog-head">
        <strong>{label}</strong>
        <button aria-label="Close dialog" onClick={close}>
          <Icon name="close" />
        </button>
      </div>
      {children}
    </dialog>
  );
}
