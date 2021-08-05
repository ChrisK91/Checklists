const themeDir = __dirname + '/../../';

const purgecss = require('@fullhuman/postcss-purgecss')({
    // see https://gohugo.io/hugo-pipes/postprocess/#css-purging-with-postcss
    content: [
        './hugo_stats.json',
        themeDir + '/hugo_stats.json',
        'exampleSite/hugo_stats.json',
    ],
    safelist: [
      "[type='checkbox']",
      "input",
      "input[type=*]",
      "[type]"
    ],
    defaultExtractor: (content) => {
        let els = JSON.parse(content).htmlElements;
        return els.tags.concat(els.classes, els.ids);
    }
})

module.exports = {    
    plugins: [        
        require('postcss-import')({
            path: [themeDir]
            }), 
        require('tailwindcss')(themeDir + 'assets/css/tailwind.config.js'),
        require("@tailwindcss/forms"),
        require('autoprefixer')({
            path: [themeDir]
        }),
        //...(process.env.HUGO_ENVIRONMENT === 'production' ? [purgecss] : [])
        //TODO: reenable purgecss once this is fixed: https://discourse.gohugo.io/t/tailwindcss-tailwindcss-forms-plugin-purge-issue-writestats-does-not-capture-attribute-selector/31968
        //https://github.com/gohugoio/hugo/issues/7560
    ]
}
