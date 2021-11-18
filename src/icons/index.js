// 注册一个全局组件
import svgIcon from './svglcon.vue'
export default function initSvaIcon(app) {
  app.component('svg-icon', svgIcon)
}
const file = require.context('@/icons/svg', false, /\.svg$/)
file.keys().map(file)
// console.log(file122222)
