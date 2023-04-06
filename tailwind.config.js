/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0067B9',
        primaryDark: '#002F6C',
        whiteTransparent: '#ffffffe1',
        primaryDark: '#002F6C',
        success: '#218838',
        disabled: '#898989',
      },
    },
  },
  plugins: [],
};
