import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        graphite: '#20252c',
        steel: '#31566f',
        line: '#d8dee5',
        signal: '#f5bd1f',
        paper: '#f4f6f8',
      },
      boxShadow: {
        soft: '0 16px 48px rgba(28, 40, 52, 0.10)',
      },
      fontFamily: {
        sans: ['Inter', 'Segoe UI', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
