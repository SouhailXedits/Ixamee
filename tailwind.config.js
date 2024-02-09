/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        md: '768px',
        ml: '880px',
        lg: '1024px',
        xl: '1280px',

        '2xl': '1400px',
        '3xl': '1550px',
      },
    },
    extend: {
      transitionDuration: {
        1: '10000ms',
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        body: ['Noto Kufi Arabic'],
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
    colors: {
      0: '#ffffff',
      1: '#102528',
      2: '#1B8392',
      4: '#D5E9EF',
      5: '#F3F6F6',
      6: '#FBB800',
      7: '#EA366E',
      8: '#D0D5DD',
      9: '#D9D9D9',
      10: '#4C4C4D',
      11: '#727272',
      12: '#99C6D3',

      13: '#F04438',
      14: '#FFF2F1',

      15: '#959595',
      16: '#B5B5B5',
      17: '#12B76A',
      18: '#12B76A',
      19: '#D8ECF3',

      20: '#D1FADF',
      21: '#FEF0C7',
      22: '#FEE4E2',
      23: '#F69D16',
      transparent: 'transparent',
      current: 'currentColor',
      white: '#ffffff',
      black: '#102528',
      mainGreen: '#1B8392',
      gray: '#959595',
      secondeColor: '#F0F6F8',
      beugeColor: '#F3F6F6',
      orangeColor: '#FBB800',
      pink: '#EA366E',
      red: '#F04438',
      green: '#12B76A',
      purple: '#3f3cbb',
      midnight: '#121063',
      metal: '#565584',
      tahiti: '#3ab7bf',
      silver: '#F0F6F8',
      'bubble-gum': '#ff77e9',
      bermuda: '#78dcca',
    },
  },
  plugins: [require('tailwindcss-animate')],
};
