
const CompressionPlugin = require('compression-webpack-plugin')

module.exports = {
  configureWebpack:{
    externals: {
       'vue': 'Vue',
       // 'vuex': "Vuex",
       // 'vue-router': 'VueRouter',
       // 'axios':'axios'
    }
  },
  chainWebpack(config) {
    config.plugins.delete('prefetch');

    config.optimization.splitChunks({
        chunks: 'initial',//默认只作用于异步模块，为`all`时对所有模块生效,`initial`对同步模块有效
        cacheGroups: {
            vendors: {
              test: /[\\/]node_modules[\\/]/,
              name: "vendors"
            }
         }
    });

    if (process.env.NODE_ENV === 'production') {
        // 为生产环境修改配置...
        config.mode = 'production'
        return {
            plugins: [new CompressionPlugin({
                test: /\.js$|\.html$|\.css/, //匹配文件名
                threshold: 10240, //对超过10k的数据进行压缩
                deleteOriginalAssets: false //是否删除原文件
            })]
        }
    }
  },
  publicPath:'home/'
}
