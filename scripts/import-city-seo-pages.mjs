/**
 * One-off: convert downloaded city SEO HTML → Astro + Formspree.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

const FORMSPREE = 'https://formspree.io/f/xpqyvdkg';

const formspreeTail = `  <script is:inline>
    (function () {
      var form = document.querySelector('#contact form');
      if (!form || !form.action || form.action.indexOf('formspree.io') === -1) return;
      var btn = form.querySelector('button[type="submit"]');
      var btnLabel = btn ? btn.textContent : '';
      function parseErr(data) {
        if (!data) return 'Something went wrong. Please call (310) 594-5362.';
        if (typeof data.error === 'string') return data.error;
        if (data.errors) {
          var e = data.errors;
          if (typeof e === 'string') return e;
          var k = Object.keys(e)[0];
          if (k && e[k]) return Array.isArray(e[k]) ? e[k][0] : e[k];
        }
        return 'Something went wrong. Please call (310) 594-5362.';
      }
      form.addEventListener('submit', async function (e) {
        e.preventDefault();
        var status = document.getElementById('form-status');
        if (btn) { btn.disabled = true; btn.textContent = 'Sending…'; }
        if (status) { status.textContent = ''; status.style.color = ''; }
        try {
          var fd = new FormData(form);
          var res = await fetch(form.action, {
            method: 'POST',
            body: fd,
            headers: { Accept: 'application/json' },
          });
          var data = {};
          try {
            data = await res.json();
          } catch (_) {}
          if (res.ok) {
            if (status) { status.textContent = 'Thanks — we received your request.'; status.style.color = '#166534'; }
            form.reset();
          } else {
            if (status) { status.textContent = parseErr(data); status.style.color = '#b91c1c'; }
          }
        } catch (err) {
          if (status) { status.textContent = 'Network error. Please try again or call (310) 594-5362.'; status.style.color = '#b91c1c'; }
        }
        if (btn) { btn.disabled = false; btn.textContent = btnLabel; }
      });
    })();
  </script>
`;

function processHtml(raw, subject) {
  let s = raw;
  s = s.replace(/<script type="application\/ld\+json">/g, '<script is:inline type="application/ld+json">');
  s = s.replace('<style>', '<style is:inline>');
  s = s.replace(
    /<form name="([^"]+)" method="POST" data-netlify="true"><input type="hidden" name="form-name" value="[^"]*"\/>/,
    `<form name="$1" method="POST" action="${FORMSPREE}"><input type="hidden" name="_subject" value="${subject}" /><input type="text" name="_gotcha" style="display:none" tabindex="-1" autocomplete="off" aria-hidden="true" />`
  );
  s = s.replace(
    /<button type="submit" class="btn-submit">Send My Request →<\/button><p class="form-disclaimer">/,
    '<button type="submit" class="btn-submit">Send My Request →</button>\n            <p id="form-status" class="form-status" role="status" aria-live="polite"></p>\n            <p class="form-disclaimer">'
  );
  s = s.replace(
    '.form-disclaimer { font-size: 0.7rem; color: var(--text-muted); text-align: center; margin-top: 0.7rem; line-height: 1.5; }',
    `.form-disclaimer { font-size: 0.7rem; color: var(--text-muted); text-align: center; margin-top: 0.7rem; line-height: 1.5; }
    .form-status { margin-top: 0.75rem; font-size: 0.92rem; font-weight: 600; min-height: 1.25em; text-align: center; }`
  );
  s = s.replace(/  <script>\n  document\.querySelectorAll\('\.zip-tab'\)/, `  <script is:inline>\n  document.querySelectorAll('.zip-tab')`);
  s = s.replace('</body>', formspreeTail + '\n</body>');
  return '---\n---\n' + s;
}

// Add { src, out, subject } entries to import city HTML from Downloads → src/pages/*.astro
const jobs = [];

for (const j of jobs) {
  const raw = fs.readFileSync(j.src, 'utf8');
  const outPath = path.join(root, 'src/pages', j.out);
  fs.writeFileSync(outPath, processHtml(raw, j.subject));
  console.log('Wrote', outPath);
}
