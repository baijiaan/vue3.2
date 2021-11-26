<template>
  <div>
    <!-- div -->
    <div><elemem-pl /></div>
  </div>
</template>
<script setup>
import ElememPl from '@/components/elementlang/index.vue'
import { generateNewStyle, writeStyleToHearTag } from '@/utils/theme.js'
import { useStore } from 'vuex'
const store = useStore()
generateNewStyle(store.getters.theme_color).then((res) => {
  writeStyleToHearTag(res)
  // console.log(res, 'wwwww')
})
</script>

<style></style>
