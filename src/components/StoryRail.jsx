import React, { useEffect, useRef, useState } from "react";
import Carousel from "../Carousel";
import { clips, allProducts, Photo, Icon, Dialog } from "../shared";
const price = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
export default function StoryRail({ add }) {
  const rail = useRef(null),
    slider = useRef(null),
    movie = useRef(null),
    dragRef = useRef({ x: 0, y: 0 });
  const [index, setIndex] = useState(0),
    [visible, setVisible] = useState(false),
    [muted, setMuted] = useState(true),
    [paused, setPaused] = useState(false),
    [full, setFull] = useState(null),
    [foreground, setForeground] = useState(true);
  useEffect(() => {
    const pref = matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setPaused(pref.matches);
    const visibility = () => setForeground(!document.hidden);
    const observer = new IntersectionObserver(
      ([item]) =>
        setVisible(item.isIntersecting && item.intersectionRatio >= 0.2),
      { threshold: [0, 0.2] },
    );
    observer.observe(rail.current);
    sync();
    visibility();
    pref.addEventListener("change", sync);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      observer.disconnect();
      pref.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", visibility);
    };
  }, []);
  const running = visible && foreground && !paused && !full;
  useEffect(() => {
    const video = movie.current;
    if (!video) return;
    if (!running) {
      video.pause();
      return;
    }
    video.play().catch((err) => {
      if (err.name === "NotAllowedError") setPaused(true);
    });
    const timer = setTimeout(() => {
      if (slider.current && !slider.current.destroyed)
        slider.current.slideNext();
    }, 8000);
    return () => {
      clearTimeout(timer);
      video.pause();
    };
  }, [running, index]);
  function choose(i) {
    if (i === index) {
      setFull(clips[i]);
      return;
    }
    slider.current?.slideToLoop(i);
  }
  return (
    <div ref={rail}>
      <Carousel
        kind="video-rail"
        label="customer videos"
        onReady={(s) => {
          slider.current = s;
          setIndex(s.realIndex);
        }}
        onActive={setIndex}
      >
        {clips.map((clip, i) => {
          const active = i === index,
            product = allProducts.find((p) => p.id === clip.productId);
          return (
            <article
              className="clip story-card"
              key={clip.key}
              onPointerDown={(e) => { dragRef.current = { x: e.clientX, y: e.clientY }; }}
              onClick={(e) => {
                if (e.defaultPrevented) return;
                const dx = e.clientX - dragRef.current.x;
                const dy = e.clientY - dragRef.current.y;
                if (Math.hypot(dx, dy) > 6) return;
                choose(i);
              }}
              style={{ cursor: active ? "default" : "pointer" }}
            >
              <Photo name={clip.key} alt="" />
              {active && visible && (
                <video
                  key={clip.key}
                  ref={movie}
                  src={clip.preview}
                  poster={"/media/" + clip.key + ".webp"}
                  muted={muted}
                  loop
                  playsInline
                  preload="metadata"
                  aria-label={clip.label}
                />
              )}
              {active && (
                <div className="story-controls">
                  <button
                    aria-label={muted ? "Unmute review" : "Mute review"}
                    onClick={(e) => { e.stopPropagation(); setMuted((v) => !v); }}
                  >
                    <Icon name={muted ? "muted" : "sound"} />
                  </button>
                  <button
                    aria-label={paused ? "Resume reviews" : "Pause reviews"}
                    onClick={(e) => { e.stopPropagation(); setPaused((v) => !v); }}
                  >
                    <Icon name={paused ? "play" : "pause"} />
                  </button>
                </div>
              )}
              {product && (
                <div className="story-product">
                  <a href={product.href} onClick={(e) => e.stopPropagation()}>
                    <Photo name={product.pack} />
                    <div>
                      {product.name}
                      <strong>{price.format(product.price / 100)}</strong>
                    </div>
                  </a>
                  <button
                    aria-label={"Add " + product.name + " to bag"}
                    onClick={(e) => {
                      e.stopPropagation();
                      setPaused(true);
                      add(product.id);
                    }}
                  >
                    <Icon name="plus" />
                  </button>
                </div>
              )}
            </article>
          );
        })}
      </Carousel>
      {full && (
        <Dialog label={full.label} close={() => setFull(null)}>
          <video
            className="review-player"
            src={full.url}
            poster={"/media/" + full.key + ".webp"}
            playsInline
            controls
            autoPlay
          />
        </Dialog>
      )}
    </div>
  );
}
