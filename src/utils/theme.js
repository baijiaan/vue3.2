import axios from 'axios'
import { colorMap, colorTables } from '@/common/common.js'
import color from 'css-color-function' // 基于主色填充不同程度的白色
import rgbHex from 'rgb-hex' // 转换16进制
// 生成最终的样式
export const generateNewStyle = async (primary) => {
  // 如果没有传过来主色就不用执行了
  if (!primary) return
  // 获取所有的element样式  请求element css样式的地址https://unpkg.com/element-plus@1.2.0-beta.3/dist/index.css
  const originalStyle = await getOriginalStyle()
  // const cssTemplate =
  // 2.分析原始样式  找出需要替换的颜色 做上标记
  let newStyle = getStyleTemplate(originalStyle)
  // console.log(newStyle,'已经替换了并且已经打上了标记')
  // 3.根据主色生成对应的情景色
  const newColors = generateColors(primary)
  // console.log(newColors, '22222')

  // 4. 在newStyle的模班中将标记统一替换成已经生成的色值
  Object.keys(newColors).forEach((key) => {
    // key值和打入css样式的标识一样 所以通过查找key值并替换成我自己生成的相对应的主色和情景色 然后再利用原生js把他导入到header的最后使其生效
    newStyle = newStyle.replace(
      new RegExp('(:|\\s+)' + key, 'g'),
      '$1' + newColors[key]
    )
  })
  return newStyle
}
// `https://unpkg.com/element-plus@${version}/dist/index.css`
const getOriginalStyle = async () => {
  // const version = require('element-plus/package.json').version
  const url = 'http://localhost:8080/element-plus.css'
  const { data } = await axios.get(url) // 加async awiat 返回的是promise
  // console.log(data)
  return data
}
const getStyleTemplate = (Style) => {
  Object.keys(colorMap).forEach((key) => {
    const value = colorMap[key]

    Style = Style.replace(new RegExp(key, 'gi'), value)
  })
  return Style
  // console.log(a)
}
export const generateColors = (primary) => {
  // 根据主色生成对应的情景色
  const colors = {
    primary
  }
  // console.log(colors, '11')
  Object.keys(colorTables).forEach((key) => {
    // 将主色应用到color 函数中    利用正则查找colorTables中所有的primary字符串 并替换成primary变量
    const value = colorTables[key].replace(new RegExp(/primary/g), primary)
    // console.log(value, 'value')
    // 生成16进制的颜色 替换color(primary tint(10%)
    colors[key] = '#' + rgbHex(color.convert(value))
  })
  // console.log(colors, 'color')
  return colors
}
// 将生成的样式写入到head标签中 原生的方法
//
export const writeStyleToHearTag = (newStyle) => {
  const style = document.createElement('style')
  style.innerHTML = newStyle
  // appendChild插入到最后就能够生效
  document.head.appendChild(style)
}
