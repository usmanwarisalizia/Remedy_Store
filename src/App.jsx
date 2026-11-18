import React, { useState, useEffect, useCallback } from "react";
import { Dialog, Icon, Photo, allProducts } from "./shared";
import { nav } from "./navigation";
import Hero from "./components/Hero";
import Products from "./components/Products";
import Stories from "./components/Stories";
import Editorial from "./components/Editorial";
import Skinpedia from "./components/Skinpedia";
import Footer from "./components/Footer";
import Belief from "./components/Belief";
import LocalView from "./components/LocalView";
function readCart() {
  try {
    const stored = JSON.parse(localStorage.getItem("remedy-bag") || "{}");
    return Object.fromEntries(
      allProducts
        .filter((p) => Number.isInteger(stored?.[p.id]) && stored[p.id] > 0)
        .map((p) => [p.id, Math.min(99, stored[p.id])]),
    );
  } catch {
    return {};
  }
}
const fmt = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });
export const dollars = (n) => fmt.format(n / 100);
export default function App() {
  const [cart, setCart] = useState({}),
    [ready, setReady] = useState(false),
    [panel, setPanel] = useState("");
  useEffect(() => {
    setCart(readCart());
    setReady(true);
  }, []);
  useEffect(() => {
    if (ready)
      try {
        localStorage.setItem("remedy-bag", JSON.stringify(cart));
      } catch {}
  }, [cart, ready]);
  function change(id, n) {
    setCart((old) => {
      const next = { ...old },
        v = Math.min(99, (next[id] || 0) + n);
      if (v > 0) next[id] = v;
      else delete next[id];
      return next;
    });
  }
  const count = Object.values(cart).reduce((a, b) => a + b, 0),
    items = allProducts.filter((p) => cart[p.id]);
  const addToCart = useCallback((id) => { change(id, 1); setPanel("cart"); }, []);
  const openPanel = useCallback((p) => setPanel(p), []);
  return (
    <div id="top">
      <a className="skip" href="#main">
        Skip to content
      </a>
      <Hero count={count} open={openPanel} />
      <main id="main">
        <Products add={addToCart} />
        <Belief />
        <Editorial />
        <Stories add={addToCart} />
        <Editorial type="harm" />
        <Skinpedia />
      </main>
      <Footer open={openPanel} />
      <button
        className="access-shortcut"
        aria-label="Accessibility options"
        onClick={() => setPanel("access")}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.3"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="4.5" r="1.7" fill="currentColor" />
          <path d="M4 8l8 2 8-2M12 10v5m0 0-4 7m4-7 4 7" />
        </svg>
      </button>
      {panel && (
        <Dialog
          label={
            { cart: "Your bag", menu: "Menu", access: "Accessibility" }[panel]
          }
          close={() => setPanel("")}
          drawer
        >
          {panel === "cart" ? (
            count ? (
              <>
                <div className="cart-list">
                  {items.map((p) => (
                    <article key={p.id}>
                      <Photo name={p.pack} />
                      <div>
                        <a href={p.href} onClick={() => setPanel("")}>
                          <b>{p.name}</b>
                        </a>
                        {p.price != null && <p>{dollars(p.price)}</p>}
                        <div className="quantity">
                          <button
                            aria-label={"Decrease " + p.name + " quantity"}
                            onClick={() => change(p.id, -1)}
                          >
                            −
                          </button>
                          <output>{cart[p.id]}</output>
                          <button
                            disabled={cart[p.id] >= 99}
                            aria-label={"Increase " + p.name + " quantity"}
                            onClick={() => change(p.id, 1)}
                          >
                            +
                          </button>
                        </div>
                        <button
                          className="remove"
                          onClick={() => change(p.id, -cart[p.id])}
                        >
                          Remove
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
                {items.every((p) => p.price != null) && (
                  <p className="subtotal">
                    <b>Subtotal</b>
                    <b>
                      {dollars(
                        items.reduce((s, p) => s + p.price * cart[p.id], 0),
                      )}
                    </b>
                  </p>
                )}
                <a
                  className="pill checkout"
                  href="#checkout"
                  onClick={() => setPanel("")}
                >
                  Review checkout
                </a>
              </>
            ) : (
              <div className="empty">
                <p>Your bag is empty.</p>
                <a className="pill" href="#shop" onClick={() => setPanel("")}>
                  Find your Remedy
                </a>
              </div>
            )
          ) : panel === "menu" ? (
            <div className="menu-list">
              {nav.map(([n, u]) => (
                <a key={n} href={u} onClick={() => setPanel("")}>
                  {n}
                  <Icon name="arrow" />
                </a>
              ))}
            </div>
          ) : (
            <div className="empty">
              <p>
                Use Tab to move between controls and Escape to close panels.
                Your device’s reduced motion preference is respected.
              </p>
              <a className="pill" href="#main" onClick={() => setPanel("")}>
                Skip to main content
              </a>
            </div>
          )}
        </Dialog>
      )}
      <LocalView
        items={items}
        cart={cart}
        add={(id) => {
          change(id, 1);
          location.hash = "bag";
          setPanel("cart");
        }}
      />
    </div>
  );
}
