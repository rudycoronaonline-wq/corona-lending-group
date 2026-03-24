import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
function walk(dir) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(p);
    else if (ent.name.endsWith('.html')) {
      let s = fs.readFileSync(p, 'utf8');
      const orig = s;
      s = s.replace(
        /<link rel="canonical" href="https:\/\/coronalendinggroup\.com/gi,
        '<link rel="canonical" href="https://www.rudycorona.com'
      );
      s = s.replace(/<link rel="canonical" href="(https:\/\/www\.rudycorona\.com[^"]*)"/gi, (full, url) => {
        if (url.endsWith('/')) return full;
        return `<link rel="canonical" href="${url}/"`;
      });
      if (s !== orig) fs.writeFileSync(p, s);
    }
  }
}

walk(root);
console.log('done');
