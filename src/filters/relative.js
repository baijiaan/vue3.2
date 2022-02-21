import dayjs from 'dayjs'
import i18n from '@/i18n/index.js'
import store from '@/store/index.js'
// dayjs插件内的属性
// 时间相对处理插件
import rt from 'dayjs/plugin/relativeTime'
// 这个代表dayjs要使用rt这个方法 如果不这样写dayjs无法调用to方法
// dayjs这个插件也支持中英文切换  默认是英文的 所以只需要导入中文的包就可以
import 'dayjs/locale/zh-cn'
dayjs.extend(rt)
export default (val) => {
  // console.log(val, 'shijian')
  if (!isNaN(val)) {
    // 将时间转为几天前 几秒前 等等等
    return dayjs()
      .locale(store.getters.language === 'zh' ? 'zh-cn' : 'en') // 判断当前需要显示的是中文还是英文
      .to(dayjs(parseInt(val)))
  } else {
    return i18n.global.t('msg.excel.nodateFormate')
  }
}
