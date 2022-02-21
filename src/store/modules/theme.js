import { getItem, setItem } from '@/utils/storage.js'
import { MYCOLOR } from '@/common/common.js'
export default {
  namespaced: true,
  state: {
    myColor: getItem(MYCOLOR) || '#cccccc'
  },
  mutations: {
    setMycolor(state, color) {
      // 设置主题色
      state.myColor = color
      // 保存在本地存储中
      setItem(MYCOLOR, color)
    }
  }
}
