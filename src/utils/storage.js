// 将user和密码存储本地中
export const setItem = (key, value) => {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(key, value)
}

// 获取数据
export const getItem = (key) => {
  const value = window.localStorage.getItem(key)
  // 对象的字符串,也就是json格式 '{'name':'白家安'}'  '
  // try 语法没搞懂
  try {
    // 是一个对象
    return JSON.parse(value)
  } catch (err) {
    // 不是一个对象的字符串
    return value
  }
}

// 删除单个本地存储
export const deleteItem = (key) => {
  window.localStorage.removeItem(key)
}

// 删除所有的本地存储
export const clearItem = () => {
  window.localStorage.deleteItem()
}
