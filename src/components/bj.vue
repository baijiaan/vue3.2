<template>
  <div></div>
</template>
<script setup>
import { ref } from 'vue'
const backgroundimg = ref({
  backgroundImage: 'url(' + require('../../assets/2.jpeg') + ')',
  width: ' 100%',
  height: '100vh',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center center',
  backgroundSize: '100% 100%'
})
</script>
<style scoped></style>
