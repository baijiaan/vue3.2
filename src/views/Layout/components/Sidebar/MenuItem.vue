<template>
  <!-- el-icon v-if的作用是判断从父级传过来的数据有没有以el-icon开头的 如果是则执行当前的i标签 如果不是则执行封装的组件,也就是svg-icon这个组件 -->
  <i :class="icon" v-if="icon.includes('el-icon')"></i>
  <!-- svg图片 -->
  <svg-icon :iconName1="icon" className="sideClass" v-else />
  <span>{{ title }}</span>
</template>
<script setup>
import { defineProps } from 'vue'
defineProps({
  title: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  }
})
// console.log(props)
</script>
<style lang="scss" scoped>
.sideClass {
  margin-right: 10px;
  margin-left: 3px;
}
</style>
