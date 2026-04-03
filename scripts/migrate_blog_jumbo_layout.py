"""
Align legacy blog _page.html files with jumbo / pre-approval layout pattern.
"""
from __future__ import annotations

import html as html_lib
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
BLOG = ROOT / "src" / "pages" / "blog"

SLUGS = [
    "income-needed-to-buy-home-redondo-beach",
    "down-payment-first-time-buyer-southern-california",
    "credit-score-to-buy-a-home-southern-california",
    "rent-vs-buy-southern-california",
    "calhfa-down-payment-assistance-southern-california",
    "first-time-homebuyer-guide-southern-california",
    "self-employed-mortgage-guide",
    "how-reverse-mortgages-work-guide",
    "reverse-mortgage-myths-debunked",
    "how-much-money-can-you-get-from-a-reverse-mortgage",
    "is-a-reverse-mortgage-a-good-idea",
    "what-is-a-dscr-loan-real-estate-investors",
]

CSS_INJECT = """
    .post-bottom-cta { background: linear-gradient(135deg, var(--navy-deep) 0%, var(--navy) 100%); padding: 4.5rem 1.5rem; text-align: center; margin-top: 3rem; }
    .post-bottom-cta h3 { color: #fff; font-family: var(--font-display); font-size: clamp(1.6rem,3vw,2.2rem); font-weight: 700; margin-bottom: 0.75rem; }
    .post-bottom-cta p { color: rgba(255,255,255,0.72); font-size: 1.02rem; max-width: 500px; margin: 0 auto 2rem; line-height: 1.7; }
    .post-bottom-cta-btns { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }
    .post-cta-btn { background: var(--gold); color: var(--navy-deep); padding: 0.9rem 2rem; border-radius: 8px; font-weight: 700; font-size: 0.96rem; text-decoration: none; display: inline-block; transition: filter 0.15s, transform 0.15s; }
    .post-cta-btn:hover { filter: brightness(1.08); transform: translateY(-1px); color: var(--navy-deep); text-decoration: none; }
    .post-cta-btn-sec { background: transparent; color: #7ec8f7; border: 2px solid rgba(126,200,247,0.5); padding: 0.9rem 2rem; border-radius: 8px; font-weight: 600; font-size: 0.96rem; text-decoration: none; display: inline-block; transition: border-color 0.15s, color 0.15s; }
    .post-cta-btn-sec:hover { border-color: #7ec8f7; color: #fff; text-decoration: none; }
"""


def slugify_from_h2_inner(inner: str) -> str:
    plain = re.sub(r"<[^>]+>", "", inner)
    plain = html_lib.unescape(plain).strip().lower()
    plain = re.sub(r"[^a-z0-9]+", "-", plain)
    return plain.strip("-")


def add_h2_ids(article_html: str) -> tuple[str, list[tuple[str, str]]]:
    seen: dict[str, int] = {}
    toc: list[tuple[str, str]] = []

    def repl(m: re.Match) -> str:
        attrs, inner = m.group(1), m.group(2)
        if "<br" in inner.lower():
            return m.group(0)
        label = re.sub(r"<[^>]+>", "", inner)
        label = html_lib.unescape(label).strip()
        if not label:
            return m.group(0)
        sid = slugify_from_h2_inner(inner)
        n = seen.get(sid, 0)
        if n:
            sid = f"{sid}-{n}"
        seen[sid.split("-")[0] if "-" in sid and sid[-1].isdigit() else sid] = (
            seen.get(sid.split("-")[0], 0) + 1 if False else 0
        )
        # simpler unique ids:
        base = slugify_from_h2_inner(inner)
        cnt = seen.get(base, 0)
        final_id = base if cnt == 0 else f"{base}-{cnt}"
        seen[base] = cnt + 1
        toc.append((label, final_id))
        if "id=" in attrs:
            return m.group(0)
        return f'<h2 id="{final_id}"{attrs}>{inner}</h2>'

    out = re.sub(r"<h2([^>]*)>(.*?)</h2>", repl, article_html, flags=re.DOTALL)
    return out, toc


