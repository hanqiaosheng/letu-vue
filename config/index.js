// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/journey_detail.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `tru.e` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: 8080,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    /*proxyTable: {
      '/api': {
        target: 'http://192.168.0.76/',
        //target: 'http://192.168.0.36/hp_shop_apiserver/',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/api'
        }
      }
    },*/
    proxyTable: {
      '/orbit': {
        target: 'https://test-wechat.letulife.com/',
        changeOrigin: true,
        pathRewrite: {
          '^/orbit': '/orbit'
        }
      },
      '/scenicspot': {
        target: 'https://test-wechat.letulife.com/',
        changeOrigin: true,
        pathRewrite: {
          '^/scenicspot': '/scenicspot'
        }
      },
      '/banner': {
        target: 'https://test-wechat.letulife.com/',
        changeOrigin: true,
        pathRewrite: {
          '^/banner': '/banner'
        }
      },
      '/hotword': {
        target: 'https://test-wechat.letulife.com/',
        changeOrigin: true,
        pathRewrite: {
          '^/hotword': '/hotword'
        }
      },
      '/wallet': {
        target: 'https://test-wechat.letulife.com/',
        changeOrigin: true,
        pathRewrite: {
          '^/wallet': '/wallet'
        }
      },
      '/activity': {
        target: 'https://test-wechat.letulife.com/',
        changeOrigin: true,
        pathRewrite: {
          '^/activity': '/activity'
        }
      },
      '/user': {
        target: 'https://test-wechat.letulife.com/',
        changeOrigin: true,
        pathRewrite: {
          '^/user': '/user'
        },
      },
      '/pay': {
        target: 'https://test-wechat.letulife.com/',
        changeOrigin: true,
        pathRewrite: {
          '^/pay': '/pay'
        },
      },
      '/bikeRent': {
        target: 'https://test-wechat.letulife.com/',
        changeOrigin: true,
        pathRewrite: {
          '^/bikeRent': '/bikeRent'
        }
      }
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
