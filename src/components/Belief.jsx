import React, { useRef, useEffect } from "react";
export default function Belief() {
  const section = useRef(null),
    line = useRef(null),
    word = useRef(null);
  useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)");
    let disposed = false,
      active = false,
      animations = [];
    function stop() {
      animations.forEach((a) => a.cancel());
      animations = [];
    }
    const observer = new IntersectionObserver(
      async ([entry]) => {
        active = entry.isIntersecting;
        if (!active) {
          stop();
          return;
        }
        if (reduce.matches) return;
        const { animate } = await import("motion/mini");
        if (disposed || !active || reduce.matches) return;
        stop();
        animations = [
          animate(
            line.current,
            { strokeDashoffset: [1, 0] },
            { duration: 1.05, ease: "easeInOut" },
          ),
          animate(
            word.current,
            {
              clipPath: [
                "inset(0 0% -20% 0)",
                "inset(0 100% -20% 0)",
                "inset(0 0% -20% 0)",
              ],
            },
            {
              delay: 0.65,
              duration: 1.35,
              times: [0, 0.32, 1],
              ease: "easeInOut",
            },
          ),
        ];
      },
      { threshold: 0.4 },
    );
    const preference = () => {
      if (reduce.matches) stop();
    };
    reduce.addEventListener("change", preference);
    observer.observe(section.current);
    return () => {
      disposed = true;
      observer.disconnect();
      stop();
      reduce.removeEventListener("change", preference);
    };
  }, []);
  return (
    <section className="belief" ref={section}>
      <h2>
        We believe that if you have{" "}
        <span className="circled">
          healthy
          <svg
            aria-hidden="true"
            viewBox="0 0 120 48"
            preserveAspectRatio="none"
          >
            <path
              ref={line}
              pathLength="1"
              strokeDasharray="1"
              d="M111 13 C96 -1 53 0 25 10 C-7 21 1 42 31 44 C64 47 115 35 118 21 C120 14 114 10 106 8"
            />
          </svg>
        </span>{" "}
        skin, you have{" "}
        <u className="rewrite" ref={word}>
          great skin
        </u>
        . Our Super Stacked™ treatments provide the consistent support your skin
        needs to look and feel its best.
      </h2>
    </section>
  );
}