def extract_intro_paragraph(article_html: str) -> str | None:
    m = re.search(
        r'<div class="post-key-points">.*?</div>\s*<p[^>]*>.*?</p>',
        article_html,
        re.DOTALL,
    )
    if m:
        pm = re.search(r"<p[^>]*>.*?</p>", m.group(0), re.DOTALL)
        return pm.group(0) if pm else None
    m2 = re.search(
        r'<div class="post-key-points">.*?</div>\s*<h2>.*?</h2>\s*<p[^>]*>.*?</p>',
        article_html,
        re.DOTALL,
    )
    if m2:
        pm = re.search(r"(<p[^>]*>.*?</p>)", m2.group(0), re.DOTALL)
        return pm.group(1) if pm else None
    return None


def extract_cat_badge(hero_section: str) -> str:
    m = re.search(r'<div class="post-cat-badge">([^<]+)</div>', hero_section)
    return m.group(1).strip() if m else "Mortgage Tips"


def extract_tags(article_html: str) -> list[str]:
    block = re.search(r'<div class="post-tags">(.*?)</div>', article_html, re.DOTALL)
    if not block:
        return []
    return re.findall(r'<span class="post-tag">([^<]+)</span>', block.group(1))


def extract_bottom_cta(s: str) -> tuple[str, str]:
    m = re.search(
        r'<section class="post-bottom-cta">\s*<div[^>]*>\s*<h2>(.*?)</h2>\s*<p>(.*?)</p>',
        s,
        re.DOTALL,
    )
    if not m:
        return "Ready to Talk?", "Book a free consultation with Rudy."
    h2_inner = re.sub(r"<br\s*/?>", " ", m.group(1), flags=re.I)
    h2_inner = re.sub(r"<[^>]+>", "", h2_inner)
    h2_inner = html_lib.unescape(h2_inner).strip()
    p_text = re.sub(r"<[^>]+>", "", m.group(2))
    p_text = html_lib.unescape(p_text).strip()
    return h2_inner, p_text


def extract_related_from_sidebar(sidebar: str) -> list[tuple[str, str, str]]:
    out: list[tuple[str, str, str]] = []
    for m in re.finditer(
        r'<a href="(https://www\.rudycorona\.com/blog/[^"]+)"\s+class="related-post"[^>]*>',
        sidebar,
    ):
        start = m.start()
        chunk = sidebar[start : start + 2500]
        cm = re.search(
            r'related-post-cat">([^<]+)</div>\s*<div class="related-post-title">([^<]+)</div>',
            chunk,
            re.DOTALL,
        )
        if cm:
            u = m.group(1).rstrip("/") + "/"
            out.append((u, cm.group(1).strip(), cm.group(2).strip()))
    return out[:3]


def default_related(slug: str) -> list[tuple[str, str, str]]:
    pool = [
        (
            "https://www.rudycorona.com/blog/jumbo-loans-south-bay/",
            "Mortgage Tips",
            "Jumbo Loans in the South Bay",
        ),
        (
            "https://www.rudycorona.com/blog/how-to-get-pre-approved-mortgage/",
            "First-Time Buyers",
            "How to Get Pre-Approved for a Mortgage",
        ),
        (
            "https://www.rudycorona.com/blog/how-much-house-can-i-afford-southern-california/",
            "First-Time Buyers",
            "How Much House Can I Afford in SoCal?",
        ),
    ]
    return [x for x in pool if slug not in x[0]][:3] or pool[:3]


def quick_ref_rows(slug: str, tags: list[str]) -> list[tuple[str, str]]:
    tag0 = tags[0] if tags else "Southern California"
    if "reverse" in slug:
        return [
            ("Typical age floor", "62+ (FHA HECM)"),
            ("Counseling", "Required before application"),
            ("Use of funds", "Pay off, cash out, or line of credit"),
            ("Equity", "Heirs keep remaining equity"),
            ("Planning", "Talk through total cost picture"),
        ]
    if "dscr" in slug:
        return [
            ("Qualifies on", "Rental income / DSCR"),
            ("Typical use", "Investment properties"),
            ("Documentation", "Cash-flow focused"),
            ("Down payment", "Varies by lender"),
            ("Best for", "Real estate investors"),
        ]
    if "self-employed" in slug:
        return [
            ("Income docs", "Taxes, P&L, bank statements"),
            ("Programs", "Bank statement, 1099, assets"),
            ("DTI", "Varies by program"),
            ("Reserves", "Often higher than W-2"),
            ("Tip", "Organize docs before you shop"),
        ]
    return [
        ("Pre-approval", "Verified before offers"),
        ("Typical DTI cap", "~43% (program dependent)"),
        ("Credit review", "Middle of 3 bureaus"),
        ("Closing", "Often 21–45 days"),
        ("Focus", tag0),
    ]


