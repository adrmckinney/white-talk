const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      // Build your palette here
      transparent: 'transparent',
      current: 'currentColor',
      blueGray: colors.blueGray,
      coolGray: colors.coolGray,
      gray: colors.gray,
      trueGray: colors.trueGray,
      warmGray: colors.warmGray,
      red: colors.red,
      lime: colors.lime,
      green: colors.green,
      emarald: colors.emerald,
      teal: colors.teal,
      cyan: colors.cyan,
      blue: colors.blue,
      lightBlue: colors.lightBlue,
      yellow: colors.yellow,
      amber: colors.amber,
      orange: colors.orange,
      rose: colors.rose,
      indigo: colors.indigo,
      violet: colors.violet,
      purple: colors.purple,
      fuchsia: colors.fuchsia,
      pink: colors.pink,
      white: colors.white,
      black: colors.black,
      mellowApricot: '#FEB86C',
      mediumPurple: '#9867F7',
      kobi: '#DB9AC3'
    },
    extend: {}
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
