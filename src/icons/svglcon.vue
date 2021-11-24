<template>
  <svg aria-hidden="true" :class="getClassName">
    <use :xlink:href="iconName"></use>
  </svg>
</template>
<script setup>
import { computed, defineProps } from 'vue'
const props = defineProps({
  iconName1: {
    type: String,
    require: true
  },
  className: {
    type: String
  }
})
// console.log(props, '1111')
const iconName = computed(() => {
  return `#icon-${props.iconName1}`
})
const getClassName = computed(() => {
  if (props.className) {
    // 如果穿了className  就传入值并拼接传入的值
    return `defaultSvgClass ${props.className}`
  } else {
    // 如果没传就不拼接
    return 'defaultSvgClass'
  }
})
</script>
<style scoped lang="scss">
.defaultSvgClass {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  overflow: hidden;
  fill: currentColor;
  display: inline-block;
}
</style>
