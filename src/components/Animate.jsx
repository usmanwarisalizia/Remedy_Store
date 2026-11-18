import React from "react";
import { motion } from "motion/react";
import { useReducedMotion } from "../hooks/useReducedMotion";

const variants = {
  fadeUp:   { hidden: { opacity: 0, y: 36 },  visible: { opacity: 1, y: 0 } },
  fadeDown: { hidden: { opacity: 0, y: -28 }, visible: { opacity: 1, y: 0 } },
  fadeIn:   { hidden: { opacity: 0 },          visible: { opacity: 1 } },
  scaleUp:  { hidden: { opacity: 0, scale: 0.92 }, visible: { opacity: 1, scale: 1 } },
  slideLeft:  { hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0 } },
  slideRight: { hidden: { opacity: 0, x: 40 },  visible: { opacity: 1, x: 0 } },
};

export default function Animate({
  children,
  variant = "fadeUp",
  delay = 0,
  duration = 0.65,
  amount = 0.18,
  className,
  style,
  as = "div",
}) {
  const reduced = useReducedMotion();
  const Tag = motion[as] || motion.div;
  if (reduced) return <Tag className={className} style={style}>{children}</Tag>;
  const v = variants[variant] || variants.fadeUp;
  return (
    <Tag
      className={className}
      style={style}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
      variants={v}
    >
      {children}
    </Tag>
  );
}
