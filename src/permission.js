// 用户鉴权 路由守卫
import store from '@/store/index.js'
// 进入每一个路由都会执行这个钩子
import router from './router/index.js'

const whiteRouter = ['/login']
router.beforeEach((to, from, next) => {
  /* 
     用户鉴权
      当用户未登录时(没有token) 只能进入login页面
      用户登录后,token 未过期之前,不允许进入login页面
  */

  if (store.getters.token) {
    // 如果有值就是已经登录的了
    console.log(to, 'to')
    console.log(store.getters.token)
    if (to.path === '/login') {
      // 如果在有值的情况下就不允许跳转到到登录页面
      next('/')
    } else {
      next() // 没有值的时候才可以跳转
    }
  } else {
    console.log(from, 'from')
    if (whiteRouter.indexOf(to.path) > -1) {
      // 如果在没有值的时候跳转到登录页面是可行的
      next()
    } else {
      next('/login') // 反之如果没有值的时候也要跳转到登录页面
    }
  }
})