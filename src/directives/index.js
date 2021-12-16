import print from 'vue3-print-nb'
import showPermission from './permission.js'
export default (app) => {
  app.use(print)
  // 注册全局自定义指定 在这里用于设置页面权限
  // 字符串名字是自定义的指令名
  // 后边的是一个对象 里面的是自定义指令的方法
  app.directive('showPermission', showPermission)
}
