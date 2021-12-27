<template>
  <div>
    <!-- 封装的公共组件 -->
    <!-- <el-card> -->
    <slot :headerStyleObj="headerStyleObj" />
    <!-- </el-card> -->
  </div>
</template>
<script setup>
import { ref, computed, watch, defineProps } from 'vue'
import { useStore } from 'vuex'
import { watchLang } from '@/utils/i18n'
const store = useStore()
// 表头背景色
const headerStyleObj = ref({
  background: store.getters.cssVar['light-3'],
  color: '#eee',
  fontWeight: 900
})
// 修改二级菜单的背景色
const childrenBgColor = ref(store.getters.cssVar['light-6'])
// // 修改hover 状态的背景
const hoverBgColor = ref(store.getters.cssVar['light-3'])

const badgeColorHover = ref(store.getters.cssVar['light-1'])
const badgeColor = ref(store.getters.cssVar['light-3'])

// 拖拽业务的背景色
const sortableColor = ref(store.getters.cssVar['light-3'])
// 监听主题切换
watch(
  () => {
    return store.getters.cssVar
  },
  () => {
    headerStyleObj.value.background = store.getters.cssVar['light-3']
    childrenBgColor.value = store.getters.cssVar['light-6']
    hoverBgColor.value = store.getters.cssVar['light-3']
    badgeColorHover.value = store.getters.cssVar['light-1']
    badgeColor.value = store.getters.cssVar['light-3']
    sortableColor.value = store.getters.cssVar['light-3']
  }
)
// 公共业务
// 1.当语言切换的时候 重新调用表格的数据初始化
const props = defineProps({
  cbs: {
    type: Array,
    validator: (cbs) => {
      // cbs必须是一个数组
      if (Array.isArray(cbs)) {
        // 数组中的每一个值必须是一个函数
        // every是判断数组中的值是否满足条件
        // 有一个不满足则返回的是false
        cbs.every((item) => typeof item === 'function')
      } else {
        throw new Error('@@@@')
      }
    }
  }
})
// 调用封装的函数监听语言的切换
watchLang(...props.cbs)
</script>
<style lang="scss" scoped>
:deep(.el-table__row--level-1 > td) {
  background-color: v-bind(childrenBgColor);
}
:deep(.el-table__body tr:hover > td) {
  background-color: v-bind(hoverBgColor) !important;
  color: #fff;
}

:deep(.el-badge__content.is-fixed) {
  top: 9px;
  background-color: v-bind(badgeColor);
  right: calc(4px + var(--el-badge-size) / 2);
  &:hover {
    background-color: v-bind(badgeColorHover);
  }
}
// 拖拽时的背景色
:deep(.ghost) {
  background-color: v-bind(sortableColor) !important;
  color: pink !important;
}
</style>
