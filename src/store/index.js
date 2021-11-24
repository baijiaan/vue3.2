import { createStore } from 'vuex'
import user from './modules/user.js'
import getters from './modules/getters.js'
import app from './modules/app.js'
export default createStore({
  modules: {
    user,
    app
  },
  getters
})
