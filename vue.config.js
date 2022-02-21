// node加载的配置 commonjs
// 需要导出一个对象 ,作为webpack的配置
const path = require('path') //导入node 一个默认的模块 用于解析目录相关

function getPath(src) {
  // __dirname //获取当前文件的绝对路径
  return path.join(__dirname, src)
}
module.exports = {
  // 配置svg-sprite-loade 解析指定目录
  chainWebpack(config) {
    //config 就是webpack 默认的配置对象
    // 1. 获取webpack 对svg 的解析loader,并且忽略哪个目录
    config.module.rule('svg').exclude.add(getPath('src/icons/svg')).end()

    //3.配置新的loader 对 svg的解析
    //新增一个名字叫icons的rule规则
    config.module
      .rule('icons') // 新增一个名字叫icons的rule规则
      .test(/\.svg$/) //解析什么样的文件
      .include.add(getPath('src/icons/svg')) //处理哪个目录下
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    //loader 解析的目录
    //代表处理什么类型的文件   end就是返回上一层

    // 使用什么loader 解析匹配的文件

    //
  },
  // 配置代理服务器
  devServer: {
    proxy: {
      // 只代理以api开头的网络请求
      '/api': {
        // 代理目的地址
        target: 'https://api.imooc-admin.lgdsunday.club', // 服务器的地址
        // 是否开启代理
        changeOrigin: true
        // // 重写url 的方式
        // pathRewrite: {
        //   //重写路径
        //   '^/api': '' // 这种接口配置出来     http://XX.XX.XX.XX:8083/api/login
        //   //'^/api': '/' 这种接口配置出来     http://XX.XX.XX.XX:8083/login
        // }
      }
    }
  }
}