def build_sidebar(
    toc: list[tuple[str, str]],
    related: list[tuple[str, str, str]],
    quick_rows: list[tuple[str, str]],
) -> str:
    toc_lis = "\n".join(
        f'              <li><a href="#{sid}">{html_lib.escape(label)}</a></li>' for label, sid in toc
    )
    rel = "\n".join(
        f'''            <a href="{u}" class="related-post"><div><div class="related-post-cat">{html_lib.escape(c)}</div><div class="related-post-title">{html_lib.escape(t)}</div></div></a>'''
        for u, c, t in related
    )
    qinner = ""
    for i, (label, val) in enumerate(quick_rows):
        border = "border-bottom:1px solid var(--sand-dark);" if i < len(quick_rows) - 1 else ""
        qinner += f'''            <div style="padding:0.7rem 1.25rem;{border}display:flex;justify-content:space-between;"><span style="font-size:0.82rem;color:var(--text-muted);">{html_lib.escape(label)}</span><span style="font-size:0.85rem;font-weight:700;color:var(--navy);">{html_lib.escape(val)}</span></div>\n'''

    return f"""      <aside class="post-sidebar">
        <div class="sidebar-widget">
          <div class="sidebar-widget-header"><h4>📋 In This Article</h4></div>
          <div class="sidebar-widget-body" style="padding:1rem 1.25rem;">
            <ul class="toc-list">
{toc_lis}
            </ul>
          </div>
        </div>
        <div class="sidebar-widget">
          <div class="sidebar-widget-header"><h4>📞 Talk to Rudy — Free</h4></div>
          <div class="sidebar-widget-body">
            <p>Find out exactly what you qualify for — purchase price, loan programs, and monthly payment — in a free 20-minute call. No pressure, no obligation.</p>
            <a href="https://www.rudycorona.com/contact" class="sidebar-cta">Book a Free Consultation →</a>
            <a href="tel:+13105945362" class="sidebar-cta-secondary">📞 (310) 594-5362</a>
          </div>
        </div>
        <div class="sidebar-widget">
          <div class="sidebar-widget-header"><h4>📊 Quick Reference</h4></div>
          <div class="sidebar-widget-body" style="padding:0;">
{qinner.rstrip()}
          </div>
        </div>
        <div class="sidebar-widget">
          <div class="sidebar-widget-header"><h4>📖 Related Articles</h4></div>
          <div class="sidebar-widget-body" style="padding:0.5rem 1.25rem;">
{rel}
          </div>
        </div>
        <div style="background:var(--sand);border-radius:12px;padding:1.25rem;border:1px solid var(--sand-dark);font-size:0.75rem;color:var(--text-muted);line-height:1.65;text-align:center;">
          <strong style="color:var(--navy);">Rudy Corona</strong> · NMLS# 999113<br>
          Licensed in California<br>
          For informational purposes only. All loan programs subject to credit and property approval.
        </div>
      </aside>"""


def fix_add_h2_ids(article_html: str) -> tuple[str, list[tuple[str, str]]]:
    seen_count: dict[str, int] = {}
    toc: list[tuple[str, str]] = []

    def repl(m: re.Match) -> str:
        attrs, inner = m.group(1), m.group(2)
        if "<br" in inner.lower():
            return m.group(0)
        label = re.sub(r"<[^>]+>", "", inner)
        label = html_lib.unescape(label).strip()
        if not label:
            return m.group(0)
        base = slugify_from_h2_inner(inner)
        c = seen_count.get(base, 0)
        final_id = base if c == 0 else f"{base}-{c}"
        seen_count[base] = c + 1
        toc.append((label, final_id))
        if "id=" in attrs:
            return m.group(0)
        return f'<h2 id="{final_id}"{attrs}>{inner}</h2>'

    out = re.sub(r"<h2([^>]*)>(.*?)</h2>", repl, article_html, flags=re.DOTALL)
    return out, toc


