
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

function resolve(relatedPath) {
  return path.join(__dirname, relatedPath)
}

const webpackConfigBase = {
  entry: {
    client: resolve('../src/index.js'),
  },
  output: {
    path: resolve('../dist'),
    filename: '[name].[hash:4].js',
    chunkFilename: 'chunks/[name].[hash:4].js',
  },
  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      components: path.join(__dirname, '/../src/components')
    },
  },
  resolveLoader: {
    moduleExtensions: ['-loader']
  },
  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        loader: 'babel',
      },
      {
        test: /\.css/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style',
          use: [
            { loader: 'css', options: { sourceMap: true } }
          ]
        }),
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style',
          use: [
            { loader: 'css', options: { sourceMap: true } },
            { loader: 'less', options: { sourceMap: true } }
          ]
        }),
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url',
        options: {
          limit: 8192,
          name: 'img/[name].[hash:4].[ext]'
        }
      },
      {
        test: /\.(woff|eot|ttf|svg|gif)$/,
        loader: 'url',
        options: {
          limit: 8192,
          name: 'font/[name].[hash:4].[ext]'
        }
      },
    ],
  },
  plugins: [
    // 提取css
    new ExtractTextPlugin('style.[hash:4].css'),
    // 将打包后的资源注入到html文件内    
    new HtmlWebpackPlugin({
      template: resolve('../public/index.html'),
    }),
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'common', // 入口文件名
    //   filename: 'common.bundle.js', // 打包后的文件名
    //   minChunks: function (module, count) {
    //     return module.resource &&
    //       /\.js$/.test(module.resource) &&
    //       module.resource.indexOf(resolve('../node_modules')) === 0
    //   }
    // }),
    // new webpack.optimize.CommonsChunkPlugin({
    //   async: 'async-common',
    //   minChunks: 3,
    // }),
  ],
  optimization: {
    splitChunks: {
        cacheGroups: {
            commons: {
                test: /[\\/]node_modules[\\/]/,
                name: "vendors",
                chunks: "all"
            }
        }
    }
  },
  
}

module.exports = webpackConfigBase
