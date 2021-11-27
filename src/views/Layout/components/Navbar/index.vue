<template>
  <div class="navbar">
    <!-- 切换侧边栏的组件 -->
    <cuttle class="cuttle-container" />
    <!-- 面包屑 组件-->
    <breadcrumb class="breadcrumb-container" />
    <div class="right-menu">
      <!-- 导航搜索 -->
      <sear-ch class="right-menu-item" />
      <!-- 全屏切换 -->
      <screen-full class="right-menu-item" />
      <!-- 主题换肤的组件 -->
      <theme class="right-menu-item" />
      <!-- 国际化按钮 -->
      <select-lang class="right-menu-item" />

      <el-dropdown class="avatar-container">
        <!--   -->
        <div class="avatar-wrapper">
          <el-avatar shape="square" :size="40" :src="avatar"></el-avatar>
        </div>
        <template #dropdown>
          <el-dropdown-menu class="user-drop-down">
            <el-dropdown-item>{{ $t('msg.navBar.home') }}</el-dropdown-item>
            <el-dropdown-item>{{ $t('msg.navBar.course') }}</el-dropdown-item>
            <el-dropdown-item divided @click="logout">{{
              $t('msg.navBar.logout')
            }}</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
<script setup>
import Breadcrumb from '@/components/Breadcrumb/index.vue'
import avatar from '@/assets/logo.png'
import { useStore } from 'vuex'
import Cuttle from '@/components/Cuttle/index.vue'
import SelectLang from '@/components/SelectLang/index.vue'
import Theme from '@/components/Theme/index.vue'
// 全屏
import ScreenFull from '@/components/Sureenfull/index.vue'
//  搜索
import SearCh from '@/components/Search/index.vue'
// 主动退出
const store = useStore()
const logout = () => {
  store.dispatch('user/logout')
}
</script>
<style lang="scss" scoped>
.navbar {
  // width: 50px;
  height: 50px;
  overflow: hidden;
  position: relative;
  background-color: #ffff;
  box-shadow: 0 1px 4px rgba(0, 21, 41.08);
  .right-menu {
    display: flex;
    align-items: center;
    float: right;
    padding-right: 16px;
    :deep(.right-menu-item) {
      display: inline-block;
      // padding: 0 18px 0px 0;
      font-size: 24px;
      color: #ccc;
      margin-right: 10px;
      vertical-align: text-bottom;
      cursor: pointer;
      &:hover {
        background-color: rgba(0, 0, 0, 0.1);
      }
    }
    .avatar-container {
      cursor: pointer;
      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
        :deep(.el-avatar) {
          --el-avatar-background-color: none;
          margin-right: 10px;
        }
      }
    }
  }
  .cuttle-container {
    line-height: 50px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 1;
    &:hover {
      background: rgba(0, 0, 0, 0.1);
    }
  }
  .breadcrumb-container {
    line-height: 50px;
    height: 100%;
  }
  :deep(.el-breadcrumb) {
    line-height: 3.7;
  }
}
</style>
