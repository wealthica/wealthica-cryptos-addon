const path = require('path');

const resolve = (dir) => {
  return path.join(__dirname, dir);
}

// vue.config.js
module.exports = {
  outputDir: 'dist/widgets/cryptocurrencies',
  assetsDir: 'assets',
  publicPath: '',
  pages: {
    index: {
      // entry for the page
      entry: 'src/widgets/cryptocurrencies/index.js',
      // the source template
      template: 'src/widgets/cryptocurrencies/template.html',
      // output as dist/index.html
      filename: 'index.html',
      // when using title option,
      // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'Index Page',
      // chunks to include on this page, by default includes
      // extracted common chunks and vendor chunks.
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    },
    config: {
      // entry for the page
      entry: 'src/widgets/cryptocurrencies/config.js',
      // the source template
      template: 'src/widgets/cryptocurrencies/template.html',
      // output as dist/index.html
      filename: 'config.html',
      // when using title option,
      // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'Config Page',
      // chunks to include on this page, by default includes
      // extracted common chunks and vendor chunks.
      chunks: ['chunk-vendors', 'chunk-common', 'config']
    },
    // when using the entry-only string format,
    // template is inferred to be `public/subpage.html`
    // and falls back to `public/index.html` if not found.
    // Output filename is inferred to be `subpage.html`.
    // subpage: 'src/subpage/main.js'
  },
  chainWebpack: config => {
    config
      .plugin('copy')
      .tap(args => {
        args[0][0].to = resolve('dist');
        return args;
      });
  },
};
