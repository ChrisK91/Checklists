module.exports = {
  important: true,
  theme: {
    fontFamily: {
    },
    listStyleType: {
      //none: 'none'
    },
    extend: {
      typography: {
        DEFAULT: {
          css: {
            //'ul > li::before': ''
          },
        },
      }
    },
  },
  variants: {},
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ]
}
