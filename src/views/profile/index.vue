<template>
  <div class="">个人中心</div>
  <p>{{ $t('msg.login.title') }}</p>
  <div class="demo-pagination-block">
    <el-pagination
      v-model:currentPage="currentPage1"
      :page-size="100"
      layout="total, prev, pager, next"
      :total="1000"
    >
    </el-pagination>
  </div>
</template>

<script setup>
import {} from 'vue'
</script>

<style lang="scss" scoped></style>
