import { readFile, writeFile, rm } from "node:fs/promises";
import { render } from "../.ssr/prerender.js";
const template = await readFile("dist/index.html", "utf8");
const stylesheet = template.match(
  /<link rel="stylesheet"[^>]*href="([^"]+)"[^>]*>/,
);
const css = await readFile("dist" + stylesheet[1], "utf8");
const html = template
  .replace(stylesheet[0], () => "<style>" + css + "</style>")
  .replace("<!--app-->", () => render());
await writeFile("dist/index.html", html);
await rm(".ssr", { recursive: true, force: true });
