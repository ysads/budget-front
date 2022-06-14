const UnpluginElementPlus = require('unplugin-element-plus/webpack');

module.exports = {
  css: {
    loaderOptions: {
      scss: {
        additionalData: '@import "@/assets/styles/tokens/main.scss";',
      },
    },
  },
  configureWebpack: {
    plugins: [UnpluginElementPlus()],
    resolve: {
      extensions: ['.ts', '.js', '.mjs', '.json'],
      alias: {
        'vue-i18n': 'vue-i18n/dist/vue-i18n.esm-bundler.js',
      },
    },
    module: {
      rules: [
        {
          test: /\.mjs$/i,
          include: /node_modules/,
          type: 'javascript/auto',
        },
      ],
    },
  },
};
