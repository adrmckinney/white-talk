const colors = require('tailwindcss/colors')
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        blueGray: colors.blueGray,
        coolGray: colors.coolGray,
        gray: colors.gray,
        trueGray: colors.trueGray,
        warmGray: colors.warmGray,
        red: colors.red,
        // lime: colors.lime,
        // green: colors.green,
        // emarald: colors.emerald,
        // teal: colors.teal,
        // cyan: colors.cyan,
        // blue: colors.blue,
        // lightBlue: colors.lightBlue,
        // yellow: colors.yellow,
        // amber: colors.amber,
        // orange: colors.orange,
        // rose: colors.rose,
        // indigo: colors.indigo,
        // violet: colors.violet,
        // purple: colors.purple,
        // fuchsia: colors.fuchsia,
        // pink: colors.pink,
        // white: colors.white,
        // black: colors.black,
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
