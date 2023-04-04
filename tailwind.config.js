/* eslint-disable prettier/prettier */
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './stories/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      animation: {
        marquee: 'marquee 35s linear infinite',
        marquee2: 'marquee2 35s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        marquee2: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        appearing: {
          '25%, 50%, 75%': { opacity: 1 },
          '0%, 100%': { opacity: 0 },
        },
      },
      colors: {
        neutral: {
          50: '#ffffff',
          100: '#efefef',
          200: '#dcdcdc',
          300: '#bdbdbd',
          400: '#989898',
          500: '#7c7c7c',
          600: '#656565',
          700: '#525252',
          800: '#464646',
          900: '#3d3d3d',
        },
        primary: {
          50: '#eef8ff',
          100: '#d9edff',
          200: '#bce1ff',
          300: '#8ecfff',
          400: '#59b3ff',
          500: '#3292ff',
          600: '#1b72f5',
          700: '#145ce1',
          800: '#174ab6',
          900: '#19418f',
        },
        secondary: {
          50: '#fdf2f8',
          100: '#fbe8f2',
          200: '#fad0e6',
          300: '#f7aad1',
          400: '#f076b1',
          500: '#e74d93',
          600: '#d52d71',
          700: '#c51f5d',
          800: '#991b49',
          900: '#801b40',
        },
        accent: {
          50: '#feffe7',
          100: '#faffc1',
          200: '#f9ff86',
          300: '#feff41',
          400: '#fff40d',
          500: '#ffe600',
          600: '#d1aa00',
          700: '#a67b02',
          800: '#895f0a',
          900: '#744e0f',
        },
        normal: {
          10: '#efefef',
          50: '#bdbdbd',
          100: '#808080',
          200: '#707070',
          300: '#606060',
          400: '#505050',
          500: '#404040',
          600: '#303030',
          700: '#202020',
          800: '#101010',
          900: '#000000',
        },
        success: {
          50: '#f0fdf4',
          100: '#dbfde6',
          200: '#baf8cf',
          300: '#84f1aa',
          400: '#48e07d',
          500: '#1db954',
          600: '#14a547',
          700: '#13823b',
          800: '#156633',
          900: '#13542c',
        },
        failure: {
          50: '#fff0f0',
          100: '#ffdddd',
          200: '#ffc1c1',
          300: '#ff9797',
          400: '#ff5b5b',
          500: '#ff2828',
          600: '#f20505',
          700: '#d30202',
          800: '#ae0606',
          900: '#8f0d0d',
        },
      },
    },
  },
  plugins: [],
  safelist: [
    'placeholder:italic',
    'underline',
    'text-xs',
    'text-sm',
    'text-base',
    'text-lg',
    'text-xl',
    'rounded-xs',
    'rounded-sm',
    'rounded-base',
    'rounded-lg',
    'rounded-xl',
    'rounded-2xl',
    'rounded-3xl',
    'rounded-4xl',
    'focus:ring',
    // magic css
    'active:bg-yellow-700 focus-within:outline-none focus-within:ring focus-within:ring-purple-400  p-[3px] bg-gradient-to-r from-purple-600 from-10% via-sky-500 via-30% via-red-500 via-60% via-orange-500 via-80% to-yellow-500 to-90%',
    // magic text
    'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600',
    'hover:opacity-90',
    'ring-inset',
    {
      pattern: /p-\d+/,
    },
    {
      pattern: /h-\d+/,
    },
    {
      pattern: /w-\d+/,
    },
    {
      pattern: /min-w-.*/,
    },
    {
      pattern: /min-h-.*/,
    },
    {
      pattern: /text-(white|black)/,
      variants: ['hover', 'dark', 'placeholder', 'dark:placeholder'],
    },
    {
      pattern: /bg-(white|black)/,
      variants: ['hover', 'dark'],
    },
    {
      pattern:
        /text-(accent|indigo|neutral|normal|secondary|red|blue|green|orange|primary)-\d+/,
      variants: ['hover', 'dark', 'placeholder', 'dark:placeholder'],
    },
    {
      pattern:
        /bg-(accent|indigo|neutral|normal|green|orange|red|primary|secondary)-\d+/,
      variants: ['hover', 'dark', 'dark:hover'],
    },
    {
      pattern:
        /border-(accent|indigo|neutral|normal|green|orange|white|red|primary|secondary)-\d+/,
      variants: ['hover'],
    },
    {
      pattern:
        /ring-(accent|indigo|normal|green|orange|white|red|primary|secondary)-\d+/,
      variants: ['focus'],
    },
  ],
}
