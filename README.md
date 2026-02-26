# Corona Lending Group — Website

Production-ready mortgage advisor website for **Corona Lending Group** (Rudy Corona). Built with Astro 4 and Tailwind CSS.

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:4321](http://localhost:4321).

## Build for production

```bash
npm run build
npm run preview   # optional: preview the static build
```

Output is in `dist/` (static site, ready for Netlify/Vercel).

## Project structure

- **`src/layouts/Layout.astro`** — Main layout (SEO, Header, Footer).
- **`src/components/`** — Header, Footer, ServiceCard, TestimonialCard, FAQAccordion, ContactForm, BlogCard, CTABanner, TrustBar.
- **`src/pages/`** — All routes: Home, About, Services, Blog, Testimonials, FAQ, Contact, Privacy.
- **`src/data/`** — `services.ts`, `testimonials.ts`, `faqs.ts`.
- **`src/content/blog/`** — Markdown blog posts (content collection).
- **`public/`** — Static assets; put images in `public/images/`.

## High Level CRM webhook (contact form)

1. In High Level, create a **Webhook** or **API endpoint** that accepts POST requests with JSON body.
2. Map the expected fields (e.g. `first_name`, `last_name`, `email`, `phone`, `loan_type`, `message`, `source`).
3. Copy the webhook URL.
4. In **`src/components/ContactForm.astro`**, replace the placeholder:

   ```js
   const HL_WEBHOOK = 'YOUR_HIGHLEVEL_WEBHOOK_URL';
   ```

   with your actual URL, e.g.:

   ```js
   const HL_WEBHOOK = 'https://services.leadconnectorhq.com/hooks/...';
   ```

5. Rebuild and deploy. Form submissions will POST to that URL with `Content-Type: application/json`. The form also sends a hidden `source: 'website-contact-form'` field.

## Adding blog content

- **New post:** Add a `.md` file under **`src/content/blog/`**.
- **Required frontmatter:**

  ```yaml
  title: Your Post Title
  description: Short description for SEO and cards
  pubDate: 2024-03-15
  author: Rudy Corona
  category: first-time-buyers   # or refinance | seniors | investors | market-news
  featured: false
  ```

- **Optional:** `image: /images/blog/your-image.jpg`
- Write the body in Markdown below the frontmatter.

The blog index at `/blog` lists all posts (filterable by category). Each post is available at `/blog/<filename-without-extension>`.

## Before launch

1. **Images:** Add to `public/images/`:
   - `logo.png` — Header/footer logo
   - `rudy-headshot.jpg` — Hero and About
   - `og-image.jpg` — 1200×630 for social sharing
   - Optional: `hero-bg.jpg`, `services/*.jpg`
2. **NMLS:** Replace `123456` with your real NMLS number in:
   - `src/components/Header.astro`
   - `src/components/Footer.astro`
   - `src/components/TrustBar.astro`
   - `src/pages/privacy.astro`
   - `src/pages/contact.astro`
3. **Contact:** Update phone number and email in Header, Footer, and Contact page.
4. **Calendar:** Replace the “Book a call” placeholder on the Contact page with your Calendly or High Level scheduler embed.
5. **Domain:** Set `site` in `astro.config.mjs` and in `src/layouts/Layout.astro` if you use a different domain than `https://coronalendinggroup.com`.

## Deploy (Netlify / Vercel)

- **Build command:** `npm run build`
- **Publish directory:** `dist`
- Connect your repo and add your custom domain.

---

Built for Corona Lending Group · Rudy Corona · rudycoronaonline@gmail.com
