const path = require('path')
const vueConfig = require('./vue-loader.config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const isProd = process.env.NODE_ENV === 'production'
// 定义webpack loader
module.exports = [
    {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueConfig
    },
    {
        test: /\.js$/,
        loader: 'babel-loader',
        // exclude: /node_modules/,
        // exclude: /node_modules(?!\/quill-image-drop-module|quill-image-resize-module)/,
        include: [
            path.resolve('src'), 
            path.resolve('node_modules/quill-image-extend-module')
        ]
    },
    {
        test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
        loader: 'url-loader',
        options: {
            limit: 10000,
            name: '[name].[ext]?[hash]'
        }
    },
    {
        test: /\.(scss|css)$/,
        use: isProd ?
            ExtractTextPlugin.extract({
                use: [
                    {
                        loader: 'css-loader',
                        options: { minimize: true }
                    },
                    'sass-loader'
                ],
                fallback: 'vue-style-loader'
            }) :
            ['vue-style-loader', 'css-loader', 'sass-loader']
    },
]



























