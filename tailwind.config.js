/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'arabic': ['IBM Plex Sans Arabic', 'Segoe UI', 'Roboto', 'sans-serif'],
        'quran': ['Uthmani', 'Amiri Quran', 'Times New Roman', 'serif'],
        'uthmani': ['Uthmani', 'serif'],
      },
      colors: {
        gray: {
          25: '#fefefe',
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
          925: '#0f0f0f',
          950: '#0a0a0a',
        },
        primary: {
          main: '#000000',
          secondary: '#0a0a0a',
          tertiary: '#171717',
          quaternary: '#262626',
        },
        surface: {
          base: '#0a0a0a',
          elevated: '#171717',
          overlay: '#262626',
          interactive: '#404040',
        },
        background: {
          main: '#000000',
          card: '#0a0a0a',
          surface: '#171717',
          elevated: '#262626',
          content: '#404040',
          footer: '#0f0f0f',
          input: '#262626',
          hover: '#404040',
        },
        text: {
          primary: '#ffffff',
          secondary: '#f5f5f5',
          tertiary: '#d4d4d4',
          muted: '#a3a3a3',
          subtle: '#737373',
          disabled: '#525252',
          accent: '#60a5fa',
          inverse: '#171717',
        },
        border: {
          primary: '#404040',
          secondary: '#262626',
          tertiary: '#171717',
          accent: '#60a5fa',
          focus: '#60a5fa',
        },
        blue: {
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
        },
        success: { 500: '#22c55e' },
        warning: { 500: '#f59e0b' },
        error: { 500: '#ef4444' },
        main: '#000000',
        card: '#0a0a0a',
        elevated: '#262626',
        content: '#404040',
        footer: '#0f0f0f',
        accent: '#60a5fa',
      },
      spacing: {
        '15': '3.75rem',
        '18': '4.5rem',
      },
      borderRadius: {
        'modern': '12px',
        'card': '16px',
      },
      borderWidth: {
        '3': '3px',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'spin-smooth': 'spin 1s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        }
      },
      backdropBlur: {
        xs: '2px',
      },
      backgroundImage: {
        'gradient-accent': 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)',
        'gradient-subtle': 'linear-gradient(135deg, #262626 0%, #404040 100%)',
      },
    },
  },
  plugins: [],
}