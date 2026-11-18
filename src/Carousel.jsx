import React, { useEffect, useRef } from "react";
import { Icon } from "./shared";
export default function Carousel({ label, kind, children, onReady, onActive }) {
  const view = useRef(null),
    load = useRef(null),
    events = useRef(null);
  events.current = { onReady, onActive };
  const stories = kind === "video-rail";
  useEffect(() => {
    let disposed = false,
      instance,
      pending;
    function enhance() {
      return (pending ??= import("swiper").then(({ default: Swiper }) => {
        if (disposed) return;
        instance = new Swiper(view.current, {
          slidesPerView: "auto",
          centeredSlides: stories,
          loop: stories,
          rewind: !stories,
          initialSlide: 0,
          simulateTouch: true,
          grabCursor: true,
          threshold: 4,
          touchStartPreventDefault: false,
          watchOverflow: true,
          speed: matchMedia("(prefers-reduced-motion: reduce)").matches
            ? 0
            : 350,
          on: {
            realIndexChange(s) {
              events.current.onActive?.(s.realIndex);
            },
          },
        });
        events.current.onReady?.(instance);
        return instance;
      }));
    }
    load.current = enhance;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          observer.disconnect();
          enhance();
        }
      },
      { rootMargin: "300px" },
    );
    observer.observe(view.current);
    return () => {
      disposed = true;
      observer.disconnect();
      instance?.destroy();
      load.current = null;
    };
  }, [stories]);
  async function move(direction) {
    const slider = await load.current?.();
    if (slider && !slider.destroyed)
      direction > 0 ? slider.slideNext() : slider.slidePrev();
  }
  return (
    <div className={"rail " + kind}>
      {!stories && (
        <button
          className="prev"
          aria-label={"Previous " + label}
          onClick={() => move(-1)}
        >
          <Icon name="arrow" />
        </button>
      )}
      <div
        className="swiper"
        ref={view}
        role="region"
        aria-label={label}
        onDragStart={(e) => e.preventDefault()}
      >
        <div className="swiper-wrapper">
          {React.Children.map(children, (c) => (
            <div className="swiper-slide">{c}</div>
          ))}
        </div>
      </div>
      {!stories && (
        <button
          className="next"
          aria-label={"Next " + label}
          onClick={() => move(1)}
        >
          <Icon name="arrow" />
        </button>
      )}
    </div>
  );
}
