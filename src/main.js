import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 加载svg的处理
import initSvaIcon from './icons/index.js'

// 用户鉴权
import './permission.js'
// import "./icons/index.js"
// 引入样式的入口文件
import './styles/index.scss'
// 导入i18n
import i18n from '@/i18n/index.js'
// import "./styles/variables.scss"
const app = createApp(App)
initSvaIcon(app)
// installElementPlus(app)
app.use(store).use(i18n).use(router).use(ElementPlus).mount('#app')

/*eslint-disable*/
/*  
  中英文切换(国际化)
  1.需要一个变量 locale 控制语言环境
  2.所有的语言中的数据源要实现准备好
  3.定义一个方法获取对应语言包中的数据

  借助i18n 插件完成国际化
  1. npm install vue-i18n@next // 因为项目是3.2的版本 所以i18n的版本必须是大于9.0的版本
  2.
*/

/* eslint-enable */