def restructure_hero(hero: str, intro_p: str | None, blog_url: str, meta_extra: str) -> str:
    hero = hero.replace('<nav class="post-breadcrumb"', '<div class="post-breadcrumb"')
    hero = hero.replace("</nav>\n      <div class=\"post-cat-badge\">", "</div>\n      <div class=\"post-cat-badge\">", 1)
    hero = re.sub(
        r'<a href="https://www\.rudycorona\.com">Home</a>',
        '<a href="https://www.rudycorona.com/">Home</a>',
        hero,
        count=1,
    )
    hero = re.sub(
        r"https://www\.linkedin\.com/sharing/share-offsite/\?url=",
        "https://www.linkedin.com/shareArticle?url=",
        hero,
    )
    hero = re.sub(
        r'<a href="https://twitter\.com/intent/tweet[^"]*"[^>]*>[^<]*</a>\s*',
        "",
        hero,
    )

    img_m = re.search(r"<div class=\"post-hero-img\">.*?</div>\s*", hero, re.DOTALL)
    img_block = img_m.group(0).strip() if img_m else ""
    if img_m:
        hero = hero[: img_m.start()] + hero[img_m.end() :]

    h1_m = re.search(r"</h1>", hero)
    if h1_m and intro_p:
        styled = intro_p.replace(
            "<p",
            '<p style="font-size:1.08rem;color:rgba(255,255,255,0.78);line-height:1.72;max-width:680px;margin-bottom:0;"',
            1,
        )
        hero = hero[: h1_m.end()] + "\n      " + styled + hero[h1_m.end() :]

    meta_m = re.search(
        r'<div class="post-byline-name">([^<]*)</div>\s*<div class="post-byline-meta">(.*?)</div>',
        hero,
        re.DOTALL,
    )
    if meta_m:
        meta_raw = html_lib.unescape(re.sub(r"<[^>]+>", "", meta_m.group(2)))
        date_m = re.search(
            r"((?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},\s+\d{4})",
            meta_raw,
        )
        read_m = re.search(r"(\d+)\s*min read", meta_raw)
        date_s = date_m.group(1) if date_m else ""
        read_s = read_m.group(1) if read_m else "5"
        new_meta = f"{date_s} &nbsp;·&nbsp; {read_s} min read &nbsp;·&nbsp; {meta_extra}"
        hero = (
            hero[: meta_m.start()]
            + '<div class="post-byline-name">Rudy Corona · NMLS# 999113</div>\n        <div class="post-byline-meta">'
            + new_meta
            + "</div>"
            + hero[meta_m.end() :]
        )

    if img_block:
        idx = hero.rfind("\n    </div>")
        if idx != -1:
            end_inner = idx + len("\n    </div>")
            hero = hero[:end_inner] + "\n    " + img_block + hero[end_inner:]

    bu = blog_url.rstrip("/") + "/"
    hero = re.sub(
        r"u=(https://www\.rudycorona\.com/blog/[^\"&]+)",
        lambda m: "u=" + m.group(1).rstrip("/") + "/",
        hero,
    )
    _ = bu  # ensure normalized URLs in share links
    return hero


NEW_SCRIPT = """  <script>
  const menuBtn = document.getElementById('menu-btn');
  const siteNav = document.getElementById('site-nav');
  menuBtn?.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('nav-mobile-open');
    menuBtn.setAttribute('aria-expanded', String(isOpen));
  });
  document.querySelectorAll('#nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      siteNav.classList.remove('nav-mobile-open');
      menuBtn?.setAttribute('aria-expanded', 'false');
    });
  });
  document.querySelectorAll('.toc-list a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(a.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
  </script>"""


