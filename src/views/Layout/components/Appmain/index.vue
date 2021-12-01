<template>
  <div class="app-main">
    <!-- 二级路由显示容器 -->
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>
<script setup>
// 引入路由切换栏
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { isNoTag } from '@/utils/tag.js'
import { useStore } from 'vuex'
import { getTitle as getTitle_, watchLang } from '@/utils/i18n.js'

// 获取title
const getTitle = (to) => {
  console.log(to, 'wwww')
  if (!to.meta || !to.meta.title) {
    // 如果不存在title
    const tmp = to.path.splite('/')

    return tmp[tmp.length - 1]
  } else {
    // 如果存在title 以path的最后一项作为title
    return getTitle_(to.meta.title)
  }
}
// 监听当前路由变化 增加当前路由到vuex
const route = useRoute()
const store = useStore()
watch(
  route,
  (to, from) => {
    console.log(to.fullPath, '222')
    if (isNoTag(to.path)) {
      return true
    }

    // 路由发生变化 增加到vuex
    const { path, fullPath, meta, name, params, query } = to
    console.log(to, 'bbb')
    store.commit('tagViewList/addTagViewList', {
      path,
      fullPath,
      meta,
      name,
      params,
      query,
      title: getTitle(to)
    })
  },
  {
    inmediate: true
  }
)
// 当语言切换 要重新更新vuex中的title的值
watchLang(() => {
  // 重新更新vue中的title的值
  const tmpArr = []
  store.getters.tagViewList.forEach((route) => {
    tmpArr.push({ ...route, title: getTitle(route) }) // 不能直接使用getTitle_(route.title) 因为可能在vuex中的title是中文 那样就解析不了
  })
  store.commit('tagViewList/changTitle', tmpArr)
})
</script>
<style scoped lang="scss">
.app-main {
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
  padding: 61px 20px 20px 20px;
  box-sizing: border-box;
}
</style>
