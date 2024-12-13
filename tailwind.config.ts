import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        xs: '475px',
        'xxl': '1536px',
        '2xl': '2560px',
      },
      colors: {
        primary: {
          100: '#e3d3f8',
          200: '#c7a7f1',
          300: '#ab7bea',
          400: '#8f4fe3',
          DEFAULT: '#8946e2',
        },
        secondary: '#9e5ff2',
        black: {
          '100': '#333333',
          '200': '#141413',
          '300': '#202020',
          DEFAULT: '#000000',
        },
        background: {
          50: '#f2f2f2',
          100: '#e6e6e6',
          200: '#cccccc',
          300: '#b3b3b3',
          400: '#999999',
          DEFAULT: '#171717',
        },
        accent: '#5ff2be',
        white: {
          '100': '#F7F7F7',
          DEFAULT: '#FFFFFF',
        },
      },

      fontFamily: {
        'poppins-sans': ['var(--font-poppins-sans)'],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      boxShadow: {
        100: '2px 2px 0px 0px rgb(0, 0, 0)',
        200: '2px 2px 0px 2px rgb(0, 0, 0)',
        300: '2px 2px 0px 2px rgb(238, 43, 105)',
      },
    },
  },
  plugins: [require('tailwindcss-motion')],
} satisfies Config;
