/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Bamboly Demo"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        side: ['Poppins', 'sans-serif'],
      },
      colors: {
        'hero-bg': '#EC612C',
        'beyond-white': '#FFFFFF',
        'beyond-green': '#90EE90',
        'beyond-blue': '#89CFF0',
        'marquee-bg': '#FFFFFF',
        'marquee-text': '#EC612C',
      },
      animation: {
        'marquee-scroll': 'marquee-scroll 18s linear infinite',
      },
      keyframes: {
        'marquee-scroll': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}
