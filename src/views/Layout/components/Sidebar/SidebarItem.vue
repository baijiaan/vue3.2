<template>
  <!-- 这个页面接收从SidebarMenu.vue传过来的的路由表信息并做出相应的操作 -->
  <!-- 有二级菜单 -->
  <el-submenu v-if="route.children.length > 0" :index="route.path">
    <!--  -->
    <template #title>
      <!-- 这个子组件封装的是图标和菜单文字信息 title传的是菜单文字 icon传的是svg图片 -->
      <menu-item :title="route.meta.title" :icon="route.meta.icon" />
    </template>

    <!-- 循环子菜单 -->
    <!-- 之所以循环当前的这个菜单 是因为现在的这个菜单有二级菜单 通过循环整个当前组件可以把二级菜单循环并展示 -->
    <sidebar-item
      v-for="item in route.children"
      :key="item.path"
      :route="item"
    />
  </el-submenu>
  <!-- 只有一级的菜单 -->
  <el-menu-item :index="route.path" v-else>
    <!--  -->
    <menu-item :title="route.meta.title" :icon="route.meta.icon" />
  </el-menu-item>
</template>
<script setup>
import { defineProps } from 'vue'
import MenuItem from './MenuItem.vue'
defineProps({
  route: {
    type: Object,
    required: true
  }
})
// console.log(route.value, '1111')
</script>
<style lang="scss" scoped></style>