def process_one(path: Path) -> bool:
    s = path.read_text(encoding="utf-8")
    slug = path.parent.name

    m_canon = re.search(
        r'<link rel="canonical" href="(https://www\.rudycorona\.com/blog/[^"]+?)"',
        s,
    )
    blog_url = (m_canon.group(1) if m_canon else f"https://www.rudycorona.com/blog/{slug}").rstrip(
        "/"
    ) + "/"

    art = re.search(r'(<article class="post-body">)(.*?)(</article>)', s, re.DOTALL)
    if not art:
        print(f"skip (no article): {path}")
        return False
    pre, article_inner, post = art.group(1), art.group(2), art.group(3)
    new_inner, toc = fix_add_h2_ids(article_inner)

    tags = extract_tags(new_inner)
    cat = extract_cat_badge(s)
    meta_extra = f"{cat} · {tags[0]}" if tags and tags[0] != cat else cat

    intro_p = extract_intro_paragraph(new_inner)

    side_m = re.search(r'(<aside class="post-sidebar">)(.*?)(</aside>)', s, re.DOTALL)
    old_sidebar = side_m.group(0) if side_m else ""
    related = extract_related_from_sidebar(old_sidebar) if old_sidebar else []
    if len(related) < 2:
        related = default_related(slug)

    cta_title, cta_p = extract_bottom_cta(s)
    cta_h3 = re.sub(r"\s+", " ", cta_title).strip()

    back_m = re.search(
        r'(<div class="post-tags">.*?</div>)\s*<div style="margin-top:2rem[^>]*>.*?</div>\s*',
        new_inner,
        re.DOTALL,
    )
    if back_m:
        inner_cta = f'''        {back_m.group(1)}

        <div class="post-bottom-cta">
          <h3>{html_lib.escape(cta_h3)}</h3>
          <p>{html_lib.escape(cta_p)}</p>
          <div class="post-bottom-cta-btns">
            <a href="https://www.rudycorona.com/contact" class="post-cta-btn">Book a Free Consultation →</a>
            <a href="tel:+13105945362" class="post-cta-btn-sec">📞 (310) 594-5362</a>
          </div>
        </div>

'''
        new_inner = new_inner[: back_m.start()] + inner_cta + new_inner[back_m.end() :]
    else:
        print(f"warning: back-link strip not found: {slug}")

    full_article = pre + new_inner + post
    s = s[: art.start()] + full_article + s[art.end() :]

    if side_m:
        new_side = build_sidebar(toc, related, quick_ref_rows(slug, tags))
        s = s[: side_m.start()] + new_side + s[side_m.end() :]

    s = re.sub(
        r"<section class=\"post-bottom-cta\">.*?</section>\s*",
        "",
        s,
        count=1,
        flags=re.DOTALL,
    )

    hm = re.search(r'(<section class="post-hero">)(.*?)(</section>)', s, re.DOTALL)
    if hm:
        hero = restructure_hero(hm.group(2), intro_p, blog_url, meta_extra)
        s = s[: hm.start()] + hm.group(1) + hero + hm.group(3) + s[hm.end() :]

    if ".post-bottom-cta h3" not in s:
        s = s.replace("</style>", CSS_INJECT + "\n  </style>", 1)

    s2 = re.sub(r"<script>\s*function scrollToH2[\s\S]*?</script>", NEW_SCRIPT, s, count=1)
    if s2 == s:
        s2 = re.sub(r"(<script>)\s*(const menuBtn)", NEW_SCRIPT.strip() + "\n\n  \\1\n  \\2", s, count=1)
    if "scrollToH2" in s2:
        s2 = re.sub(r"\s*function scrollToH2\([^)]*\)\s*\{[^}]*\}\s*", "\n", s2)
    s = s2

    path.write_text(s, encoding="utf-8")
    print(f"OK {slug} ({len(toc)} toc)")
    return True


def main() -> None:
    for name in SLUGS:
        p = BLOG / name / "_page.html"
        if not p.is_file():
            print(f"MISSING {p}")
            continue
        process_one(p)


if __name__ == "__main__":
    main()
