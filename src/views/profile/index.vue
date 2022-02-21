<template>
  <div>
    <el-card class="box-card">
      <div style="vertical-align: middle">
        欢迎你:<span style="color: pink">{{
          store.state.user.userInfo.title
        }}</span
        ><br />
        <el-avatar
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        ></el-avatar>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
console.log(store.state.user.userInfo.title)
</script>

<style lang="scss" scoped>
.box-card {
  width: 480px;
}
</style>
