<template>
  <!-- 标头图片控制菜单伸缩 -->
  <div class="cuttle_container" @click="toggleSideBar">
    <svg-icon :iconName1="getIcon" className="cuttle" />
  </div>
</template>
<script setup>
import { useStore } from 'vuex'
import { computed } from 'vue'
const store = useStore()
const getIcon = computed(() => {
  return store.getters.sideBarOpen ? 'cuttle_open' : 'closed'
})
const toggleSideBar = () => {
  store.commit('app/toggleSidebar')
}
</script>
<style lang="scss" scoped>
.cuttle_container {
  padding: 0 16px;
  .cuttle {
    display: inline-block;
    vertical-align: middle;
    width: 20px;
    height: 20px;
  }
}
</style>
