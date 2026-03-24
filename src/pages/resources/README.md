# Resources page source

The live `/resources/` page uses **`public/resources/index.html`** (full site header/footer + card grid).

Do **not** add `index.astro` here — it would replace that layout with the minimal blog-style page.

After editing `public/resources/index.html`, copy to `dist/resources/index.html` before deploy (or run your usual dist workflow).
