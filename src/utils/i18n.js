// 侧边栏展示效果中英文切换
import i18n from '@/i18n/index.js'
import { watch } from 'vue'
import store from '@/store/index.js'
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
        cb(store.getters.language)
      })
    }
  )
}
