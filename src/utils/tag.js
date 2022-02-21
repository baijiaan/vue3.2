// 下边的数组是在给vuex传值是不传下边的页面 相当于白名单
const isNoTagArr = ['/login', '/404', '/401', 'import']
//
export const isNoTag = (path) => {
  // 判断我要传给vuex的当前路由是否包含上边数组定义的值
  return isNoTagArr.includes(path)
}
