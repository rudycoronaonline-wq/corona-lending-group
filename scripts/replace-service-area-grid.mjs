/**
 * Replaces <div class="areas-grid">...</div> with <ServiceAreaCityGrid />
 * and adds Astro import when missing.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pagesDir = path.join(__dirname, "..", "src", "pages");

const files = [
  "manhattan-beach-homes.astro",
  "hermosa-beach-homes.astro",
  "redondo-beach-homes.astro",
  "torrance-homes.astro",
  "gardena-homes.astro",
  "san-pedro-homes.astro",
  "carson-homes.astro",
  "lawndale-homes.astro",
  "long-beach-homes.astro",
  "wilmington-homes.astro",
  "lomita-homes.astro",
  "palos-verdes-homes.astro",
];

const START = '<div class="areas-grid">';
const IMPORT_LINE = "import ServiceAreaCityGrid from '../components/ServiceAreaCityGrid.astro';";

function findMatchingCloseDiv(html, startIdx) {
  let i = startIdx + START.length;
  let depth = 1;
  while (i < html.length && depth > 0) {
    const nextOpen = html.indexOf("<div", i);
    const nextClose = html.indexOf("</div>", i);
    if (nextClose === -1) return -1;
    if (nextOpen !== -1 && nextOpen < nextClose) {
      depth++;
      i = nextOpen + 4;
    } else {
      depth--;
      i = nextClose + 6;
    }
  }
  return i;
}

function ensureImport(content) {
  if (content.includes("import ServiceAreaCityGrid")) return content;
  const fm = /^---\r?\n([\s\S]*?)\r?\n---/;
  const m = content.match(fm);
  if (!m) throw new Error("No frontmatter");
  const inner = m[1];
  if (inner.includes("import ServiceAreaCityGrid")) return content;
  const newInner = inner.trim() ? `${inner.trim()}\n${IMPORT_LINE}` : IMPORT_LINE;
  return content.replace(fm, `---\n${newInner}\n---`);
}

for (const f of files) {
  const fp = path.join(pagesDir, f);
  let content = fs.readFileSync(fp, "utf8");
  const start = content.indexOf(START);
  if (start === -1) {
    console.error("Missing areas-grid:", f);
    process.exit(1);
  }
  const end = findMatchingCloseDiv(content, start);
  if (end === -1) {
    console.error("Could not parse grid:", f);
    process.exit(1);
  }
  const replacement = "<ServiceAreaCityGrid />";
  content = content.slice(0, start) + replacement + content.slice(end);
  content = ensureImport(content);
  fs.writeFileSync(fp, content);
  console.log("OK", f);
}
