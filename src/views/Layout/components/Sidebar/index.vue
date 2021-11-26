<template>
  <div class="side">
    <!-- logo伸缩显示样式 -->
    <div class="logo-container">
      <!-- 图片是无论伸或者缩都是出现的所以无需做判断 -->
      <el-avatar :src="Logo" shape="square"></el-avatar>
      <!-- 如果store.getters.sideBarOpen值为真则显示 值为假则隐藏 (如果侧边栏是收回状态的话就隐藏下边的内容) -->
      <h1 class="logo-title" v-if="store.getters.sideBarOpen">element_admin</h1>
    </div>
    <!-- 滚动的组件 -->
    <el-scrollbar>
      <sidebar-menu />
    </el-scrollbar>
  </div>
</template>
<script setup>
import Logo from '@/assets/logo.png'
import SidebarMenu from './SidebarMenu.vue'
import { useStore } from 'vuex'
import { computed } from 'vue'
const store = useStore()
// 可行
// const bgcolor = computed(() => {
//   return store.getters.cssVar.menuBg
// })
</script>
<style lang="scss" scoped>
// .side {
//   background-color: v-bind(bgcolor) !important;
// }
.logo-container {
  height: 44px;
  padding: 10px 0 22px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  :deep(.el-avatar) {
    --el-avatar-background-color: none;
  }
  .logo-title {
    margin-left: 10px;
    color: #fff;
    font-weight: 600;
    line-height: 50px;
    font-size: 16px;
    white-space: nowrap;
  }
}
</style>
