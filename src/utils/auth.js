import * as local from './storage.js'
import { TIME_STANP, TIME_OUT } from '@/common/common.js'
//
export const setTimeStamp = () => {
  // 设置token时间
  // 保存时间 也就是登录的时间 保存在localStorage 本地中
  // const
  local.setItem(TIME_STANP, Date.now())
}

// 获取保存token的时间
const getTimeStamp = () => {
  return local.getItem(TIME_STANP)
}

//  检测token时间是否超时
// true 不过期 false 过期
export const isCheckTimeOut = () => {
  // 用现在的时间 减去保存的时间 如果大于俩小时,就说明token过期了
  const currenTime = Date.now()
  /* eslint-disable-next-line */
  const time_stamp = getTimeStamp()
  /* eslint-disable-next-line */
  return currenTime - time_stamp <= TIME_OUT
}
