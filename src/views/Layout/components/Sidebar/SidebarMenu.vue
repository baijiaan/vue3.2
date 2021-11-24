<template>
  <!--  主菜单 -->

  <el-menu
    :background-color="store.getters.cssVar.menuBg"
    :text-color="store.getters.cssVar.menuText"
    :active-text-color="store.getters.cssVar.menuActiveText"
    :unique-opened="true"
    :default-active="activePath"
    :router="true"
    :collapse="!store.getters.sideBarOpen"
  >
    <!-- 实现一二级菜单的展示 -->
    <sidebar-item v-for="item in routes" :key="item.path" :route="item" />
    <!-- 子集菜单 -->
  </el-menu>
</template>
<script setup>
import SidebarItem from './SidebarItem.vue'
// 获取路由
import { useRouter, useRoute } from 'vue-router'
import { filterRouter, generateMenus } from '@/utils/router.js'
import { computed } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const router = useRouter()
const route = useRoute()
// 获取路由表
// console.log(router.options.routes, '22222')
// 获取路由
// console.log(router.getRoutes())
// 去重
// console.log(filterRouter(router.getRoutes())) // 代表一级菜单
// 格式化路由
// console.log(generateMenus(filterRouter(router.getRoutes())), '2122')
// 因为路由要变化,所以用计算属性
const routes = computed(() => {
  const filterRoutes = filterRouter(router.getRoutes())
  return generateMenus(filterRoutes)
})
// console.log(route, '2baj')
const activePath = computed(() => {
  // 之所以加computed 是因为路由会变化 而computed的作用是依赖的值发生改变就会重新计算
  const { path } = route
  return path
})
</script>
<style lang="scss" scoped></style>
