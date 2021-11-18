import { login } from '@/api/user.js'
import md5 from 'md5'
import * as utils from '@/utils/storage.js'
import { TOKEN } from '@/common/common.js'
const state = {
  token: utils.getItem(TOKEN) || ''
}
const getters = {}
const mutations = {
  setToken(state, token) {
    console.log(token, '22222222222222')
    // 保存在vuex中
    state.token = token

    // 保存在本地存储中
    utils.setItem(TOKEN, token)
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
        // console.log(res.token, '11444444411') // 请求后端的数据
        // 保存在vuex中

        commit('setToken', res.token)
        resolve()
      })
    })
  }
}

export default {
  namespaced: true, // 因为是子集仓库所以要写这个值,不然就是全局的仓库了
  state,
  getters,
  actions,
  mutations
}
