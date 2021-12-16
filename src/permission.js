// 用户鉴权 路由守卫
import store from '@/store/index.js'
// 进入每一个路由都会执行这个钩子
import router from './router/index.js'
//
const whiteRouter = ['/login']
router.beforeEach(async (to, from, next) => {
  /* 
     用户鉴权
      当用户未登录时(没有token) 只能进入login页面
      用户登录后,token 未过期之前,不允许进入login页面
  */

  if (store.getters.token) {
    // 如果有值就是已经登录的了
    if (to.path === '/login') {
      // 如果在有值的情况下就不允许跳转到到登录页面
      next('/')
    } else {
      // 登录成功 跳转到首页 判断如果没有用户的信息 就去发送axios
      if (!store.getters.hasUserInfo) {
        // 这个解构就是先解构出permission 然后再解构出permission对象内的menus属性
        const {
          permission: { menus }
        } = await store.dispatch('user/getUserInfo')
        // 1.获取当前用户的所有权限
        console.log(menus, 'yonghujainquan')
        // 2.根据权限比对私有路由 获取当前用户能够访问的路由
        const filtersRoutes = await store.dispatch(
          'userPermission/filterPrivateRoutes',
          menus
        )
        // 3.将当前用户过滤后的私有路由 ,动态添加到路由表中
        filtersRoutes.forEach((item) => {
          router.addRoute(item)
        })
        next(to.path)
      }
      // 登陆成功后跳转到首页
      next()
    }
  } else {
    if (whiteRouter.indexOf(to.path) > -1) {
      // 如果在没有值的时候跳转到登录页面是可行的
      next()
    } else {
      next('/login') // 反之如果没有值的时候也要跳转到登录页面
    }
  }
})
