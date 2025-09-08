
import type { Config } from "tailwindcss";
const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: { sans: ["ui-sans-serif", "system-ui"] },
      container: { center: true, padding: "1rem" }
    }
  },
  plugins: []
};
export default config;
