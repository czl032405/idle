var ExtractTextPlugin = require("extract-text-webpack-plugin");
var cssnext = require('postcss-cssnext');
var cssnano = require('cssnano')
//only available in .vue
module.exports = {
    loaders: {
        css: ExtractTextPlugin.extract({ loader: ['css-loader'], fallback: "vue-style-loader", }),
        less: ExtractTextPlugin.extract({ loader: ['css-loader', 'less-loader'], fallback: "vue-style-loader", publicPath: "../" })

    },
    postcss: [
        cssnext({ browsers: ['last 3 versions', "Safari >= 8"], }),
    ]

}

if (/production/.test(process.env.NODE_ENV)) {
    module.exports.postcss.push(cssnano({ zindex: false }))
}