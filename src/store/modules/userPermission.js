import { PublicRoutes, PrivateRoutes } from '@/router/index.js'
export default {
  namespaced: true,
  state: {
    // 保存用户的所有路由表
    routes: PublicRoutes
  },
  mutations: {
    setPrivateRoutes: (state, newPrivateRoutes) => {
      state.routes = [...PublicRoutes, ...newPrivateRoutes]
    }
  },
  actions: {
    filterPrivateRoutes: ({ commit }, menus) => {
      // menus是后台服务器返回的当前用户所拥有的权限
      const routes = []
      // 过滤
      menus.forEach((name) => {
        // 过滤出私有路由name属性和当前用户权限一样的路由 然后添加在临时数组routes中
        routes.push(...PrivateRoutes.filter((item) => item.name === name))
      })
      // 如果匹配不存在的路由 那就让统一加载404的页面
      commit('setPrivateRoutes', routes)
      return routes // 通过返回值可以在调用这个方法的位置拿到最终处理的数据
    }
  }
}
