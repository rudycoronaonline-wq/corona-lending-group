export interface Service {
  slug: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  idealFor: string;
  benefits: string[];
  icon: string;
  image: string;
}

export const services: Service[] = [
  {
    slug: 'conventional',
    title: 'Conventional Loans',
    shortDesc: 'Best rates for qualified buyers.',
    fullDesc: 'Conventional loans are not backed by the government and typically offer competitive rates for borrowers with strong credit and stable income.',
    idealFor: 'Buyers with good credit (620+) and a down payment of 3–20%.',
    benefits: ['Competitive interest rates', 'Flexible terms (15–30 years)', 'No upfront mortgage insurance with 20% down'],
    icon: 'home',
    image: '/images/services/conventional.jpg',
  },
  {
    slug: 'fha',
    title: 'FHA Loans',
    shortDesc: 'Low down payment, first-time buyer friendly.',
    fullDesc: 'FHA loans are government-insured and allow lower credit scores and smaller down payments, making them ideal for first-time homebuyers.',
    idealFor: 'First-time buyers or those with limited savings; credit scores as low as 580.',
    benefits: ['Down payment as low as 3.5%', 'More flexible credit requirements', 'Competitive rates for qualified buyers'],
    icon: 'key',
    image: '/images/services/fha.jpg',
  },
  {
    slug: 'dscr',
    title: 'DSCR Loans',
    shortDesc: 'Investment property financing based on cash flow.',
    fullDesc: 'DSCR (Debt Service Coverage Ratio) loans qualify based on the property’s rental income rather than your personal income—perfect for investors.',
    idealFor: 'Real estate investors who want to qualify based on rental income.',
    benefits: ['Qualify on property cash flow', 'No personal income documentation required', 'Ideal for multiple investment properties'],
    icon: 'chart',
    image: '/images/services/dscr.jpg',
  },
  {
    slug: 'reverse',
    title: 'Reverse Mortgages',
    shortDesc: 'Unlock home equity in retirement.',
    fullDesc: 'Reverse mortgages let seniors 62+ access their home equity without monthly mortgage payments. You retain ownership and can use the funds for retirement needs.',
    idealFor: 'Seniors 62+ who want to tap home equity without selling.',
    benefits: ['No monthly mortgage payments', 'Stay in your home', 'Flexible payout options'],
    icon: 'heart',
    image: '/images/services/reverse.jpg',
  },
  {
    slug: 'self-employed',
    title: 'Self-Employed Loans',
    shortDesc: 'Flexible docs for business owners.',
    fullDesc: 'We work with self-employed borrowers using bank statements, profit-and-loss statements, and other flexible documentation to get you approved.',
    idealFor: 'Business owners, freelancers, and gig workers with non-traditional income.',
    benefits: ['Bank statement programs', 'Flexible income documentation', 'Custom solutions for your situation'],
    icon: 'briefcase',
    image: '/images/services/self-employed.jpg',
  },
  {
    slug: 'hard-money',
    title: 'Hard Money Loans',
    shortDesc: 'Fast funding for time-sensitive deals.',
    fullDesc: 'Hard money loans are short-term, asset-based financing ideal for fix-and-flip investors or when you need to close quickly.',
    idealFor: 'Investors who need quick funding for acquisitions or renovations.',
    benefits: ['Fast approval and funding', 'Based on property value', 'Short terms for quick exits'],
    icon: 'bolt',
    image: '/images/services/hard-money.jpg',
  },
  {
    slug: 'commercial',
    title: 'Commercial Loans',
    shortDesc: 'Financing for business properties.',
    fullDesc: 'Commercial mortgages finance office buildings, retail, multifamily, and other income-producing or business-use properties.',
    idealFor: 'Business owners and investors purchasing or refinancing commercial real estate.',
    benefits: ['Various property types', 'Competitive terms', 'Expert guidance through the process'],
    icon: 'building',
    image: '/images/services/commercial.jpg',
  },
];
