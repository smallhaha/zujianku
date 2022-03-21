<<<<<<< HEAD
module.exports = {
  publicPath: process.env.NODE_ENV === 'PRODUCTION' ? './' : '/',
  // publicPath:'./',
  outputDir: 'dist',
  lintOnSave: true,
  assetsDir: 'static',
  indexPath: 'index.html',
  filenameHashing: true,
  runtimeCompiler: false,
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html',
      title: 'Index Page',
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    }
  },
  devServer: {
    host: '0.0.0.0',
    port: '8081',
    https: false,
    hotOnly: false,
    proxy: {
      '/api': {
        target: 'http://localhost:8081',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '/api': '/data'
        }
      },
      '/foo': {
        target: 'http://10.53.64.43'
      }
    },
    before: app => {}
  }
}
=======
module.exports = {
  publicPath: process.env.NODE_ENV === 'PRODUCTION' ? './' : '/',
  // publicPath:'./',
  outputDir: 'dist',
  lintOnSave: true,
  assetsDir: 'static',
  indexPath: 'index.html',
  filenameHashing: true,
  runtimeCompiler: false,
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html',
      title: 'Index Page',
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    }
  },
  devServer: {
    host: '0.0.0.0',
    port: '8081',
    https: false,
    hotOnly: false,
    proxy: {
      '/api': {
        target: 'http://localhost:8081',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '/api': '/data'
        }
      },
      '/foo': {
        target: 'http://10.53.64.43'
      }
    },
    before: app => {}
  }
}
>>>>>>> b784c27 (init)
