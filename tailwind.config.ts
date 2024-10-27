import type { Config } from "tailwindcss";
import animate from 'tailwindcss-animate'

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        mboTurq: {
          50: "#E5FCF6",
          100: "#B8F5E6",
          200: "#8BEDD5",
          300: "#5EE5C4",
          400: "#30DDAD",
          500: "#49DEB7", // Base color
          600: "#2BB690",
          700: "#1D8E6A",
          800: "#116645",
          900: "#073E29",
        },
		mboBg: {
			50: "#4d4d4d",
			100: "#0f0e12",
			200: "#191922",
			300: "#2F2F38",
		}
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
	  animation:{
		"loop-scroll":"loop-scroll 50s linear infinite",

	  },
	  keyframes:{
		"loop-scroll":{
			from: {transform:"translateX(0)"},
			to: {transform: "translateX(-100%)"}
		}
	  }
    },
  },
  plugins: [animate],
};
export default config;
