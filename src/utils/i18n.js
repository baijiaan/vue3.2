// 侧边栏展示效果中英文切换
import i18n from '@/i18n/index.js'
import { watch } from 'vue'
import store from '@/store/index.js'
import { ElMessage } from 'element-plus'
export const getTitle = (title) => {
  return i18n.global.t('msg.route.' + title)
}

// 中英文切换时搜索框显示相对应的语言
export const watchLang = (...cbs) => {
  watch(
    () => {
      return store.getters.language
    },
    () => {
      cbs.forEach((cb) => {
        try {
          cb(store.getters.language)
        } catch {
          // 不加异步的话中英文切换的弹框可能会冲突
          // 加载异步就可以解决这个问题了
          setTimeout(() => {
            ElMessage.error('不符合预期')
          })
        }
      })
    }
  )
}
