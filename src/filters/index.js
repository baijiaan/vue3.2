import dateFilter from './dataFilter'
import relative from './relative.js'
export default (app) => {
  app.config.globalProperties.$filters = {
    dateFilter,
    relative
  }
}
