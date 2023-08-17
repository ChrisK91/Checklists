const themeDir = __dirname + '/../../';

module.exports = {
  content: [
    './hugo_stats.json',
    themeDir + '/hugo_stats.json',
    'exampleSite/hugo_stats.json',
    "./**/*.{html,html,xml,rss,md}",
  ],
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
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ]
}
