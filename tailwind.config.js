const colors = require('tailwindcss/colors')
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  // mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        blueGray: colors.blueGray,
        coolGray: colors.coolGray,
        trueGray: colors.trueGray,
        warmGray: colors.warmGray,
        darkerPurple: '#8675E8',
        mediumPurple: '#9381FF',
        bluePurple: '#B8B8FF',
        lavenderBlue: '#D8D8FF',
        lavenderWebb: '#E8E8FF',
        magnolia: '#F0F0FF',
        ghostWhite: '#F8F7FF',
        snow: '#FAF5F7',
        isabelline: '#FCF3EE',
        antiqueWhite: '#FFEEDD'
        // kobi: '#DB9AC3',
        // ming: '#28666E',
        // mellowApricot: '#FEB86C',
        // lilac: '#7C5585'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio')
  ]
}
