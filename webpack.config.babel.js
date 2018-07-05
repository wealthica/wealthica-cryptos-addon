var path = require('path');
var utils = require('./build/utils');
var merge = require('webpack-merge');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var addonWidgets = merge(utils.createBaseConfig(), {
  entry: {
    app: './src/widgets/cryptocurrencies/index',
    config: './src/widgets/cryptocurrencies/config',
  },
  output: {
    path: path.join(__dirname, './dist/widgets/cryptocurrencies'),
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js'),
    publicPath: ''
  },
  resolve: {
    alias: {
      'jquery': 'jquery/src/jquery',
      'glide': 'glidejs/dist/glide',
    }
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      title: 'Wealthica Cryptocurrencies Widget',
      filename: 'index.html',
      template: './src/widgets/cryptocurrencies/template.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      chunks: ['app', 'vendor', 'manifest'],
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    }),
    // generate dist config.html
    new HtmlWebpackPlugin({
      title: 'Wealthica Crypto Currencies Widget Config',
      filename: 'config.html',
      template: './src/widgets/cryptocurrencies/template.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      chunks: ['config', 'vendor', 'manifest'],
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    }),
  ]
});

module.exports = [ addonWidgets ];
