/* eslint-disable no-param-reassign,import/no-extraneous-dependencies */
const path = require("path");
const webpack = require("webpack");

const resolve = dir => path.join(__dirname, dir);

module.exports = {
  outputDir: "dist/widgets/cryptocurrencies",
  assetsDir: "assets",
  publicPath: "",
  pages: {
    index: {
      // entry for the page
      entry: "src/widgets/cryptocurrencies/index.js",
      // the source template
      template: "src/widgets/cryptocurrencies/template.html",
      // output as dist/index.html
      filename: "index.html",
      // when using title option,
      // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
      title: "Index Page",
      // chunks to include on this page, by default includes
      // extracted common chunks and vendor chunks.
      chunks: ["chunk-vendors", "chunk-common", "index"]
    },
    config: {
      entry: "src/widgets/cryptocurrencies/config.js",
      template: "src/widgets/cryptocurrencies/template.html",
      filename: "config.html",
      title: "Config Page",
      chunks: ["chunk-vendors", "chunk-common", "config"]
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        jquery: "jquery/src/jquery",
        glide: "glidejs/dist/glide"
      }
    },
    plugins: [
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery"
      })
    ]
  },
  chainWebpack: config => {
    config.plugin("copy").tap(args => {
      args[0][0].to = resolve("dist");
      return args;
    });
  }
};
