<template>
  <div class="article-detail-container">
    <h2 class="title">{{ datailData.title }}</h2>
    <div class="header">
      <!-- 作者 -->
      <span class="author">{{
        $t('msg.article.author') + ':' + datailData.author
      }}</span>
      <!-- 时间 -->
      <span class="time">{{
        $t('msg.article.publicDate') +
        ':' +
        $filters.relative(datailData.publicDate)
      }}</span>
      <!-- 编辑按钮- -->
      <el-button type="text" class="edit" @click="editArticle">{{
        $t('msg.article.edit')
      }}</el-button>
    </div>
    <hr />
    <!-- 内容 -->
    <div class="content" v-html="datailData.content"></div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { ArticleDerail } from '@/api/article'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
const datailData = ref({})
const getArticleDetail = async (id) => {
  const data = await ArticleDerail(id)
  datailData.value = data
  // console.log(datailData.value, 'data')
}
watch(
  () => {
    return route.params.id
  },
  (val) => {
    // 需要注意的是 如果需要依赖路由传参 需要改变时数据发生改变的话监听路由信息(算是个小坑!切记!切记)
    // 如果当前路由存在执行 不存在执行后端解析不了
    if (val) {
      // console.log(val, '传递的id')
      if (val !== ':id') {
        getArticleDetail(val)
      }
    }
    // articleid.value = val.id
  },
  {
    immediate: true
  }
)
//  ------------编辑文本业务----------------
// 点击编辑文本
const editArticle = () => {
  router.push('/article/editor/' + route.params.id)
}
</script>

<style lang="scss" scoped>
.article-detail-container {
  .title {
    font-size: 22px;
    text-align: center;
    padding: 12px 0;
  }
  .header {
    padding: 26px 0;
    .author {
      font-size: 14px;
      color: #556665;
      margin-right: 20px;
    }
    .time {
      font-size: 14px;
      color: #999aaa;
      margin-right: 20px;
    }
    .edit {
      float: right;
    }
  }
  .content {
    font-size: 20px;
    padding: 20px 0;
    border-top: 1px solir #556665;
  }
}
</style>
