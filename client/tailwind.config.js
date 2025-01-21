module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  safelist: ['fas', 'fa-envelope', 'fa-book'],
  theme: {
    fontFamily: {
      sans: ['Alef', 'sans-serif'],
      hebrew: ['Alef', 'sans-serif'],
    },
    extend: {
      colors: {
        cardGreen: '#a6c8ba',
        cardTan: '#d8b48a',
        cardBeige: '#c1b5a0',
        cardBlueLight: '#a1b3d9',
        cardBlue: '#88bacf',
        cardPink: '#e6a2a3',
      },
    },
  },
  plugins: [],
};