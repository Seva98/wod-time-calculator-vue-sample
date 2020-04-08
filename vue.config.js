module.exports = {
    runtimeCompiler: process.env.NODE_ENV === 'production' ? false : true,
    publicPath: './',
    productionSourceMap: false,
    pluginOptions: {
      webpackBundleAnalyzer: {
        openAnalyzer: false
      }
    }
  }