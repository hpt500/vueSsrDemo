const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const cdnSrcDist = ""

const isProd = process.env.NODE_ENV === 'production'
console.log('webpackbaseconfig', isProd)
// 规则
const ruleArr = require('./webpack.rules.config')

module.exports = {
  devtool: isProd ?
    false :
    '#source-map',
  output: {
    path: path.resolve(__dirname, '../dist'),
    //采用cdn
    publicPath: isProd ? cdnSrcDist:'/dist/',
    // 采用服务器
   // publicPath: '/dist/',
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      // 'echarts': 'echarts/dist/echarts.common.min.js',
      'vue': 'vue/dist/vue.runtime.js',
      '@': path.resolve(__dirname, '../src'),
      'R': path.resolve(__dirname, '../src/components'),
      'V': path.resolve(__dirname, '../src/views'),
      '~api': path.resolve(__dirname, '../src/api/index-client'),
      '~store': path.resolve(__dirname, '../src/store'),
      '~utils': path.resolve(__dirname, '../src/utils'),
      'api-config': path.resolve(__dirname, '../src/api/config-client'),
      'assets': path.resolve(__dirname,'../src/assets')
    }
  },
  module: {
    noParse: /es6-promise\.js$/, // avoid webpack shimming process
    rules: ruleArr
  },
  performance: {
    maxEntrypointSize: 300000,
    hints: isProd ? 'warning' : false
  },
  plugins: isProd ?
    [
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
          drop_debugger: true,
          drop_console: true
        },
        sourceMap: false // true
      }),
      new ExtractTextPlugin({
        filename: 'common.[chunkhash].css'
      })
      // new ExtractTextPlugin({
      //   filename: 'common.[chunkhash].scss'
      // })
    ] :
    [
      new FriendlyErrorsPlugin()
    ]
}
