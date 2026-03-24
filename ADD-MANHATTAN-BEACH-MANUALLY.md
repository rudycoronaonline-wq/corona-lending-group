# Add Manhattan Beach to Your Live Resources Page (Manual)

Your live site is **not** deploying from this repo, so changes here never appear. Use one of these:

---

## Option 1: Fix the deployment (recommended)

The site that serves **rudycorona.com** must build from this GitHub repo:

- **Repo:** `rudycoronaonline-wq/corona-lending-group`
- **Branch:** `main`

**In Vercel:** Project that has rudycorona.com â†’ **Settings** â†’ **Git** â†’ set **Connected Repository** to that repo and **Production Branch** to `main` â†’ **Redeploy**.

Then the live Resources page and the Manhattan Beach page will both update automatically.

---

## Option 2: Add the card and link where you edit the live site

If you edit the Resources page in a CMS (WordPress, Webflow, etc.) or in another codebase, add this as one new card/link:

**Title:** Manhattan Beach Homes  

**Description:** Homes for sale in Manhattan Beach CA 90266 & 90267 â€” Sand Section, Tree Section, Hill Section, East Manhattan & The Strand. Expert jumbo mortgage financing.

**Link (URL):**  
`https://www.rudycorona.com/resources/manhattan-beach-homes`  
or  
`/resources/manhattan-beach-homes`

**Button/link text:** Read guide â†’

---

## Option 3: Host the Manhattan Beach page yourself

The full Manhattan Beach page is built in this project. After you run `npm run build`:

- Built page: `dist/resources/manhattan-beach-homes/index.html`
- CSS: `dist/_astro/manhattan-beach-homes.*.css`

To have the link work, your server must serve that page at the URL `/resources/manhattan-beach-homes` (or `.../manhattan-beach-homes/`). That usually means either:

- Deploying this whole project (Option 1), or  
- Uploading the contents of `dist/resources/manhattan-beach-homes/` and the required `_astro` CSS file to your current host at the same path.

---

## Summary

| Goal | What to do |
|------|------------|
| Live site updates when you push | Connect Vercel to `rudycoronaonline-wq/corona-lending-group`, branch `main` (Option 1). |
| Only add the card on current site | Add one new card with the title, description, and link above (Option 2). The link will 404 until the page is available at that URL. |
| Have the Manhattan Beach page live | Either fix deployment (Option 1) or upload the built page and assets (Option 3). |

