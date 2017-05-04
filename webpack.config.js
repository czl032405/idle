const path = require('path')
const del = require('del');
const fs = require('fs');
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const LiveReloadPlugin = require("webpack-livereload-plugin");
del.sync("dist/client/**");

var venders = fs.readdirSync(path.resolve(__dirname, 'src/client/venders'))
venders.sort(function (a, b) {
    return a > b ? -1 : 1;
})
console.info(`venders:${venders}`)
venders = venders.reduce((a, b) => {
    a[b.toString().split(".")[0]] = `./venders/${b}`
    return a;
}, {});

module.exports = {
    context: path.resolve(__dirname, "src/client"),
    entry: {
        'main': './main.js',
    },
    output: {
        filename: 'js/[name].[chunkhash:6].js',
        path: path.resolve(__dirname, './dist/client'),
        publicPath: '',
    },
    module: {
        rules: [
            { test: /\.html$/, use: "html-loader" },
            { test: /\.less$/, use: ExtractTextPlugin.extract({ use: ['css-loader', 'less-loader'], fallback: "style-loader", publicPath: "../" }) },
            { test: /\.css$/, use: ExtractTextPlugin.extract({ use: ['css-loader'], fallback: "style-loader", publicPath: "../" }) },
            { test: /\.(png|jpg|gif|svg)$/, use: 'url-loader?limit=233&name=[path][name].[hash:6].[ext]', exclude: /favicon/ },
            { test: /\.(eot|ttf|woff)$/, use: 'url-loader?limit=233&name=fonts/[name].[ext]' },
            { test: /\.(mp3)$/, use: 'url-loader?limit=1&name=audio/[name].[ext]' },
            { test: /\.js$/, use: "babel-loader", exclude: /(node_modules)|service-worker/ },
            { test: /\.vue$/, loader: 'vue-loader', options: require("./vue-loader-options") },
            { test: /favicon|service-worker.js|manifest.json/, loader: 'url-loader?limit=1&name=[name].[ext]' },
        ]
    },
    resolve: {
        alias: {
            images: path.resolve(__dirname, './src/client/images/'),
        },
        modules: [`./src/client`, 'node_modules/'],
    },
    externals: {
        env: /production/.test(process.env.NODE_ENV) ? '"pro"' : '"dev"'
    },
    plugins: [],
    performance: { hints: false },
    devtool: '#source-map'
}
Object.assign(module.exports.entry, venders);
module.exports.plugins.push(new HtmlWebpackPlugin({ template: 'index.html', chunks: Object.keys(venders).concat('main') }));
module.exports.plugins.push(new ExtractTextPlugin({ filename: "css/[name].[contenthash:6].css" }));
module.exports.plugins.push(new webpack.optimize.CommonsChunkPlugin({ names: Object.keys(venders) }))
console.info(process.env.NODE_ENV)
if (/production/.test(process.env.NODE_ENV)) {

    module.exports.devtool = "";
    module.exports.plugins.push(new webpack.optimize.UglifyJsPlugin({
        compress: {
            drop_console: true,
            unused: false,
            side_effects: false,
        },
        comments: false,
    }))
    module.exports.plugins.push(new webpack.LoaderOptionsPlugin({
        minimize: false
    }))
}
else {
    module.exports.plugins.push(new LiveReloadPlugin({appendScriptTag:true}));
}


