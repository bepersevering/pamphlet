
const path = require('path');

const webpack = require('webpack');
const merge = require('webpack-merge');

const OpenBrowserPlugin = require('open-browser-webpack-plugin');

const webpackConfigBase = require('./webpack.base.config');

const PORT = 3010;
function resolve(relatedPath) {
  return path.join(__dirname, relatedPath);
}
const webpackConfigDev = {
  plugins: [
    // 定义环境变量为开发环境
    new webpack.DefinePlugin({
      'process.env.NODE_ENV':   JSON.stringify('development'),
      'process.env.PUBLIC_URL': JSON.stringify('public'),
      IS_DEVELOPMETN:           true,
    }),
    new OpenBrowserPlugin({url: `http://localhost:${PORT}/`, }),
  ],
  devtool:   'source-map',
  devServer: {
    port:  3000,
    open:  true,
    proxy: {'/api': 'http://localhost:5000'}
  },

  /*
   * devServer: {
   *   contentBase: resolve('../server'),
   *   historyApiFallback: false,
   *   hot: false,
   *   host: '0.0.0.0',
   *   port: PORT,
   * },
   */
};

module.exports = merge(webpackConfigBase, webpackConfigDev);
