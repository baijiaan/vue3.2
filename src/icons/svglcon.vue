<template>
  <svg aria-hidden="true" class="defaultSvgClass">
    <use :xlink:href="iconName"></use>
  </svg>
</template>
<script setup>
import { computed, defineProps } from 'vue'
const props = defineProps({
  iconName1: {
    type: String,
    require: true
  }
})
console.log(props, '1111')
const iconName = computed(() => {
  return `#icon-${props.iconName1}`
})
</script>
<style scoped lang="scss">
.defaultSvgClass {
  width: 1em;
  height: 2em;
  vertical-align: -0.15em;
  overflow: hidden;
  fill: currentColor;
  display: inline-block;
}
</style>
