import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: { "2xl": "1280px" },
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
        emerald: {
          DEFAULT: "hsl(var(--brand-emerald))",
          deep: "hsl(var(--brand-emerald-deep))",
          soft: "hsl(var(--brand-emerald-soft))",
          bg: "hsl(var(--brand-emerald-bg))",
        },
        gold: {
          DEFAULT: "hsl(var(--brand-gold))",
          soft: "hsl(var(--brand-gold-soft))",
          deep: "hsl(var(--brand-gold-deep))",
        },
        ink: {
          DEFAULT: "hsl(var(--brand-ink))",
          2: "hsl(var(--brand-ink2))",
          3: "hsl(var(--brand-ink3))",
          mute: "hsl(var(--brand-mute))",
        },
        surface: {
          DEFAULT: "hsl(var(--brand-surface))",
          2: "hsl(var(--brand-surface2))",
          3: "hsl(var(--brand-surface3))",
        },
        success: "hsl(var(--brand-success))",
        warn: "hsl(var(--brand-warn))",
        danger: "hsl(var(--brand-danger))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 4px)",
        sm: "calc(var(--radius) - 6px)",
        xl: "calc(var(--radius) + 2px)",
        "2xl": "calc(var(--radius) + 6px)",
      },
      boxShadow: {
        card: "var(--shadow-card)",
        soft: "var(--shadow-soft)",
        elevated: "var(--shadow-elevated)",
      },
      fontFamily: {
        sans: ["IBM Plex Sans Thai", "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        latin: ["Inter", "IBM Plex Sans Thai", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      keyframes: {
        "accordion-down": { from: { height: "0" }, to: { height: "var(--radix-accordion-content-height)" } },
        "accordion-up": { from: { height: "var(--radix-accordion-content-height)" }, to: { height: "0" } },
        "fade-in": { from: { opacity: "0", transform: "translateY(6px)" }, to: { opacity: "1", transform: "translateY(0)" } },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.35s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
