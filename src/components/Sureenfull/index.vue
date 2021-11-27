<template>
  <!-- 全屏业务 -->
  <svg-icon
    :iconName1="isScreenFull ? 'fullscreen' : 'exit-fullscreen'"
    @click="toggleScreenFull"
    className="screenIcon"
  />
</template>
<script setup>
import { ref } from 'vue'
import screenfull from 'screenfull'
const isScreenFull = ref(true)
const toggleScreenFull = () => {
  isScreenFull.value = !isScreenFull.value
  // 使用screenfull 插件完成全屏切换
  screenfull.toggle() // 默认将body全屏
}
</script>
<style lang="scss" scoped>
.screenIcon {
  fill: currentColor;
  color: #393735 !important;
}
</style>
