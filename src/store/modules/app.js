const state = {
  sideBarOpend: true
}
const mutations = {
  toggleSidebar(state) {
    state.sideBarOpend = !state.sideBarOpend
  }
}
export default {
  namespaced: true,
  state,
  mutations
}
