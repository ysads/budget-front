module.exports = {
  css: {
    loaderOptions: {
      scss: {
        additionalData: '@import "@/assets/styles/tokens/main.scss";',
      },
    },
  },

  pluginOptions: {
    i18n: {
      locale: 'pt-BR',
      fallbackLocale: 'en',
      localeDir: 'lang',
      enableInSFC: true,
    },
  },
}
