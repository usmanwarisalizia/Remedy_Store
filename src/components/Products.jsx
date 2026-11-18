import React from "react";
import { Photo, products } from "../shared";
import Carousel from "../Carousel";
import { useFadeIn } from "../hooks/useFadeIn";
export default function Products({ add }) {
  const titleRef = useFadeIn();
  const railRef = useFadeIn();
  return (
    <section id="shop">
      <h2 className="script anim-fade-down" ref={titleRef}>
        <span>Find Your Remedy</span>
      </h2>
      <div ref={railRef} className="anim-fade-up">
        <Carousel kind="product-rail" label="products">
          {products.map((p, i) => (
            <article key={p.id}>
              <div className="product-photo">
                <a href={p.href} aria-label={"View " + p.name}>
                  <Photo name={p.image} alt={p.name} />
                </a>
                {i === 3 && <b className="new">NEW</b>}
                <button
                  className="pill add"
                  onClick={() => add(p.id)}
                  aria-label={"Add " + p.name + " to cart"}
                >
                  Add to cart
                </button>
              </div>
              <h3>
                <a href={p.href}>{p.name}</a>
              </h3>
            </article>
          ))}
        </Carousel>
      </div>
    </section>
  );
}
