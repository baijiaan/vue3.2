import { ref, watch } from 'vue'
// 所有的列数据 import静态导入
import getDdynamicData_ from './daynamicData.js'
import { watchLang } from '@/utils/i18n.js'

// 所有的列数据

// 配置要循环遍历的数据 // 这里使用函数是因为import 导入的数据是静态的 只有使用函数才能够调用
export const dynamicData = ref(getDdynamicData_())
// checkbox 动态选择列的的业务 默认勾选所有的列
export const selectDynamicLabel = ref([])

// 初始换checkbox-group 如果不初始化就没有办法通过selectDynamicLabel获取到当前想要出现或者隐藏的数据

const initSelectDynamicLabel = () => {
  // map返回的是一个数组所以可以直接复制
  // 为什么这个地方不用filter 因为filter过滤满足条件的返回的不是当前值而是整个当前对象
  selectDynamicLabel.value = dynamicData.value.map((item) => item.label)
  // console.log(selectDynamicLabel.value, '????')
}
initSelectDynamicLabel()

// 表格的列数据
export const tableLabels = ref([])
// 监听选择的列
watch(
  selectDynamicLabel,
  (val) => {
    // 通过过滤返回的是当前checkbox选中的数据 如果和当前选中的数据所匹配就将这个数据保存 不匹配就过滤掉
    const selectData = dynamicData.value.filter((item) =>
      val.includes(item.label)
    )
    tableLabels.value = selectData
  },
  {
    immediate: true
  }
)
// console.log(tableLabels.value, '>>>>>')

// 监听切换语言
watchLang(() => {
  // 当语言发生改变后 调用之前配置的文件 重新执行然后重新赋值实现中英文切换
  dynamicData.value = getDdynamicData_()
  // 语言切换后在重新调用执行 将checkbox的状态跟随语言状态重新执行

  initSelectDynamicLabel()
})
