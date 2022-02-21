import store from '@/store/index.js'

const checkoutPermission = (el, binding) => {
  const value = binding.value
  // 获取到后端返回的当前角色所可以操作的页面权限
  const points = store.getters.userInfo.permission.points

  // 有权限显示
  const index = points.findIndex((item) => item === value)
  if (index <= 0) {
    // 没权限删除dom 删除当前dom的父节点removeChild()
    el.parentNode && el.parentNode.removeChild(el) // 删除当前节点的父节点
  }

  // return
}

export default {
  mounted(el, binding) {
    // console.log(binding, '自定义指定')
    checkoutPermission(el, binding)
  },
  updated(el, binding) {
    checkoutPermission(el, binding)
  }
}
