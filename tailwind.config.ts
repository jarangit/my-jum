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
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(100%)' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0)' },
          '100%': { transform: 'scale(1)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.1s ease-in-out',
        fadeOut: 'fadeOut 0.1s ease-in-out',
        slideUp: 'slideUp 0.1s ease-in-out',
        slideDown: 'slideDown 0.1s ease-in-out',
        scaleIn: 'scaleIn 0.1s ease-in-out',
      },
      borderColor: {
        DEFAULT: '#efefef', // Set your custom default border color
      },
      divideColor: {
        DEFAULT: '#efefef', // Set your custom default border color
      }
    },
    colors: {
      transparent: 'transparent',
      'white': '#ffffff',
      'purple': '#3102b4',
      'green': '#02512b',
      'blue': '#1458c3',
      'red': '#bd001e',
      'yellow': '#b28000',
      'bg-gray': '#f6f6f6',
      'gray': '#8b8b8b',
      'border': '#efefef',
      'black': '#000',
    },
  },
  plugins: [],
};
export default config;
