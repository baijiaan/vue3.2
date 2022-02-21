<template>
  <div
    class="app-wrapper"
    :class="store.getters.sideBarOpen ? '' : 'hideSidebar'"
  >
    <!-- 侧边栏(左边) -->
    <side-bar
      id="guidr-sidebar"
      class="sidebar-container"
      :style="{ backgroundColor: store.getters.cssVar.menuBg }"
    />
    <!-- 内容(右边) -->
    <div class="main-container">
      <div class="fixed-header">
        <nav-bar />
        <!-- tag view -->
        <tag-view />
      </div>

      <app-main class="appmain" />
    </div>
  </div>
</template>
<script setup>
import SideBar from './components/Sidebar/index.vue'
import AppMain from './components/Appmain/index.vue'
import NavBar from './components/Navbar/index.vue'
import TagView from '@/components/TagView/index.vue'
import { useStore } from 'vuex'

const store = useStore()
</script>
<style scoped lang="scss">
@import '~@/styles/common.scss';
@import '~@/styles/variables.scss';
.app-wrapper {
  @include clearfix;
  position: relative;
  // display: flex;
  height: 100%;
  width: 100%;
  .sidebar-container {
    width: $sideBarWidth;
    height: 100vh;
  }

  .fixed-header {
    position: fixed;
    top: 0px;
    right: 0px;
    z-index: 10;
    width: calc(100% - #{$sideBarWidth}); // 用来动态计算宽度的
    transition: width 0.28s;
  }
}
.hideSidebar .fixed-header {
  width: calc(100% - #{$sideBarhideWidth});
  transition: width 0.28s;
}
.hideSidebar {
  .sidebar-container {
    :deep(.el-menu) {
      .el-menu-item {
        padding: 0px 0px 0px 20px !important;
      }
    }
  }
  .fixed-header {
    width: calc(100% - #{$sideBarhideWidth});
  }
}
.appmain {
  margin-top: 34px;
}
</style>
