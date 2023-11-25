import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        wrongGuess: {
          "0%, 100%": { transform: "translate3d(0)" },
          "10%, 30%, 50%, 70%": { transform: "translate3d(-10px)" },
          "20%,40%,60%": { transform: "translate3d(10px)" },
          "80%": { transform: "translate3d(8px)" },
          "90%": { transform: "translate3d(-8px)" },
        },
      },
      animation: {
        wrongGuessAnimation: "wrongGuess 1s ease 0s 1 normal forwards ",
      },
    },
  },
  plugins: [],
};
export default config;
