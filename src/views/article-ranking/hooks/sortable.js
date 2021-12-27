import Sortable from 'sortablejs'
import { ref } from 'vue'
import { updateArticleRanking } from '@/api/article.js'
import { ElMessage } from 'element-plus'
import i18n from '@/i18n/index.js'
// 绑定dom的
export const tableRef = ref(null)
// 初始化插件
export const initSortable = (tableData, getArticle) => {
  // el是要拖拽的dom元素 拖拽行为触发的dom区域
  // $el获取到对应的dom元素
  // 获取的dom返回的是一个数组 所以需要els[0]
  const els = tableRef.value.$el.querySelectorAll(
    '.el-table__body-wrapper > table > tbody'
  )
  Sortable.create(els[0], {
    // 拖拽时的样式
    ghostClass: 'ghost',
    // 按下鼠标后多久可以拖拽 1000表示1秒
    // delay: 500,
    // 动画效果
    animation: 150,
    // onEnd 拖拽结束后要干什么事情
    async onEnd(event) {
      // oldIndex  和 newIndex 分别代表的是 移动前的索引和移动后的索引
      const { oldIndex, newIndex } = event

      // 拖拽结束后 发送请求 更改排名
      // 现在tableData 的数据是所有的文章排名数据 所以需要通过索引获取到当前点击的要拖拽的元素的排名号 然后传给服务器有服务器对数据进行更改
      const initRanking = tableData.value[oldIndex].ranking
      console.log(initRanking)
      const finalRanking = tableData.value[newIndex].ranking
      await updateArticleRanking({
        initRanking,
        finalRanking
      }).then((res) => {
        ElMessage.success(i18n.global.t('msg.article.sortSuccess'))
      })
      // 在重新请求之前将之前的数据清空,然后再重新赋拖拽更改后的数据 // 原理上来说不请客应该应该也行,但现实给了我一个大嘴巴子,
      // 这个代码啊 不爱行 不请空真不行 原理咱也不知道
      tableData.value = []
      // 更改完成后重新请求数据
      getArticle()
    }
  })
}
