import React from "react";
import { motion } from "motion/react";
import { useReducedMotion } from "../hooks/useReducedMotion";

export default function TextReveal({ children, as = "h2", className, delay = 0 }) {
  const reduced = useReducedMotion();
  const Tag = as;
  if (reduced || typeof children !== "string") {
    return <Tag className={className}>{children}</Tag>;
  }
  const words = children.split(" ");
  const MotionTag = motion[as] || motion.h2;
  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={{ visible: { transition: { staggerChildren: 0.07, delayChildren: delay } } }}
    >
      {words.map((word, i) => (
        <span key={i} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom" }}>
          <motion.span
            style={{ display: "inline-block" }}
            variants={{
              hidden: { y: "110%", opacity: 0 },
              visible: { y: "0%", opacity: 1, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
            }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 && "\u00a0"}
        </span>
      ))}
    </MotionTag>
  );
}
