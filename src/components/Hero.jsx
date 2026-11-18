import React, { useState, useRef, useEffect } from "react";
import Header from "./Header";
export default function Hero({ count, open }) {
  const movie = useRef(null),
    userIntent = useRef(null),
    [playing, setPlaying] = useState(false);
  const [autoplay, setAutoplay] = useState(false);
  useEffect(() => {
    const el = movie.current;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    function prefer() {
      setAutoplay(
        !reduced.matches &&
          !navigator.connection?.saveData &&
          userIntent.current !== "pause",
      );
      if (reduced.matches) el.pause();
      else if (
        userIntent.current !== "pause" &&
        !navigator.connection?.saveData
      )
        el.play().catch(() => {});
    }
    let timer;
    function watchStart() {
      clearTimeout(timer);
      if (el.dataset.fallback || userIntent.current === "pause") return;
      timer = setTimeout(() => {
        if (
          el.readyState >= 3 ||
          el.dataset.fallback ||
          userIntent.current === "pause"
        )
          return;
        el.dataset.fallback = "true";
        el.src = "/media/hero-desktop.mp4";
        el.play().catch(() => {});
      }, 2200);
    }
    const clear = () => clearTimeout(timer);
    el.addEventListener("play", watchStart);
    el.addEventListener("waiting", watchStart);
    el.addEventListener("playing", clear);
    el.addEventListener("pause", clear);
    prefer();
    reduced.addEventListener("change", prefer);
    return () => {
      clear();
      reduced.removeEventListener("change", prefer);
      el.removeEventListener("play", watchStart);
      el.removeEventListener("waiting", watchStart);
      el.removeEventListener("playing", clear);
      el.removeEventListener("pause", clear);
    };
  }, []);
  return (
    <>
      <Header count={count} open={open} />
      <section className="hero" aria-label="Campaign">
        <div
          className="hero-still"
          role="img"
          aria-label="Remedy On-Call bag"
        />
        <video
          className={playing ? "visible" : ""}
          aria-hidden="true"
          ref={movie}
          muted
          autoPlay={autoplay}
          loop
          playsInline
          preload="none"
          src="https://cdn.shopify.com/videos/c/o/v/6e8549f6f475409796f9f4b6a9ef7191.mp4"
          onError={(event) => {
            const el = event.currentTarget;
            if (el.dataset.fallback) return;
            el.dataset.fallback = "true";
            el.src = "/media/hero-desktop.mp4";
            if (
              userIntent.current === "play" ||
              (userIntent.current !== "pause" &&
                !matchMedia("(prefers-reduced-motion: reduce)").matches &&
                !navigator.connection?.saveData)
            )
              el.play().catch(() => {});
          }}
          onPlaying={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        />
        <div className="shade" />
        <div className="offer anim-fade-up">
          <div>
            <h1>30% Off Bundles</h1>
            <p>
              + Free Gift with Purchase
              <br />
              While supplies last
            </p>
          </div>
          <a className="pill white" href="#bundles">
            Shop Now
          </a>
        </div>
      </section>
    </>
  );
}
