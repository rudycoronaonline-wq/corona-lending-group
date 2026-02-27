export interface FAQItem {
  category: string;
  question: string;
  answer: string;
}

export const faqs: FAQItem[] = [
  // Homepage subset + full set for FAQ page
  { category: 'General', question: 'What credit score do I need to qualify?', answer: 'It depends on the loan type. FHA allows scores as low as 580. Conventional typically starts at 620. I\'ll find options for your specific profile.' },
  { category: 'General', question: 'How much do I need for a down payment?', answer: 'As little as 3.5% with FHA, 0% with certain programs. Let\'s review your situation together.' },
  { category: 'General', question: 'How long does the process take?', answer: 'Most loans close in 21–30 days. I\'ll give you a realistic timeline on our first call.' },
  { category: 'General', question: 'Do you work with self-employed borrowers?', answer: 'Absolutely. I specialize in flexible documentation options for business owners.' },
  { category: 'General', question: 'Is there a cost to get pre-approved?', answer: 'No. Pre-approval is free and the first step to knowing exactly what you can afford.' },
  { category: 'General', question: 'What areas do you serve?', answer: 'I\'m licensed in California and serve all of California.' },
  // First-Time Buyers
  { category: 'First-Time Buyers', question: 'What is the minimum credit score to buy a home?', answer: 'FHA loans can go as low as 580; conventional usually 620 or higher. I can walk you through what\'s possible for you.' },
  { category: 'First-Time Buyers', question: 'How much do I need saved for a down payment?', answer: 'It varies by program: FHA can be 3.5% down, conventional as low as 3%. Some programs offer down payment assistance.' },
  { category: 'First-Time Buyers', question: "What's the difference between pre-qualification and pre-approval?", answer: 'Pre-qualification is a quick estimate. Pre-approval means we\'ve reviewed your docs and you get a conditional commitment—stronger when making an offer.' },
  { category: 'First-Time Buyers', question: 'How long does it take to close on a house?', answer: 'Typically 21–30 days from contract to closing. I\'ll keep you on track every step of the way.' },
  // Refinancing
  { category: 'Refinancing', question: 'When should I refinance my mortgage?', answer: 'When rates are lower than your current rate, or when you want to shorten the term, cash out equity, or switch from an ARM to a fixed rate.' },
  { category: 'Refinancing', question: 'How much does it cost to refinance?', answer: 'Closing costs vary (typically 2–5% of the loan). I\'ll provide a clear breakdown and help you decide if it pays off.' },
  { category: 'Refinancing', question: 'Can I cash out equity when I refinance?', answer: 'Yes. Cash-out refinances let you tap your home equity for renovations, debt payoff, or other needs—subject to eligibility.' },
  // Seniors & Reverse Mortgages
  { category: 'Seniors & Reverse Mortgages', question: 'What is a reverse mortgage and how does it work?', answer: 'A reverse mortgage lets you access your home equity without monthly payments. You stay in the home; the loan is repaid when you sell or no longer live there.' },
  { category: 'Seniors & Reverse Mortgages', question: 'Who qualifies for a reverse mortgage?', answer: 'Generally homeowners 62+ with sufficient equity. I\'ll walk you through eligibility and whether it\'s right for you.' },
  { category: 'Seniors & Reverse Mortgages', question: 'Is a reverse mortgage safe?', answer: 'Yes. They\'re federally insured (HECM) and regulated. I explain all costs and terms so you can decide with confidence.' },
  // Investors
  { category: 'Investors', question: 'What is a DSCR loan?', answer: 'A DSCR loan qualifies you based on the property\'s rental income (debt service coverage ratio) rather than your personal income—great for investors.' },
  { category: 'Investors', question: "What's the difference between hard money and conventional?", answer: 'Conventional is long-term, rate-focused, and income-based. Hard money is short-term, asset-based, and used for speed (e.g., fix-and-flip).' },
  { category: 'Investors', question: 'Can I use rental income to qualify for a mortgage?', answer: 'Yes. We can use existing rental income or projected rent (with an appraisal) to help you qualify for investment purchases.' },
  // Self-Employed
  { category: 'Self-Employed', question: 'How do self-employed borrowers qualify for a mortgage?', answer: 'Through bank statements, profit-and-loss statements, and other documentation that shows stable income. I specialize in these programs.' },
  { category: 'Self-Employed', question: 'What documents do I need as a self-employed borrower?', answer: 'Typically 1–2 years of tax returns, bank statements, and sometimes a P&L. I\'ll tell you exactly what we need for your situation.' },
];
