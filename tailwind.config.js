/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  safelist: [
    // Gradients used dynamically in Card.jsx via type
    "from-green-700",
    "to-green-900",
    "from-blue-700",
    "to-blue-900",
    "from-gray-700",
    "to-gray-900",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
