import { createI18n } from 'vue-i18n'
import zh from './lang/zh'
import en from './lang/en'
import store from '@/store/index.js'
// 定义数据源
const messages = {
  en: {
    msg: {
      ...en
    }
  },
  zh: {
    msg: {
      ...zh
    }
  }
}
// 定义语言的类型
const locale = store.getters.language || 'en'
// console.log(messages.zh.msg)
// 初始化i18n
const i18n = createI18n({
  legacy: false, // 配合vue3.2是组合式api(components API)
  globalInjection: true, // 全局注册一个t函数 可以通过t()获取
  locale,
  messages
})
export default i18n
