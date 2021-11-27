/* 在js中可以直接引入node模块块,在vue中是引入不了的 */
import path from 'path'
import i18n from '@/i18n/index.js'

/*
 1.去除重复的二级路由,保持一二级路由的层级关系
*/
// 获取所有的二级路由
const getChildrenRouters = (routes) => {
  const result = []
  //
  routes.forEach((route) => {
    // 这个判断是用于判断是否存在子路由 // 如果存在添加到result数组中,没有则不保存
    if (route.children && route.children.length > 0) {
      // 当前route是一级路由
      result.push(...route.children)
    }
  })
  return result
}
export const filterRouter = (routes) => {
  // routes.forEach(router)
  // 获取所有的二级路由
  const childrenRouters = getChildrenRouters(routes)
  // 只要在childrenRouters存在的,说明是重复二级路由,所以不保存
  return routes.filter((router) => {
    return !childrenRouters.find((childrenRouters) => {
      return childrenRouters.path === router.path
    })
  })
}

/**
 * 判断数据是否为空值
 */
const isNull = (data) => {
  if (!data) return true
  if (JSON.stringify(data) === '{}') return true
  if (JSON.stringify(data) === '[]') return true
  return false
}

// 2.将routes(filterRouter后的)为了配合v-for遍历生成对应的菜单,需要格式化数据
export function generateMenus(routes, basePath = '') {
  const result = []
  // 遍历路由表
  routes.forEach((item) => {
    // 不存在 children && 不存在 meta 直接 return
    if (isNull(item.meta) && isNull(item.children)) return
    // 存在 children 不存在 meta，进入迭代
    if (isNull(item.meta) && !isNull(item.children)) {
      result.push(...generateMenus(item.children))
      return
    }
    // 合并 path 作为跳转路径
    const routePath = path.resolve(basePath, item.path)
    // 路由分离之后，存在同名父路由的情况，需要单独处理
    let route = result.find((item) => item.path === routePath)
    if (!route) {
      route = {
        ...item,
        path: routePath,
        children: []
      }

      // icon 与 title 必须全部存在
      if (route.meta.icon && route.meta.title) {
        // meta 存在生成 route 对象，放入 arr
        result.push(route)
      }
    }

    // 存在 children 进入迭代到children
    if (item.children) {
      route.children.push(...generateMenus(item.children, route.path))
    }
  })
  return result
}

// 配合fuse.js处理路由格式化的数据源 满足fuse.js的搜索方式
// @ param routes 是filter过滤去重以后的路由

export const generateFuse = (routes, titles = []) => {
  // 处理格式化 将一级路由以及二级路由格式成为同级的
  let res = []
  // 遍历routes
  for (const route of routes) {
    const data = {
      path: route.path,
      title: [...titles] // 不递归的话这里是个空 如果迭代这里就是以后的一级标题的title
    }
    // console.log(route)
    // 满足这个条件 1.具备meta && meta.title 2.过滤掉动态路由
    // 声明一个正则用于匹配动态路由 /:id
    const reg = /.*\/:.*/
    if (route.meta && route.meta.title && !reg.exec(route.path)) {
      // 变成国际化
      const title = i18n.global.t('msg.route.' + route.meta.title)
      data.title = [...data.title, title]
      res.push(data)
    }
    // 处理一级菜单的子路由
    if (route.children && route.children.length > 0) {
      const subRes = generateFuse(route.children, data.title)
      if (subRes.length > 0) {
        res = [...res, ...subRes]
      }
    }
  }
  return res
}
