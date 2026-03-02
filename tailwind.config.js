const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Custom Sovereign X colors
        'obsidian': {
          50: '#e0e7ff',
          100: '#c2d2fc',
          200: '#9fb5f6',
          300: '#7996ee',
          400: '#5275e5',
          500: '#2c54dc', // Primary blue
          600: '#2343b0',
          700: '#1b3384',
          800: '#132358',
          900: '#0b132c',
          950: '#080d1e', // Darkest background
        },
        'gold': {
          50: '#fffdf0',
          100: '#fffbf1',
          200: '#fff6e0',
          300: '#ffefc4',
          400: '#ffe293',
          500: '#ffd053', // Accent gold
          600: '#d1a73e',
          700: '#a37f2d',
          800: '#75581c',
          900: '#47310b',
          950: '#2e1e07',
        }
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: `calc(var(--radius) - 4px)`,
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
        mono: ['"Fira Mono"', 'monospace'], // Futuristic mono font for data
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "pulse-light": {
          "0%, 100%": { opacity: "0.7", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.05)" },
        },
        "border-spin": {
          "100%": {
            transform: "rotate(360deg)",
          },
        },
        "shimmer": {
          from: {
            backgroundPosition: "0 0",
          },
          to: {
            backgroundPosition: "-200% 0",
          },
        },
        "blob": {
          "0%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": { transform: "translate(30px, -50px) scale(1.1)" },
          "66%": { transform: "translate(-20px, 20px) scale(0.9)" },
          "100%": { transform: "translate(0px, 0px) scale(1)" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "gradient-move": {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "100% 50%" },
        },
        "bento-reveal": {
          "0%": { opacity: "0", transform: "scale(0.95) translateY(10px)" },
          "100%": { opacity: "1", transform: "scale(1) translateY(0)" },
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-light": "pulse-light 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "border-spin": "border-spin var(--speed) linear infinite",
        "shimmer": "shimmer 2s linear infinite forwards",
        "blob": "blob 7s infinite cubic-bezier(0.6, -0.2, 0.3, 0.8)",
        "fade-in": "fade-in 0.6s ease-out forwards",
        "gradient-move": "gradient-move 5s ease alternate infinite",
        "bento-reveal": "bento-reveal 0.5s ease-out forwards",
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'hero-gradient': 'linear-gradient(135deg, rgba(8,13,30,1) 0%, rgba(19,35,88,1) 50%, rgba(8,13,30,1) 100%)',
        'glass-gradient': 'linear-gradient(145deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%)',
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
};