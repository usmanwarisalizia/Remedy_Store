import React, { useEffect, useRef } from "react";
import { Icon } from "../shared";
import { nav } from "../navigation";
export default function Header({ count, open }) {
  const banner = useRef(null);
  const navRef = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      navRef.current?.classList.toggle("is-stuck", entry.boundingClientRect.bottom <= 0);
    });
    observer.observe(banner.current);
    return () => observer.disconnect();
  }, []);
  return (
    <>
      <aside className="announcement" ref={banner}>
        NOW SHIPPING INTERNATIONALLY 🌎
      </aside>{" "}
      <nav
        aria-label="Main navigation"
        className="site-nav"
        ref={navRef}
      >
        <a className="brand" href="#top" aria-label="Remedy home">
          <img src="/media/wordmark.svg" alt="" width="507" height="99" />
        </a>
        <div className="navlinks">
          {nav.map(([label, url]) => (
            <a key={label} href={url}>
              {label}
              {label === "Bundles" && <small>BLACK FRIDAY 30% OFF</small>}
            </a>
          ))}
        </div>
        <a className="iconbtn" href="#account" aria-label="My account">
          <Icon name="account" />
        </a>
        <button
          className="iconbtn"
          onClick={() => open("cart")}
          aria-label={"Shopping bag, " + count + " items"}
        >
          <Icon name="cart" />
          {count > 0 && <sup>{count}</sup>}
        </button>
        <button
          className="iconbtn menu-toggle"
          aria-label="Open menu"
          onClick={() => open("menu")}
        >
          <Icon name="menu" />
        </button>
      </nav>
    </>
  );
}
