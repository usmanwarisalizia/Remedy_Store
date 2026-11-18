import React from "react";
import { Photo } from "../shared";
import { useFadeIn } from "../hooks/useFadeIn";
const categories = ["Advice", "Conditions", "How-To", "Ingredients", "Index"];
export default function Skinpedia() {
  const ref = useFadeIn();
  return (
    <section id="skinpedia" className="skinpedia anim-fade-up" ref={ref}>
      <Photo name="skinpedia" alt="" />
      <div className="skin-inner">
        <h2>Skinpedia</h2>
        <h3>
          Our resource for answers
          <br className="desktop" /> to skincare questions
        </h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            window.location.hash =
              "search/" +
              encodeURIComponent(new FormData(e.currentTarget).get("q").trim());
          }}
          role="search"
          className="searchbar"
        >
          <span aria-hidden="true">✧</span>
          <input
            aria-label="Search Skinpedia articles"
            type="search"
            required
            name="q"
            placeholder="Ask any skin question…"
          />
          <input type="hidden" name="type" value="article" />
          <button>Ask</button>
        </form>
        <div className="chips">
          {categories.map((n) => (
            <a key={n} href={"#search/" + encodeURIComponent(n)}>
              {n}
            </a>
          ))}
        </div>
        <div className="prompts">
          {[
            "Azelaic acid + retinol?",
            "What's causing my redness?",
            "Routine for dark spots",
          ].map((q) => (
            <a key={q} href={"#search/" + encodeURIComponent(q)}>
              {q}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
