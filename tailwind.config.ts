import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        backdrop: "url('/images/backdrop.jpg')",
      },
      colors: {
        reached: '#F4CD5F',
      },
    },
  },
  plugins: [],
};
export default config;
