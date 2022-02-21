import { login, getUserInfo } from '@/api/user.js'
import md5 from 'md5'
import router, { clearPrivateRoutes } from '@/router/index.js'
import * as utils from '@/utils/storage.js'
import { TOKEN } from '@/common/common.js'
import { setTimeStamp } from '@/utils/auth.js'
//
const state = {
  token: utils.getItem(TOKEN) || '',
  // userInfo: utils.getItem(USER_INFO) || {}
  userInfo: {}
}
const getters = {}
const mutations = {
  setToken(state, token) {
    console.log(token, '22222222222222')
    // 保存在vuex中
    state.token = token

    // 保存在本地存储中
    utils.setItem(TOKEN, token)
  },
  setUserInfo(state, userInfo) {
    console.log(userInfo, '白家安111')
    state.userInfo = userInfo
    // 保存在本地
    // utils.setItem(USER_INFO, userInfo)
  }
}
const actions = {
  login({ commit }, info) {
    // 获取账号密码的信息
    const { username, password } = info // 不解构的话是响应数据,如果在这个位置进行加密就会影响到页面的password输入框,因为用的是model进行的双向绑定
    return new Promise((resolve, reject) => {
      login({
        username,
        password: md5(password)
      }).then((res) => {
        console.log(res, '222')
        console.log(res.token, '11444444411') // 请求后端的数据
        // 保存在vuex中
        commit('setToken', res.token)
        // 保存token 到vuex 和 本地存储中
        setTimeStamp()
        resolve()
      })
    })
  },
  // 退出业务
  logout(context) {
    // 清理用户数据
    context.commit('setToken', '')

    context.dispatch('roleAndPermission/clearRoleAmdPermission', null, {
      root: true
    })
    /// 清空当前该用户的动态路由
    clearPrivateRoutes()
    context.commit('setUserInfo', {})
    // 清理数据之后跳转
    router.push('/login')
  },
  // 请求用户数据
  async getUserInfo({ commit }) {
    // 发送axios
    const res = await getUserInfo()
    commit('setUserInfo', res)
    // 因为在路由鉴权页面需要拿到用户的登录信息 所以需要返回值
    return res
  }
}

export default {
  namespaced: true, // 因为是子集仓库所以要写这个值,不然就是全局的仓库了
  state,
  getters,
  actions,
  mutations
}
