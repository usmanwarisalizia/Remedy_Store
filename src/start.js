import "./style.css";
const storefront = document.getElementById("root");
let pending;
function loadApp() {
  return (pending ??= import("./main.jsx"));
}
if (!storefront.firstElementChild || document.readyState === "complete")
  loadApp();
else {
  window.addEventListener("load", loadApp, { once: true });
  storefront.addEventListener("pointerdown", loadApp, {
    once: true,
    passive: true,
  });
  storefront.addEventListener("focusin", loadApp, { once: true });
}
// Replay a button press if it landed while the interactive bundle was loading.
function firstClick(event) {
  const button = event.target.closest("button");
  if (!button || button.form) return;
  event.preventDefault();
  event.stopPropagation();
  loadApp()
    .then((module) => module.ready)
    .then(() => button.isConnected && button.click());
}
storefront.addEventListener("click", firstClick, true);
window.addEventListener(
  "remedy-ready",
  () => storefront.removeEventListener("click", firstClick, true),
  { once: true },
);
