/**
 * One-off: replace <div class="areas-grid">...</div> with ServiceAreaCityGrid in *-homes.astro only.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pagesDir = path.join(__dirname, "..", "src", "pages");

const pages = [
  ["manhattan-beach-homes.astro", "manhattan-beach-homes"],
  ["hermosa-beach-homes.astro", "hermosa-beach-homes"],
  ["redondo-beach-homes.astro", "redondo-beach-homes"],
  ["torrance-homes.astro", "torrance-homes"],
  ["gardena-homes.astro", "gardena-homes"],
  ["san-pedro-homes.astro", "san-pedro-homes"],
  ["carson-homes.astro", "carson-homes"],
  ["lawndale-homes.astro", "lawndale-homes"],
  ["long-beach-homes.astro", "long-beach-homes"],
  ["wilmington-homes.astro", "wilmington-homes"],
  ["lomita-homes.astro", "lomita-homes"],
  ["palos-verdes-homes.astro", "palos-verdes-homes"],
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
  // Empty frontmatter: ---\n---\n (second --- must be its own line)
  const emptyFm = /^---\r?\n---\r?\n/;
  if (emptyFm.test(content)) {
    return content.replace(emptyFm, `---\n${IMPORT_LINE}\n---\n`);
  }
  const fm = /^---\r?\n([\s\S]*?)\r?\n---\r?\n/;
  const m = content.match(fm);
  if (!m) throw new Error("No frontmatter");
  const inner = m[1];
  const newInner = inner.trim() ? `${inner.trim()}\n${IMPORT_LINE}` : IMPORT_LINE;
  return content.replace(fm, `---\n${newInner}\n---\n`);
}

for (const [file, slug] of pages) {
  const fp = path.join(pagesDir, file);
  let content = fs.readFileSync(fp, "utf8");
  const start = content.indexOf(START);
  if (start === -1) {
    console.error("Missing areas-grid:", file);
    process.exit(1);
  }
  const end = findMatchingCloseDiv(content, start);
  if (end === -1) {
    console.error("Could not parse grid:", file);
    process.exit(1);
  }
  const replacement = `<ServiceAreaCityGrid excludeSlug="${slug}" />`;
  content = content.slice(0, start) + replacement + content.slice(end);
  content = ensureImport(content);
  fs.writeFileSync(fp, content);
  console.log("OK", file);
}
