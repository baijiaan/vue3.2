import variables from '@/styles/variables.scss'
// 集中暴露vuex 各个模块想要暴露的属性和方法
export default {
  token: (state) => state.user.token,
  userInfo: (state) => state.user.userInfo,
  hasUserInfo: (state) => {
    return JSON.stringify(state.user.userInfo) !== '{}'
  },
  cssVar: (state) => variables,
  sideBarOpen: (state) => state.app.sideBarOpend,
  language: (state) => state.app.language
}
