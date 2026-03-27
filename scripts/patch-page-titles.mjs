/**
 * Sets the first <title>...</title> in each listed HTML file (dist/public).
 * Escapes & as &amp; for valid HTML.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

function esc(t) {
  return t.replace(/&/g, '&amp;');
}

/** rel path from project root -> plain title text (use & for ampersand) */
const titles = {
  'dist/about/index.html': 'About Rudy Corona | California Mortgage Broker',
  'dist/blog/index.html': 'California Mortgage Blog | Home Loan Tips | Rudy Corona',
  'dist/contact/index.html': 'Book a Mortgage Consultation | Rudy Corona',
  'dist/faq/index.html': 'Mortgage FAQ California | Home Loans | Rudy Corona',
  'dist/privacy/index.html': 'Privacy Policy | Mortgage Broker Site | Rudy Corona',
  'dist/testimonials/index.html': 'Client Reviews | Mortgage Broker California | Rudy Corona',
  'dist/resources/index.html':
    'California Homebuyer Resources | Guides & Tools | Rudy Corona',
  'dist/resources/pre-approval-checklist/index.html':
    'Pre-Approval Checklist | CA Homebuyers | Rudy Corona',
  'dist/resources/instant-home-estimates/index.html':
    'Instant Home Estimates | South Bay CA | Rudy Corona',
  'dist/calculators/index.html':
    'Mortgage Calculators California | Rent & Invest | Rudy Corona',
  'dist/calculators/mortgage/index.html':
    'Mortgage Payment Calculator | California | Rudy Corona',
  'dist/calculators/rent-vs-own/index.html':
    'Rent vs Own Calculator | California | Rudy Corona',
  'dist/calculators/investment-property/index.html':
    'Investment Property Calculator | California | Rudy Corona',
  'dist/calculators/move-up-purchase/index.html':
    'Move-Up Purchase Calculator | California | Rudy Corona',
  'dist/calculators/debt-consolidation-refinance/index.html':
    'Debt Consolidation Refinance | California | Rudy Corona',
  'dist/LoanOptions/conventional/index.html':
    'Conventional Loans California | Jumbo & High Balance | Rudy Corona',
  'dist/LoanOptions/fha/index.html': 'FHA Loans California | Low Down Payment | Rudy Corona',
  'dist/LoanOptions/dscr/index.html':
    'DSCR Loans California | Real Estate Investors | Rudy Corona',
  'dist/LoanOptions/reverse/index.html':
    'Reverse Mortgage California | HECM & Jumbo | Rudy Corona',
  'dist/LoanOptions/self-employed/index.html':
    'Self-Employed Home Loans California | Bank Statement | Rudy Corona',
  'dist/LoanOptions/hard-money/index.html':
    'Hard Money Loans California | Fast Financing | Rudy Corona',
  'dist/LoanOptions/commercial/index.html':
    'Commercial Real Estate Loans California | CRE | Rudy Corona',
  'dist/torrance-homes/index.html': 'Mortgage Broker Torrance CA | Home Loans | Rudy Corona',
  'dist/redondo-beach-homes/index.html':
    'Mortgage Broker Redondo Beach CA | Home Loans | Rudy Corona',
  'dist/hermosa-beach-homes/index.html':
    'Mortgage Broker Hermosa Beach CA | Home Loans | Rudy Corona',
  'dist/manhattan-beach-homes/index.html':
    'Mortgage Broker Manhattan Beach CA | Home Loans | Rudy Corona',
  'dist/palos-verdes-homes/index.html':
    'Palos Verdes Mortgage Broker | Jumbo Loans | Rudy Corona',
  'dist/gardena-homes/index.html': 'Mortgage Broker Gardena CA | Home Loans | Rudy Corona',
  'dist/carson-homes/index.html': 'Mortgage Broker Carson CA | Home Loans | Rudy Corona',
  'dist/lawndale-homes/index.html': 'Mortgage Broker Lawndale CA | Home Loans | Rudy Corona',
  'dist/lomita-homes/index.html': 'Mortgage Broker Lomita CA | Home Loans | Rudy Corona',
  'dist/long-beach-homes/index.html': 'Mortgage Broker Long Beach CA | Home Loans | Rudy Corona',
  'dist/san-pedro-homes/index.html': 'Mortgage Broker San Pedro CA | Home Loans | Rudy Corona',
  'dist/wilmington-homes/index.html': 'Mortgage Broker Wilmington CA | Home Loans | Rudy Corona',
  'dist/blog/calhfa-down-payment-assistance-southern-california/index.html':
    'CalHFA Down Payment Assistance | Southern California | Rudy Corona',
  'dist/blog/credit-score-to-buy-a-home-southern-california/index.html':
    'Credit Score Needed to Buy a Home | Southern California | Rudy Corona',
  'dist/blog/down-payment-first-time-buyer-southern-california/index.html':
    'First-Time Buyer Down Payment Help | Southern California | Rudy Corona',
  'dist/blog/first-time-homebuyer-guide-southern-california/index.html':
    'First-Time Home Buyer Guide | Southern California | Rudy Corona',
  'dist/blog/how-much-house-can-i-afford-southern-california/index.html':
    'How Much House Can I Afford | Southern CA | Rudy Corona',
  'dist/blog/how-much-money-can-you-get-from-a-reverse-mortgage/index.html':
    'How Much Can You Get From a Reverse Mortgage? | California | Rudy Corona',
  'dist/blog/how-reverse-mortgages-work-guide/index.html':
    'How Reverse Mortgages Work | California | Rudy Corona',
  'dist/blog/how-to-get-pre-approved-mortgage/index.html':
    'How to Get Pre-Approved for a Mortgage | California | Rudy Corona',
  'dist/blog/is-a-reverse-mortgage-a-good-idea/index.html':
    'Is a Reverse Mortgage a Good Idea? | CA | Rudy Corona',
  'dist/blog/rent-vs-buy-southern-california/index.html':
    'Rent vs Buy in Southern California | Rudy Corona',
  'dist/blog/reverse-mortgage-myths-debunked/index.html':
    'Reverse Mortgage Myths Debunked | California | Rudy Corona',
  'dist/blog/self-employed-mortgage-guide/index.html':
    'Self-Employed Home Loans | California | Rudy Corona',
  'dist/blog/what-happens-to-reverse-mortgage-when-you-die/index.html':
    'What Happens to a Reverse Mortgage When You Die? | California | Rudy Corona',
  'dist/blog/what-is-a-dscr-loan-real-estate-investors/index.html':
    'DSCR Loans for Investors | California | Rudy Corona',
  'dist/blog/what-is-a-reverse-mortgage-how-does-it-work/index.html':
    'What Is a Reverse Mortgage? | California | Rudy Corona',
  'public/blog/index.html': 'California Mortgage Blog | Home Loan Tips | Rudy Corona',
  'public/resources/index.html':
    'California Homebuyer Resources | Guides & Tools | Rudy Corona',
};

let n = 0;
for (const [rel, plain] of Object.entries(titles)) {
  const file = path.join(root, rel);
  if (!fs.existsSync(file)) {
    console.warn('missing:', rel);
    continue;
  }
  let html = fs.readFileSync(file, 'utf8');
  const next = html.replace(
    /<title>[^<]*<\/title>/i,
    `<title>${esc(plain)}</title>`,
  );
  if (next !== html) {
    fs.writeFileSync(file, next, 'utf8');
    n++;
  }
}
console.log(`Patched <title> in ${n} file(s).`);
