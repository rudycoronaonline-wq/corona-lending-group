from pathlib import Path

p = Path(r"c:\Nello Website\corona-lending-group\src\pages\_faq-content.html")
text = p.read_text(encoding="utf-8")
start = text.index("  <!-- HERO -->")
end = text.index('  <footer class="site-footer"')


def block(title, items):
    h = f'          <div class="faq-category-block"><h2 class="faq-category-title">{title}</h2><div class="faq-list">'
    for q, a in items:
        h += f"""
            <div class="faq-item">
              <button type="button" class="faq-question" aria-expanded="false">{q}<span class="faq-chevron" aria-hidden="true">▼</span></button>
              <div class="faq-answer"><p>{a}</p></div>
            </div>"""
    h += "\n          </div></div>"
    return h


cats = [
    (
        "General",
        [
            (
                "What credit score do I need to qualify?",
                "It depends on the loan type. FHA allows scores as low as 580. Conventional typically starts at 620. I will find options for your specific profile.",
            ),
            (
                "How much do I need for a down payment?",
                "As little as 3.5% with FHA, 0% with certain programs. Let us review your situation together.",
            ),
            (
                "How long does the process take?",
                "Most loans close in 21–30 days. I will give you a realistic timeline on our first call.",
            ),
            (
                "Do you work with self-employed borrowers?",
                "Absolutely. I specialize in flexible documentation options for business owners.",
            ),
            (
                "Is there a cost to get pre-approved?",
                "No. Pre-approval is free and the first step to knowing exactly what you can afford.",
            ),
            (
                "What areas do you serve?",
                "I am licensed in California and serve all of California.",
            ),
        ],
    ),
    (
        "First-Time Buyers",
        [
            (
                "What is the minimum credit score to buy a home?",
                "FHA loans can go as low as 580; conventional usually 620 or higher. I can walk you through what is possible for you.",
            ),
            (
                "How much do I need saved for a down payment?",
                "It varies by program: FHA can be 3.5% down, conventional as low as 3%. Some programs offer down payment assistance.",
            ),
            (
                "What is the difference between pre-qualification and pre-approval?",
                "Pre-qualification is a quick estimate. Pre-approval means we have reviewed your docs and you get a conditional commitment—stronger when making an offer.",
            ),
            (
                "How long does it take to close on a house?",
                "Typically 21–30 days from contract to closing. I will keep you on track every step of the way.",
            ),
        ],
    ),
    (
        "Refinancing",
        [
            (
                "When should I refinance my mortgage?",
                "When rates are lower than your current rate, or when you want to shorten the term, cash out equity, or switch from an ARM to a fixed rate.",
            ),
            (
                "How much does it cost to refinance?",
                "Closing costs vary (typically 2–5% of the loan). I will provide a clear breakdown and help you decide if it pays off.",
            ),
            (
                "Can I cash out equity when I refinance?",
                "Yes. Cash-out refinances let you tap your home equity for renovations, debt payoff, or other needs—subject to eligibility.",
            ),
        ],
    ),
    (
        "Seniors & Reverse Mortgages",
        [
            (
                "What is a reverse mortgage and how does it work?",
                "A reverse mortgage lets you access your home equity without monthly payments. You stay in the home; the loan is repaid when you sell or no longer live there.",
            ),
            (
                "Who qualifies for a reverse mortgage?",
                "Generally homeowners 62+ with sufficient equity. I will walk you through eligibility and whether it is right for you.",
            ),
            (
                "Is a reverse mortgage safe?",
                "Yes. They are federally insured (HECM) and regulated. I explain all costs and terms so you can decide with confidence.",
            ),
        ],
    ),
    (
        "Investors",
        [
            (
                "What is a DSCR loan?",
                "A DSCR loan qualifies you based on the property's rental income (debt service coverage ratio) rather than your personal income—great for investors.",
            ),
            (
                "What is the difference between hard money and conventional?",
                "Conventional is long-term, rate-focused, and income-based. Hard money is short-term, asset-based, and used for speed (e.g., fix-and-flip).",
            ),
            (
                "Can I use rental income to qualify for a mortgage?",
                "Yes. We can use existing rental income or projected rent (with an appraisal) to help you qualify for investment purchases.",
            ),
        ],
    ),
    (
        "Self-Employed",
        [
            (
                "How do self-employed borrowers qualify for a mortgage?",
                "Through bank statements, profit-and-loss statements, and other documentation that shows stable income. I specialize in these programs.",
            ),
            (
                "What documents do I need as a self-employed borrower?",
                "Typically 1–2 years of tax returns, bank statements, and sometimes a P&L. I will tell you exactly what we need for your situation.",
            ),
        ],
    ),
]

parts = [
    """
  <a href="#main" class="skip-link">Skip to main content</a>

  <!-- HERO -->
  <section class="faq-hero" aria-labelledby="faq-heading">
    <div class="faq-hero-inner">
      <div class="faq-eyebrow">✓ You are on the UPDATED site — California Modern Mortgage Advisor</div>
      <h1 id="faq-heading">Frequently Asked <em>Questions</em></h1>
      <p>Quick answers to common questions. Still have questions? Reach out anytime.</p>
    </div>
  </section>

  <section class="faq-section" id="main">
    <div class="container">
      <div class="faq-layout">
        <div>
""",
]

for t, items in cats:
    parts.append(block(t, items))

parts.append(
    """
        </div>
        <aside class="guide-sidebar">
          <div class="faq-cta-card">
            <h3>Still have questions?</h3>
            <p>Every situation is different. A quick conversation is often the fastest way to get clarity.</p>
            <ul class="faq-cta-list">
              <li>Free, no-obligation consultation</li>
              <li>Clear answers in plain language</li>
              <li>Licensed in California · NMLS# 999113</li>
            </ul>
            <a href="https://www.rudycorona.com/contact" class="btn-gold-full" style="display:inline-block;width:100%;text-align:center;margin-bottom:0.75rem;">Contact us</a>
            <a href="tel:+13105945362" class="btn-navy" style="display:inline-block;width:100%;text-align:center;">(310) 594-5362</a>
          </div>
        </aside>
      </div>
      <p style="margin-top:2.5rem;text-align:center;font-size:0.95rem;color:var(--text-muted);"><a href="https://www.rudycorona.com/contact" style="color:var(--sky);font-weight:600;">Contact us</a> for more help.</p>
    </div>
  </section>

  <!-- CTA -->
  <section class="t-cta">
    <div style="max-width:620px;margin:0 auto;">
      <h2>Ready to Talk Through <em>Your Situation?</em></h2>
      <p>Book a free consultation—no pressure, just straight answers about what is possible for you.</p>
      <div style="display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;">
        <a href="https://www.rudycorona.com/contact" class="btn-gold">Book a Free Consultation →</a>
        <a href="tel:+13105945362" class="btn-outline-white">📞 (310) 594-5362</a>
      </div>
    </div>
  </section>

"""
)

faq_main = "".join(parts)
p.write_text(text[:start] + faq_main + text[end:], encoding="utf-8")
print("ok")
