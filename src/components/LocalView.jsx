import articles from "../articles.json";
import React, { useEffect, useState } from "react";
import { Dialog, Photo, products, bundles, allProducts } from "../shared";
const money = (price) =>
  (price / 100).toLocaleString("en-US", { style: "currency", currency: "USD" });
const pages = {
  account: [
    "My account",
    "Your shopping bag is saved in this browser. This preview supports guest browsing.",
  ],
  rewards: [
    "The Lab, Rewards Program",
    "Rewards enrollment is available through the merchant. This preview does not collect membership details.",
  ],
  contact: [
    "Contact Us",
    "Customer service messages are unavailable in this storefront preview.",
  ],
  faq: [
    "FAQs",
    "Your bag is stored on this device. Open any product to view its details and price, then choose Add to cart.",
  ],
  retail: [
    "Find Us In Target",
    "Retail store availability is not connected to this preview.",
  ],
  privacy: [
    "Privacy Policy",
    "This preview uses local storage for your shopping bag. Campaign and customer videos are delivered by external media hosts.",
  ],
  terms: [
    "Terms & Conditions",
    "This preview lets you browse products and review a bag. It does not accept orders or payments.",
  ],
  "about-details": [
    "Dermatology for all",
    "Remedy was created by dermatologist Dr. Muneeb Shah. Explore the formulations and customer stories on this page.",
  ],
  "formulation-details": [
    "Do No Harm",
    "Remedy describes its formulas as dermatologist-developed, hypoallergenic and clinically tested. The formulation principles on this page explain its approach.",
  ],
};
function matches(query) {
  const words = query.toLowerCase().match(/[a-z]+/g) || [];
  return products
    .map((p) => ({
      p,
      score: words.filter(
        (w) =>
          w.length > 2 &&
          (p.name + " " + (p.description || "")).toLowerCase().includes(w),
      ).length,
    }))
    .filter((x) => x.score)
    .sort((a, b) => b.score - a.score)
    .map((x) => x.p);
}
function Links({ list }) {
  return (
    <div className="local-list">
      {list.map((p) => (
        <a key={p.id} href={p.href}>
          {p.name} · {money(p.price)}
        </a>
      ))}
    </div>
  );
}
function Routine() {
  const [choice, setChoice] = useState("");
  return (
    <>
      <p>Choose a focus to explore matching products.</p>
      <div className="local-list">
        {["Hydration", "Dark spots", "Firming"].map((t) => (
          <button
            key={t}
            aria-pressed={choice === t}
            onClick={() => setChoice(t)}
          >
            {t}
          </button>
        ))}
      </div>
      {choice && (
        <Links
          list={matches(
            choice === "Hydration" ? "hydrating moisture" : choice,
          ).slice(0, 3)}
        />
      )}
    </>
  );
}
export default function LocalView({ items, cart, add }) {
  const [route, setRoute] = useState("");
  useEffect(() => {
    function sync() {
      try {
        setRoute(decodeURIComponent(location.hash.slice(1)));
      } catch {
        setRoute("");
      }
    }
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);
  const product = allProducts.find((p) => route === "product-" + p.id);
  let title, content;
  if (product) {
    title = product.name;
    content = (
      <>
        <Photo
          className="local-product"
          name={product.pack}
          alt={product.name}
        />
        <p>{product.description}</p>
        <strong>{money(product.price)}</strong>
        <p>
          <button className="pill" onClick={() => add(product.id)}>
            Add to cart
          </button>
        </p>
      </>
    );
  } else if (route === "bundles") {
    title = "Bundles";
    content = <Links list={bundles} />;
  } else if (route === "routine") {
    title = "Build my Routine";
    content = <Routine />;
  } else if (route.startsWith("article/")) {
    const article = articles.find((a) => a.slug === route.slice(8));
    if (!article) return null;
    title = article.title;
    content = (
      <>
        <p>{article.excerpt}</p>
        <a className="pill" href={"#search/" + article.category}>
          More in {article.category}
        </a>
      </>
    );
  } else if (route.startsWith("search/")) {
    const q = route.slice(7),
      words = q.toLowerCase().match(/[a-z]{3,}/g) || [];
    const results = articles.filter(
      (a) =>
        q === "Index" ||
        a.category === q ||
        words.some((w) =>
          (a.title + " " + a.excerpt).toLowerCase().includes(w),
        ),
    );
    title = "Skinpedia";
    content = (
      <>
        <h3>{q}</h3>
        {results.length ? (
          <div className="local-list">
            {results.map((a) => (
              <a key={a.slug} href={"#article/" + a.slug}>
                {a.title}
              </a>
            ))}
          </div>
        ) : (
          <>
            <p>No matching articles in the preview.</p>
            <a href="#search/Index">Browse article index</a>
          </>
        )}
      </>
    );
  } else if (route === "checkout") {
    title = "Checkout summary";
    content = (
      <>
        {items.map((p) => (
          <p key={p.id}>
            {p.name} × {cart[p.id]} · {money(cart[p.id] * p.price)}
          </p>
        ))}
        <strong>
          Subtotal {money(items.reduce((n, p) => n + p.price * cart[p.id], 0))}
        </strong>
        <p>Payments are unavailable in this preview.</p>
        <a className="pill" href="#shop">
          Continue shopping
        </a>
      </>
    );
  } else if (route.startsWith("channel/")) {
    title = route.slice(8);
    content = (
      <p>
        This channel is hosted outside the storefront. You can continue
        exploring here.
      </p>
    );
  } else if (Object.hasOwn(pages, route)) {
    title = pages[route][0];
    content = <p>{pages[route][1]}</p>;
  } else return null;
  function close() {
    history.replaceState(null, "", location.pathname + location.search);
    setRoute("");
  }
  return (
    <Dialog label={title} close={close} drawer>
      <div className="local-content">{content}</div>
    </Dialog>
  );
}
