/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        lab: {
          bg: 'rgb(var(--color-lab-bg) / <alpha-value>)',
          'bg-secondary': 'rgb(var(--color-lab-bg-secondary) / <alpha-value>)',
          card: 'rgb(var(--color-lab-card) / <alpha-value>)',
          'card-glass': 'var(--color-lab-card-glass)',
          border: 'var(--color-lab-border)',
          'border-light': 'var(--color-lab-border-light)',
          accent: '#3b82f6',
          'accent-glow': 'rgba(59, 130, 246, 0.15)',
          indigo: '#6366f1',
          cyan: '#0ea5e9',
          teal: '#14b8a6',
          emerald: '#10b981',
          violet: '#8b5cf6',
          amber: '#f59e0b',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Outfit', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      backgroundImage: {
        'radial-gradient': 'radial-gradient(circle at 50% 50%, var(--tw-gradient-stops))',
        'lab-grid': 'linear-gradient(to right, rgba(255, 255, 255, 0.025) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.025) 1px, transparent 1px)',
        'hero-glow': 'radial-gradient(circle at 50% -20%, rgba(99, 102, 241, 0.18) 0%, rgba(59, 130, 246, 0.08) 40%, transparent 70%)',
      },
      boxShadow: {
        'glow-blue': '0 0 30px -5px rgba(59, 130, 246, 0.3)',
        'glow-indigo': '0 0 30px -5px rgba(99, 102, 241, 0.3)',
        'glow-emerald': '0 0 30px -5px rgba(16, 185, 129, 0.3)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      }
    },
  },
  plugins: [],
}
