import { createStore } from 'vuex'
import user from './modules/user.js'
import getters from './modules/getters.js'
import app from './modules/app.js'
import theme from './modules/theme.js'
import tagViewList from './modules/tag.js'
export default createStore({
  modules: {
    user,
    app,
    theme,
    tagViewList
  },
  getters
})
