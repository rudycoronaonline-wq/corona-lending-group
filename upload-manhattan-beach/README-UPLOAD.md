# Upload Manhattan Beach Page to Your Live Site

Use this folder when **rudycorona.com** is hosted somewhere that is **not** building from the corona-lending-group repo (e.g. WordPress, Wix, GoDaddy, or another Vercel project).

---

## Step 1: Upload these 2 files

Upload **both** files to your web host so they are served under one folder:

| File | Upload to (example) |
|------|----------------------|
| `index.html` | `/manhattan-beach-homes/index.html` or `public_html/manhattan-beach-homes/index.html` |
| `manhattan-beach-homes.CzNnD0MB.css` | **Same folder** as index.html (e.g. `/manhattan-beach-homes/manhattan-beach-homes.CzNnD0MB.css`) |

Resulting URL: **https://www.rudycorona.com/manhattan-beach-homes/** (or …/manhattan-beach-homes)

- **WordPress:** Use a “Custom HTML” page or “File Manager” / FTP to create a folder `manhattan-beach-homes` and put both files there. You may need a plugin or theme that allows serving static HTML at a path.
- **Static host / cPanel / FTP:** Create a folder named `manhattan-beach-homes` in your site root, upload `index.html` and `manhattan-beach-homes.CzNnD0MB.css` into it.
- **Vercel (different project):** Add this folder under your project’s `public` (or static) directory as `public/manhattan-beach-homes/` with both files inside.

---

## Step 2: Add the card on your Resources page

Wherever you edit the live **Resources** page, add **one new card** with:

- **Title:** Manhattan Beach Homes  
- **Description:** Homes for sale in Manhattan Beach CA 90266 & 90267 — Sand Section, Tree Section, Hill Section, East Manhattan & The Strand. Expert jumbo mortgage financing.  
- **Link:** `https://www.rudycorona.com/manhattan-beach-homes` or `/manhattan-beach-homes`  
- **Button/link text:** Read guide → (or similar)

---

## If the page doesn’t load or looks unstyled

- Confirm both files are in the **same folder** (e.g. `manhattan-beach-homes/`).
- Open the page and check the browser dev tools (F12 → Network). If the CSS file shows 404, the path to the CSS is wrong — the link in `index.html` must point to `manhattan-beach-homes.CzNnD0MB.css` in the same directory.

---

## If you later switch to the repo deployment

Once the live site is built from the **corona-lending-group** repo (e.g. Vercel connected to that repo, branch `main`), you can remove this uploaded folder; the site will serve `/manhattan-beach-homes` from the build automatically.
