export interface Testimonial {
  name: string;
  loanType: string;
  quote: string;
  stars: number;
  city?: string;
}

export const testimonials: Testimonial[] = [
  {
    name: 'Maria G.',
    loanType: 'FHA Loan',
    quote: 'Rudy made our first home purchase stress-free. He explained every step and got us a great rate. We closed in 24 days!',
    stars: 5,
    city: 'Los Angeles, CA',
  },
  {
    name: 'James & Lisa T.',
    loanType: 'Conventional Refinance',
    quote: 'We refinanced with Rudy and saved over $200 a month. Professional, responsive, and honest. Highly recommend.',
    stars: 5,
    city: 'San Diego, CA',
  },
  {
    name: 'Robert S.',
    loanType: 'DSCR Loan',
    quote: 'As an investor, I needed someone who understood DSCR loans. Rudy got me approved quickly and the process was smooth.',
    stars: 5,
    city: 'Orange County, CA',
  },
];
