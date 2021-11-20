<template>
  <div class="navbar">
    <div class="right-menu">
      <el-dropdown class="avatar-container">
        <!--   -->
        <div class="avatar-wrapper">
          <el-avatar shape="square" :size="40" :src="avatar"></el-avatar>
        </div>
        <template #dropdown>
          <el-dropdown-menu class="user-drop-down">
            <el-dropdown-item>首页</el-dropdown-item>
            <el-dropdown-item>课程主页</el-dropdown-item>
            <el-dropdown-item divided @click="logout"
              >退出登录</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
<script setup>
import avatar from '@/assets/logo.png'
import { useStore } from 'vuex'
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
}
</style>
