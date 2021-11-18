import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element'

// 加载svg的处理
import initSvaIcon from './icons/index.js'

// 用户鉴权
import './permission.js'
// import "./icons/index.js"
// 引入样式的入口文件
import './styles/index.scss'
// import "./styles/variables.scss"
const app = createApp(App)
initSvaIcon(app)
installElementPlus(app)
app.use(store).use(router).mount('#app')
