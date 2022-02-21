// hooks封装
import Editor from '@toast-ui/editor'
import '@toast-ui/editor/dist/toastui-editor.css' // Editor's Style
// 中文包
import '@toast-ui/editor/dist/i18n/zh-cn.js'
import i18n from '@/i18n/index.js'

import { ElMessage } from 'element-plus'
// 提交数据
import { Submitarticle } from '@/api/article.js'
import { ref } from 'vue'

export const editor = ref(null)

const editorAll = ref('')
export const editAllArticle = ref('')
export let editor1
export const init = () => {
  editor1 = new Editor({
    // dom元素本身
    el: editor.value,
    height: '400px',
    initialEditType: 'markdown',
    previewStyle: 'vertical',
    // 中文包
    language: 'zh-CN'
  })
  editorAll.value = editor1
}
export const initCreate = async (name) => {
  await Submitarticle({
    title: name,
    // 在调用的时候获取 在这里用是因为editorAll是响应式的当markdown内容改变在点击的时候会重新获取最新的值 所以要在这里获取markdown的值
    content: editorAll.value.getHTML()
  }).then((res) => {
    ElMessage.success(i18n.global.t('msg.article.createSuccess'))

    // 找底层dom然后清空
    const ppp = editor.value.querySelector(
      '.toastui-editor-main > .toastui-editor-md-container > .toastui-editor > .ProseMirror > div'
    )
    ppp.innerHTML = ''
    // editor.value.innerHTML = ''
  })
}
