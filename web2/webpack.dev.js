const merge = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    host: 'nomos.local.dev.vanhack.ca',
    contentBase: './dist',
    historyApiFallback: true,
    proxy: {
      '/services': {
        target: 'https://nomos.local.dev.vanhack.ca',
        secure: false
      }
    }
  }
});
