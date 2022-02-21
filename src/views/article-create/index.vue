<template>
  <div>
    <el-card>
      <el-input v-model="titlename" placeholder="Please input" class="title" />
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="markdown" name="first">
          <div ref="editor"></div>
        </el-tab-pane>
        <el-tab-pane label="富文本" name="second">
          <div id="div1"></div>
        </el-tab-pane>
      </el-tabs>
      <el-button type="success" class="footer" @click="submitarticle1">{{
        $t('msg.article.commit')
      }}</el-button>
    </el-card>
  </div>
</template>
<script setup>
import { ref, onMounted, watch, defineProps } from 'vue'
import { ArticleDerail, editArticle } from '@/api/article.js'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'
import { onBeforeRouteLeave, useRoute } from 'vue-router'

// ------------富文本封装hooks------------------
import { initrich, AllArticle } from './hooks/datarich.js'

// -------------结束hooks----------------------
// ---------------------hooks封装-----------------
import { editor, init, initCreate, editor1 } from './hooks/index.js'
onMounted(() => {
  // if()
  init()
  // 富文本方法:
  initrich()
})
// -----------hooks结束----------------------------
const i18n = useI18n()
const route = useRoute()
const props = defineProps({
  id: {
    type: String,
    required: true
  }
})
// input
const titlename = ref(null)
// 选项卡默认选则哪个标签
const activeName = ref('first')
// 提交文章
const submitarticle1 = async () => {
  // console.log(route)
  if (activeName.value === 'first') {
    // 清空inputname
    // titlename.value = ''
    // :id代表没有传值 也就是说不是需要修改的文章
    if (props.id === undefined) {
      initCreate(titlename.value)
      titlename.value = ''
    } else if (props.id !== ':id') {
      console.log(props.id, '内容')
      await editArticle({
        id: props.id,
        title: titlename.value,
        content: editor1.getHTML()
      }).then((res) => {
        ElMessage.success(i18n.t('msg.article.editorSuccess'))
        // 修改后清空markdown
        editor1.setHTML('')
        titlename.value = ''
      })
    }
  } else if (activeName.value === 'second') {
    AllArticle(titlename.value)
    titlename.value = ''
  }
}
onBeforeRouteLeave((to, from) => {
  // 离开当前的组件，触发
  console.log(to.meta.title)
  console.log(from.meta.title)
  if (
    to.meta.title === 'articleCreate' &&
    from.meta.title === 'articleEditor'
  ) {
    console.log('before')
    editor1.setHTML('')
    titlename.value = ''
  }
})
const amendarticle = async (val) => {
  // console.log('我执行了吗')
  const res = await ArticleDerail(val)
  // console.log(res, '????')
  titlename.value = res.title
  // 对markdown进行重新赋值
  editor1.setHTML(res.content)
}
watch(
  () => {
    return props.id
  },
  (val, old) => {
    if (val !== undefined) {
      console.log('执行了方法')
      console.log(val)
      amendarticle(val)
    }
  },
  {
    immediate: true
  }
)
</script>
<style lang="scss" scoped>
.title {
  margin-bottom: 20px;
}
.footer {
  float: right;
  margin: 20px 0;
  // padding: 0px;
}
</style>
<!-- <mark-down
            :numvalue="numvalue"
            @getChildrenArticle="getChildrenArticle"
          ></mark-down> -->
