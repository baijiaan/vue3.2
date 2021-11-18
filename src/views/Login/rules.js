export const passwordValidator = (rule, value, callback) => {
  // 获取到输入的值做验证至少是几位
  if (value.length < 6) {
    callback(new Error('密码至少要输入六位')) // 密码不通过显示
  } else {
    callback() // 通过显示这个位置
  }
}
