/**
 * Generates _page.html + index.astro for custom blog posts from markdown + template.
 * Run: node scripts/generate-custom-blog-batch.mjs
 */
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';
import { marked } from 'marked';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const templatePath = path.join(root, 'src/pages/blog/how-to-get-pre-approved-mortgage/_page.html');
const contentDir = path.join(root, 'src/content/blog');

const TEMPLATE_SLUG = 'how-to-get-pre-approved-mortgage';

marked.use({ gfm: true, breaks: false });

const SLUGS = [
  'how-much-house-can-i-afford-southern-california',
  'down-payment-first-time-buyer-southern-california',
  'credit-score-to-buy-a-home-southern-california',
  'calhfa-down-payment-assistance-southern-california',
  'first-time-homebuyer-guide-southern-california',
  'self-employed-mortgage-guide',
  'how-reverse-mortgages-work-guide',
  'what-is-a-reverse-mortgage-how-does-it-work',
  'reverse-mortgage-myths-debunked',
  'is-a-reverse-mortgage-a-good-idea',
  'how-much-money-can-you-get-from-a-reverse-mortgage',
  'what-is-a-dscr-loan-real-estate-investors',
];

/** @type {Record<string, { h1: string; breadcrumb: string; ctaTitle: string; ctaSub: string }>} */
const OVERRIDES = {
  'how-much-house-can-i-afford-southern-california': {
    h1: 'How Much House Can I Afford in<br><em>Southern California</em>?',
    breadcrumb: 'Affordability',
    ctaTitle: 'Want Your Real Number?<br><em>Get Pre-Approved</em>',
    ctaSub:
      'A quick call can turn estimates into a verified budget — purchase price, payment, and loan options tailored to you.',
  },
  'down-payment-first-time-buyer-southern-california': {
    h1: 'The Honest Truth About Down Payments<br><em>for First-Time Buyers in SoCal</em>',
    breadcrumb: 'Down Payments',
    ctaTitle: 'Ready to See What You Actually Need?<br><em>Let’s Talk Numbers</em>',
    ctaSub:
      'We’ll walk through minimums, PMI, closing costs, and assistance programs that may apply to your situation.',
  },
  'credit-score-to-buy-a-home-southern-california': {
    h1: 'What Credit Score Do You Actually Need<br><em>to Buy a Home?</em>',
    breadcrumb: 'Credit & Buying',
    ctaTitle: 'Not Sure Where Your Score Stands?<br><em>Get a Clear Plan</em>',
    ctaSub:
      'We can review your credit profile and map the fastest path to the right loan program in Southern California.',
  },
  'calhfa-down-payment-assistance-southern-california': {
    h1: 'CalHFA & Down Payment Assistance<br><em>in Southern California</em>',
    breadcrumb: 'CalHFA & Assistance',
    ctaTitle: 'See Which Programs You Qualify For<br><em>Free Consultation</em>',
    ctaSub:
      'State, county, and city programs change often. We’ll check every option that fits your file.',
  },
  'first-time-homebuyer-guide-southern-california': {
    h1: '5 Things Every First-Time Homebuyer<br><em>in Southern California Needs to Know</em>',
    breadcrumb: 'First-Time Buyers',
    ctaTitle: 'Buying Your First Home in SoCal?<br><em>Start With a Plan</em>',
    ctaSub:
      'Get pre-approved, understand your costs, and shop with confidence — book a free 20-minute call.',
  },
  'self-employed-mortgage-guide': {
    h1: 'Self-Employed and Buying a Home?<br><em>Here Is What You Need to Know</em>',
    breadcrumb: 'Self-Employed',
    ctaTitle: 'Self-Employed Financing<br><em>Bank Statement & More</em>',
    ctaSub:
      'We work with lenders who understand real cash flow — not just what shows on a tax return.',
  },
  'how-reverse-mortgages-work-guide': {
    h1: 'How Reverse Mortgages Work<br><em>And Who They Are Really For</em>',
    breadcrumb: 'Reverse Mortgages',
    ctaTitle: 'Curious About a Reverse Mortgage?<br><em>Get Straight Answers</em>',
    ctaSub:
      'No pressure — just a clear look at whether a HECM or other option fits your goals.',
  },
  'what-is-a-reverse-mortgage-how-does-it-work': {
    h1: 'What Is a Reverse Mortgage<br><em>and How Does It Really Work?</em>',
    breadcrumb: 'Reverse Mortgages',
    ctaTitle: 'Explore Your Options at 62+<br><em>Free Consultation</em>',
    ctaSub:
      'Understand HECM basics, costs, and how equity can support your retirement plan.',
  },
  'reverse-mortgage-myths-debunked': {
    h1: '7 Reverse Mortgage Myths<br><em>Debunked</em>',
    breadcrumb: 'Reverse Myths',
    ctaTitle: 'Get the Facts — Not the Fear<br><em>Talk to Rudy</em>',
    ctaSub:
      'Separate outdated stories from today’s regulated HECM program in one honest conversation.',
  },
  'is-a-reverse-mortgage-a-good-idea': {
    h1: 'Is a Reverse Mortgage a Good Idea?<br><em>Honest Pros & Cons</em>',
    breadcrumb: 'Reverse Mortgages',
    ctaTitle: 'Wondering If It Fits You?<br><em>Let’s Decide Together</em>',
    ctaSub:
      'We’ll weigh your timeline, heirs, and cash-flow needs before you commit to anything.',
  },
  'how-much-money-can-you-get-from-a-reverse-mortgage': {
    h1: 'How Much Money Can You Get<br><em>from a Reverse Mortgage?</em>',
    breadcrumb: 'Reverse Amounts',
    ctaTitle: 'Want Real Numbers for Your Home?<br><em>We’ll Run Them</em>',
    ctaSub:
      'Principal limits depend on age, rates, and value — get an estimate for your Southern California property.',
  },
  'what-is-a-dscr-loan-real-estate-investors': {
    h1: 'What Is a DSCR Loan?<br><em>A Complete Guide for Investors</em>',
    breadcrumb: 'DSCR Loans',
    ctaTitle: 'Growing a Rental Portfolio?<br><em>See If DSCR Fits</em>',
    ctaSub:
      'Qualify from rental income — not tax returns. Book a call to compare DSCR vs conventional for your next deal.',
  },
};

