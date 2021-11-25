import i18n from '@/i18n/index.js'

export const passwordValidator = (rule, value, callback) => {
  // 获取到输入的值做验证至少是几位
  if (value.length < 6) {
    callback(new Error(i18n.global.t('msg.login.passwordRule'))) // 密码不通过显示
  } else {
    callback() // 通过显示这个位置
  }
}
export const usernameValidator = (rule, value, callback) => {
  if (value.length <= 0) {
    callback(new Error(i18n.global.t('msg.login.usernameRule'))) // 密码不通过显示
  } else {
    callback() // 通过显示这个位置
  }
}
