import React, { useState } from "react";
import { Photo } from "../shared";
import { useFadeIn } from "../hooks/useFadeIn";
const footerLinks = [
  ["Skinpedia", "#skinpedia"],
  ["About Us", "#about"],
  ["Our Formulations", "#formulations"],
  ["The Lab, Rewards Program", "#rewards"],
  ["Contact Us", "#contact"],
  ["FAQs", "#faq"],
  ["Find Us In Target", "#retail"],
  ["Privacy Policy", "#privacy"],
  ["Terms & Conditions", "#terms"],
];
export default function Footer({ open }) {
  const [message, setMessage] = useState("");
  const ref = useFadeIn();
  const links = (from, to) =>
    footerLinks.slice(from, to).map(([name, url]) => (
      <a key={name} href={url}>
        {name}
      </a>
    ));
  return (
    <footer className="anim-fade-up" ref={ref}>
      <section className="newsletter">
        <h2>Subscribe to good science</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setMessage("Newsletter delivery is unavailable in this preview.");
          }}
        >
          <div className="signup">
            <input type="hidden" name="g" value="WnHpHJ" />
            <input
              type="email"
              aria-label="Email address"
              name="email"
              placeholder="Enter your email"
              required
              autoComplete="email"
            />
            <button className="pill">Get informed</button>
          </div>
          <p role="status">
            {message ||
              "I consent to receiving promotional emails from Remedy Skin."}
          </p>
        </form>
      </section>
      <div className="foot-links">
        <Photo name="badge" alt="Remedy Science" />
        <div>
          {links(0, 4)}
          <button onClick={() => open("access")}>Accessibility</button>
        </div>
        <div>{links(4)}</div>
        <div className="social">
          <b>Skin health is a shared journey</b>
          <div className="social-icons">
            {[
              ["Instagram", "https://www.instagram.com/remedyskin/"],
              ["TikTok", "https://www.tiktok.com/@remedy.skin"],
              ["YouTube", "https://www.youtube.com/@Doctorly"],
            ].map(([n, u], i) => (
              <a key={n} href={"#channel/" + n} aria-label={n}>
                <img
                  loading="lazy"
                  alt=""
                  src={"/media/social-" + i + ".svg"}
                />
              </a>
            ))}
          </div>
          <b>Download our app</b>
          <div className="stores">
            <a href="#channel/Google%20Play">
              <Photo name="android" alt="Get it on Google Play" />
            </a>
            <a href="#channel/App%20Store">
              <Photo name="ios" alt="Download on the App Store" />
            </a>
          </div>
        </div>
      </div>
      <div className="foot-logo">
        <img
          src="/media/wordmark.svg"
          loading="lazy"
          alt="Remedy"
          width="507"
          height="99"
        />
        <small>© Remedy Science™ 2026</small>
      </div>
    </footer>
  );
}