function formatCategory(cat) {
  if (cat === 'seniors') return 'Seniors';
  if (cat === 'first-time-buyers') return 'First-Time Buyers';
  if (cat === 'investors') return 'Investors';
  if (cat === 'market-news') return 'Market News';
  return String(cat || '')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

/** Encode each path segment so spaces, ?, etc. do not break URLs */
function publicImagePath(src) {
  const s = String(src).replace(/^["']|["']$/g, '').trim();
  const clean = s.startsWith('/') ? s.slice(1) : s;
  return '/' + clean.split('/').filter(Boolean).map(encodeURIComponent).join('/');
}

function absImageUrl(src) {
  if (!src) return 'https://www.rudycorona.com/images/blog-placeholder.png';
  if (String(src).startsWith('http')) return src;
  return new URL(publicImagePath(src), 'https://www.rudycorona.com/').href;
}

const RELATED_POOL = [
  { slug: 'how-to-get-pre-approved-mortgage', cat: 'First-Time Buyers', title: 'How to Get Pre-Approved in a Few Clear Steps', img: '/images/Blog-3-simple-steps.png' },
  { slug: 'jumbo-loans-south-bay', cat: 'Market News', title: 'Jumbo Loans in the South Bay', img: '/images/jumbo-loans-south-bay-real-estate-guide-2026.png' },
  { slug: 'how-much-house-can-i-afford-southern-california', cat: 'First-Time Buyers', title: 'How Much House Can I Afford in SoCal?', img: '/images/How%20much%20house%20can%20I%20afford_.png' },
  { slug: 'what-is-a-dscr-loan-real-estate-investors', cat: 'Investors', title: 'What Is a DSCR Loan?', img: '/images/Blog-DSCR.png' },
  { slug: 'down-payment-first-time-buyer-southern-california', cat: 'First-Time Buyers', title: 'Down Payments for First-Time Buyers', img: '/images/The%20Honest%20Truth%20About%20Down%20Payments%20for%20First-Time%20Buyers%20in%20Southern%20California.png' },
  { slug: 'credit-score-to-buy-a-home-southern-california', cat: 'First-Time Buyers', title: 'Credit Score to Buy a Home', img: '/images/What%20Credit%20Score%20Do%20You%20Actually%20Need%20to%20Buy%20a%20Home%20in%20Southern%20California.png' },
  { slug: 'calhfa-down-payment-assistance-southern-california', cat: 'First-Time Buyers', title: 'CalHFA & Down Payment Assistance', img: '/images/CalHFA%20and%20Down%20Payment%20Assistance%20in%20Southern%20California%20A%20Complete%20Guide%20for%20First-Time%20Buyers.png' },
  { slug: 'first-time-homebuyer-guide-southern-california', cat: 'First-Time Buyers', title: 'First-Time Homebuyer Guide', img: '/images/Blog-California-1st-time-buyer.png' },
  { slug: 'self-employed-mortgage-guide', cat: 'First-Time Buyers', title: 'Self-Employed Home Loans', img: '/images/Blog-Self-Employed.png' },
  { slug: 'how-reverse-mortgages-work-guide', cat: 'Seniors', title: 'How Reverse Mortgages Work', img: '/images/Blog-Reverse-mortgage.png' },
  { slug: 'what-is-a-reverse-mortgage-how-does-it-work', cat: 'Seniors', title: 'What Is a Reverse Mortgage?', img: '/images/what-is-reverse-mortgage-guide-featured.png' },
  { slug: 'reverse-mortgage-myths-debunked', cat: 'Seniors', title: 'Reverse Mortgage Myths Debunked', img: '/images/7-reverse-mortgage-myths-blog.png' },
  { slug: 'is-a-reverse-mortgage-a-good-idea', cat: 'Seniors', title: 'Is a Reverse Mortgage a Good Idea?', img: '/images/is-reverse-mortgage-good-idea.png' },
  { slug: 'how-much-money-can-you-get-from-a-reverse-mortgage', cat: 'Seniors', title: 'How Much From a Reverse Mortgage?', img: '/images/how-much-money-reverse-mortgage-guide.png' },
];

function pickRelated(currentSlug, categoryLabel) {
  const others = RELATED_POOL.filter((p) => p.slug !== currentSlug);
  const same = others.filter((p) => p.cat === categoryLabel);
  const rest = others.filter((p) => p.cat !== categoryLabel);
  return [...same, ...rest].slice(0, 3);
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function stripTags(html) {
  return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

function extractH2Titles(html) {
  const re = /<h2[^>]*>([\s\S]*?)<\/h2>/gi;
  const titles = [];
  let m;
  while ((m = re.exec(html)) !== null) {
    titles.push(stripTags(m[1]));
  }
  return titles;
}

function buildTocHtml(titles) {
  return titles
    .map(
      (t, i) =>
        `              <li><a href="#" onclick="scrollToH2(${i});return false;">${escapeHtml(t)}</a></li>`
    )
    .join('\n');
}

function buildRelatedHtml(related) {
  return related
    .map(
      (p) => `            <a href="https://www.rudycorona.com/blog/${p.slug}/" class="related-post">
              <img src="${absImageUrl(p.img)}" alt="" class="related-post-img" />
              <div>
                <div class="related-post-cat">${escapeHtml(p.cat)}</div>
                <div class="related-post-title">${escapeHtml(p.title)}</div>
              </div>
            </a>`
    )
    .join('\n');
}

function formatDateLong(d) {
  const dt = d instanceof Date ? d : new Date(d);
  return dt.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

function replaceRelatedWidget(html, related) {
  const idx = html.indexOf('📚 Related Articles');
  if (idx === -1) throw new Error('Related Articles marker not found');
  const widgetStart = html.lastIndexOf('<div class="sidebar-widget">', idx);
  const asidePos = html.indexOf('\n      </aside>', idx);
  if (asidePos === -1) throw new Error('aside not found after Related');
  const inner = `        <div class="sidebar-widget">
          <div class="sidebar-widget-header" style="background:var(--sand);border-bottom:1px solid var(--sand-dark);">
            <h4 style="color:var(--navy);">📚 Related Articles</h4>
          </div>
          <div class="sidebar-widget-body" style="padding:0.75rem 1.25rem;">
${buildRelatedHtml(related)}
          </div>
        </div>

`;
  return html.slice(0, widgetStart) + inner + html.slice(asidePos);
}

async function main() {
  const template = await fs.readFile(templatePath, 'utf8');

  for (const slug of SLUGS) {
    let html = template;
    const mdPath = path.join(contentDir, `${slug}.md`);
    const raw = await fs.readFile(mdPath, 'utf8');
    const { data, content } = matter(raw);
    const seoTitle = data.seoTitle ?? data.title;
    const description = data.description ?? '';
    const title = data.title ?? slug;
    let image = data.image ?? '/images/blog-placeholder.png';
    if (typeof image === 'string' && image.startsWith('"') && image.endsWith('"')) {
      image = image.slice(1, -1);
    }
    const date = data.date;
    const categoryLabel = formatCategory(data.category);

    let bodyHtml = marked.parse(content.trim());
    bodyHtml = bodyHtml.replace(/<h1[^>]*>[\s\S]*?<\/h1>\s*/i, '');

    const h2Titles = extractH2Titles(bodyHtml);
    const wordCount = stripTags(bodyHtml).split(/\s+/).filter(Boolean).length;
    const readMin = Math.max(1, Math.round(wordCount / 200));

    const ov = OVERRIDES[slug];
    if (!ov) throw new Error(`Missing OVERRIDES for ${slug}`);

    const canonical = `https://www.rudycorona.com/blog/${slug}/`;
    const ogImage = absImageUrl(image);
    const shareTweet = encodeURIComponent(String(title).replace(/\s+/g, ' ').slice(0, 200));

    const tags = [
      categoryLabel,
      'Mortgage Tips',
      'Southern California',
      data.category === 'seniors' ? 'Retirement' : data.category === 'investors' ? 'Real Estate Investing' : 'Homebuyers',
    ].filter((v, i, a) => a.indexOf(v) === i);

    const tagsHtml = tags.map((t) => `  <span class="post-tag">${escapeHtml(t)}</span>`).join('\n');

    const related = pickRelated(slug, categoryLabel);

    html = html.replace(
      new RegExp(`https://www.rudycorona.com/blog/${TEMPLATE_SLUG}/`, 'g'),
      canonical
    );

    html = html.replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(seoTitle)}</title>`);
    html = html.replace(/<meta name="description" content="[^"]*"/, `<meta name="description" content="${escapeHtml(description)}"`);
    html = html.replace(/<link rel="canonical" href="[^"]*"/, `<link rel="canonical" href="${canonical}"`);
    html = html.replace(/<meta property="og:image" content="[^"]*"/, `<meta property="og:image" content="${ogImage}"`);
    html = html.replace(/<meta name="twitter:image" content="[^"]*"/, `<meta name="twitter:image" content="${ogImage}"`);

    html = html.replace(
      /<nav class="post-breadcrumb"[\s\S]*?<\/nav>/,
      `<nav class="post-breadcrumb" aria-label="Breadcrumb">
        <a href="https://www.rudycorona.com">Home</a>
        <span>›</span>
        <a href="https://www.rudycorona.com/blog">Blog</a>
        <span>›</span>
        <span>${escapeHtml(ov.breadcrumb)}</span>
      </nav>`
    );

    html = html.replace(/<div class="post-cat-badge">[^<]*<\/div>/, `<div class="post-cat-badge">${escapeHtml(categoryLabel)}</div>`);
    html = html.replace(/<h1>[\s\S]*?<\/h1>/, `<h1>${ov.h1}</h1>`);

    const imgPath = publicImagePath(image);
    html = html.replace(
      /<div class="post-hero-img">\s*<img[^>]*\/>\s*<\/div>/,
      `<div class="post-hero-img">
        <img src="${imgPath}" alt="${escapeHtml(title)}" />
      </div>`
    );

    html = html.replace(
      /<div class="post-byline-meta">[^<]*<\/div>/,
      `<div class="post-byline-meta">Mortgage Advisor · NMLS# 999113 &nbsp;·&nbsp; ${formatDateLong(date)} &nbsp;·&nbsp; ${readMin} min read</div>`
    );

    const shareInner = `          <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(canonical)}" target="_blank" rel="noopener" class="share-btn" title="Share on Facebook">f</a>
          <a href="https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(canonical)}" target="_blank" rel="noopener" class="share-btn" title="Share on LinkedIn">in</a>
          <a href="https://twitter.com/intent/tweet?url=${encodeURIComponent(canonical)}&text=${shareTweet}" target="_blank" rel="noopener" class="share-btn" title="Share on X">𝕏</a>`;

    html = html.replace(
      /<span class="post-share-label">Share<\/span>[\s\S]*?(?=\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/section>)/,
      `<span class="post-share-label">Share</span>\n${shareInner}\n        `
    );

    const articleInner = `
${bodyHtml}

<div class="post-tags">
${tagsHtml}
</div>

        <div style="margin-top:2rem;padding-top:1.5rem;border-top:1px solid var(--sand-dark);display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:1rem;">
          <a href="https://www.rudycorona.com/blog/" style="display:inline-flex;align-items:center;gap:0.4rem;font-size:0.88rem;font-weight:700;color:var(--sky);text-decoration:none;" onmouseover="this.style.color='var(--navy)'" onmouseout="this.style.color='var(--sky)'">← Back to all articles</a>
          <div style="display:flex;gap:0.5rem;">
            <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(canonical)}" target="_blank" rel="noopener" class="share-btn" style="background:var(--sky-light);color:var(--navy);border-color:rgba(74,144,217,0.3);" title="Share on Facebook">f</a>
            <a href="https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(canonical)}" target="_blank" rel="noopener" class="share-btn" style="background:var(--sky-light);color:var(--navy);border-color:rgba(74,144,217,0.3);" title="Share on LinkedIn">in</a>
          </div>
        </div>
`;

    html = html.replace(/<article class="post-body">[\s\S]*?<\/article>/m, `<article class="post-body">\n\n${articleInner}\n\n      </article>`);

    html = html.replace(/<ul class="toc-list">[\s\S]*?<\/ul>/, `<ul class="toc-list">\n${buildTocHtml(h2Titles)}\n            </ul>`);

    html = replaceRelatedWidget(html, related);

    html = html.replace(
      /<section class="post-bottom-cta">[\s\S]*?<\/section>/,
      `<section class="post-bottom-cta">
    <div style="max-width:600px;margin:0 auto;">
      <h2>${ov.ctaTitle}</h2>
      <p>${escapeHtml(ov.ctaSub)}</p>
      <div style="display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;">
        <a href="https://www.rudycorona.com/contact" class="btn-gold">Book a Free Consultation →</a>
        <a href="tel:+13105945362" class="btn-outline-white">📞 (310) 594-5362</a>
      </div>
    </div>
  </section>`
    );

    const outDir = path.join(root, 'src/pages/blog', slug);
    await fs.mkdir(outDir, { recursive: true });
    await fs.writeFile(path.join(outDir, '_page.html'), html, 'utf8');
    const indexAstro = `---
export const prerender = true;
import pageHtml from './_page.html?raw';
---
<Fragment set:html={pageHtml} />
`;
    await fs.writeFile(path.join(outDir, 'index.astro'), indexAstro, 'utf8');
    console.log('Wrote', slug);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
