import { ref } from 'vue'
import E from 'wangeditor'
import i18n from '@/i18n/index.js'
import { ElMessage } from 'element-plus'
// 提交数据
import { Submitarticle } from '@/api/article.js'
export const AlldataRich = ref(null)
const clear = ref('')
export const initrich = () => {
  const editor = new E('#div1')
  // 解决兼容问题
  editor.customConfig = editor.customConfig
    ? editor.customConfig
    : editor.config
  editor.customConfig.onchange = (html) => {
    // mainhtml.value = html
    AlldataRich.value = html
  }
  clear.value = editor
  editor.create()
}
export const AllArticle = async (titlename) => {
  await Submitarticle({
    title: titlename,
    content: AlldataRich.value
  }).then((res) => {
    ElMessage.success(i18n.global.t('msg.article.createSuccess'))
    // 清空富文本内容
    clear.value.txt.clear()
  })
}
