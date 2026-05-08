import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
      },
      colors: {
        cora: {
          bg: "var(--cora-bg)",
          fg: "var(--cora-fg)",
          plan: "var(--cora-plan)",
          dev: "var(--cora-dev)",
          test: "var(--cora-test)",
          deploy: "var(--cora-deploy)",
          ops: "var(--cora-ops)",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
