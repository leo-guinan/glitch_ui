/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        'glitch': 'glitch 5s infinite',
        'bounce-delayed': 'bounce 1s infinite',
      },
      keyframes: {
        glitch: {
          '0%': {
            textShadow: '-1px -1px 0 rgba(255,0,255,0.7), 1px 1px 0 rgba(0,255,255,0.7)',
          },
          '2%': {
            textShadow: '1px -1px 0 rgba(255,0,255,0.7), -1px 1px 0 rgba(0,255,255,0.7)',
          },
          '4%': {
            textShadow: '-1px 1px 0 rgba(255,0,255,0.7), 1px -1px 0 rgba(0,255,255,0.7)',
          },
          '6%, 20%': {
            textShadow: '-1px -1px 0 rgba(255,0,255,0.7), 1px 1px 0 rgba(0,255,255,0.7)',
          },
          '22%': {
            textShadow: '2px 2px 0 rgba(255,0,255,0.7), -1px -1px 0 rgba(0,255,255,0.7)',
          },
          '24%, 100%': {
            textShadow: '-1px -1px 0 rgba(255,0,255,0.7), 1px 1px 0 rgba(0,255,255,0.7)',
          },
        },
      },
    },
  },
  plugins: [
    require('tailwindcss-scrollbar'),
  ],
};
