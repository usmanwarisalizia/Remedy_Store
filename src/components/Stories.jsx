import React from "react";
import { Photo } from "../shared";
import StoryRail from "./StoryRail";
import { useFadeIn } from "../hooks/useFadeIn";
const quotes = [
  [
    "Stephanie",
    "My pores and over all texture looks much smoother and my skin tone is more even.",
  ],
  ["Sarah", "I now feel confident not wearing makeup."],
  ["Melvina", "More cost-effective than when I was buying multiple products."],
];
export default function Stories({ add }) {
  const opinionsRef = useFadeIn();
  const resultsRef = useFadeIn();
  return (
    <>
      <section className="opinions anim-fade-up" ref={opinionsRef}>
        <h2>Second opinions</h2>
        <StoryRail add={add} />
      </section>
      <section className="results anim-fade-up" ref={resultsRef}>
        <h2>Real results</h2>
        <p className="mobile-caption">What people are saying about Remedy</p>
        <div
          className="result-grid"
          tabIndex="0"
          role="region"
          aria-label="Customer testimonials"
        >
          <article className="result-intro">
            <span>Testimonials</span>
            <Photo name="badge" alt="Remedy Science" />
            <b>What people are saying about Remedy</b>
          </article>
          {quotes.map(([name, quote]) => (
            <article key={name}>
              <Photo name={name.toLowerCase()} alt={name} />
              <span>{name}</span>
              <blockquote>"{quote}"</blockquote>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
