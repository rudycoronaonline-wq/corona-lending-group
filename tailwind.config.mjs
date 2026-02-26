/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#1B3A6B',
          50: '#E8F0FA',
          100: '#C5D5EF',
          500: '#1B3A6B',
          600: '#152D54',
          900: '#0A1628',
        },
        sky: {
          DEFAULT: '#4A90D9',
          light: '#E8F4FD',
          500: '#4A90D9',
          600: '#3A7BC8',
        },
        grey: {
          light: '#B0BEC5',
          DEFAULT: '#78909C',
        },
        page: '#F8FAFC',
        dark: '#1A1A2E',
      },
      fontFamily: {
        heading: ['Playfair Display', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

