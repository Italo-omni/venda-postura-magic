import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
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
          DEFAULT: "#4B9FE1",
          foreground: "#FFFFFF",
          50: "#EDF5FC",
          100: "#D1E5F7",
          200: "#A3CCF0",
          300: "#75B3E8",
          400: "#4B9FE1",
          500: "#2485D3",
          600: "#1C69A8",
          700: "#154F7E",
          800: "#0E3553",
          900: "#071A29",
          950: "#030D15"
        },
        secondary: {
          DEFAULT: "#F2FCE2",
          foreground: "#1E293B",
        },
        cta: {
          DEFAULT: "#FEC6A1",
          foreground: "#1E293B",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "#F1F0FB",
          foreground: "#64748B",
        },
        accent: {
          DEFAULT: "#FDE1D3",
          foreground: "#1E293B",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "#FFFFFF",
          foreground: "#1E293B",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        heading: ["Montserrat", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        shrink: {
          from: { transform: 'scaleX(1)' },
          to: { transform: 'scaleX(0)' }
        }
      },
      animation: {
        shrink: 'shrink var(--duration, 8s) linear forwards'
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

