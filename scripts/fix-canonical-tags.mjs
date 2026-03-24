/**
 * Rewrites ONLY <link rel="canonical" href="..."> attributes in HTML files.
 * Does not modify image, script, og:, or JSON-LD URLs.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const roots = [
  path.join(__dirname, '..', 'dist'),
  path.join(__dirname, '..', 'public'),
];

function walkHtml(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walkHtml(p, out);
    else if (ent.name.endsWith('.html')) out.push(p);
  }
  return out;
}

function fixCanonical(html) {
  return html.replace(
    /<link\s+rel="canonical"\s+href="([^"]*)"/gi,
    (match, href) => {
      let url = href;
      if (/coronalendinggroup\.com/i.test(url)) {
        url = url.replace(/^https?:\/\/coronalendinggroup\.com/i, 'https://www.rudycorona.com');
      }
      if (url.startsWith('https://www.rudycorona.com')) {
        try {
          const u = new URL(url);
          if (u.pathname !== '/' && !u.pathname.endsWith('/')) {
            u.pathname += '/';
          }
          url = u.href;
        } catch {
          /* keep original */
        }
      }
      return `<link rel="canonical" href="${url}"`;
    },
  );
}

let changed = 0;
for (const root of roots) {
  for (const f of walkHtml(root)) {
    const raw = fs.readFileSync(f, 'utf8');
    const next = fixCanonical(raw);
    if (next !== raw) {
      fs.writeFileSync(f, next, 'utf8');
      changed++;
    }
  }
}
console.log(`Updated canonical in ${changed} HTML file(s).`);
