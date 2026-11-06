/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Names kept so every component picks up the new palette: navy = emerald, brand.orange = CTA emerald
        navy: { DEFAULT: '#0B3D2E', deep: '#04241B' },
        brand: { orange: '#0E8A5B', orangedeep: '#0A6E48', yellow: '#E2C26A', teal: '#1F9D6B' },
        gold: '#D4AF37',
        paper: '#F3EAD7',
        cream: '#FBF6EA',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        body: ['Manrope', 'sans-serif'],
      },
      boxShadow: {
        orange: '0 10px 28px rgba(14,138,91,0.35)',
        card: '0 16px 32px rgba(11,61,46,0.12)',
      },
    },
  },
  plugins: [],
}
