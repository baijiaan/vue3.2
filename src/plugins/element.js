import ElementPlus from 'element-plus'
// import 'element-plus/lib/theme-chalk/index.css'
// import "../styles/element-variables.scss"
import locale from 'element-plus/lib/locale/lang/zh-cn'
// import 'element-plus/dist/index.css'
import '@/styles/element-plus/index.css'
import 'element-plus/lib/theme-chalk/index.css'
export default (app) => {
  app.use(ElementPlus, { locale })
}
