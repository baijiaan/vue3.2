import { getItem, setItem } from '@/utils/storage.js'
import { LANGUAGE } from '@/common/common.js'
const state = {
  sideBarOpend: true,
  language: getItem(LANGUAGE) || ''
}
const mutations = {
  toggleSidebar(state) {
    state.sideBarOpend = !state.sideBarOpend
  },
  setLanguage(state, lang) {
    setItem(LANGUAGE, lang)
    state.language = lang
  }
}
export default {
  namespaced: true,
  state,
  mutations
}
