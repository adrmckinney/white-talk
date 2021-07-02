const colors = require('tailwindcss/colors')

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
        davysGray: '#545454',
        silverSand: '#B8C3CC',
        bronze: '#B1735D',
        forestGreen: '#6BAA75',
        lightGreen: '#84DD63',
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
      },
      fontFamily: {
        nunito: ['Nunito'],
        spirax: ['Spirax'],
        lobsterTwo: ['Lobster Two'],
        paytone: ['Paytone One'],
        playFair: ['Playfair Display']
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' }
        }
      },
      animation: {
        wiggle: 'wiggle 1s ease-in-out infinite'
      },
      backgroundImage: theme => ({
        messageGray: "url('./images/messageGray.png')"
      }),
      transitionDuration: {
        2000: '2000ms',
        3000: '3000ms',
        4000: '4000ms',
        5000: '5000ms'
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
