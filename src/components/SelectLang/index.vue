<template>
  <el-dropdown trigger="click" @command="selectLang">
    <!-- 国际化图标 -->
    <svg-icon iconName1="language"></svg-icon>
    <!-- 下拉选项 -->
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          command="zh"
          :disabled="store.getters.language === 'zh' ? true : false"
          >中文</el-dropdown-item
        >
        <el-dropdown-item
          command="en"
          :disabled="store.getters.language === 'en' ? true : false"
          >英文</el-dropdown-item
        >
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
<script setup>
import { useStore } from 'vuex'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
const store = useStore()
const i18n = useI18n()
const selectLang = (lang) => {
  // console.log(lang)
  // 触发vuex 中的language
  store.commit('app/setLanguage', lang)
  // i18n 中的locale变量
  // 通过这个获取到封装的i18n对象并更改对象内的locale初始化的zh或者en
  i18n.locale.value = lang // 更改了i18n下的index.js中的locale语言变量
  // console.log(i18n.locale)
  // 提示语言切换成功
  ElMessage.success(i18n.t('msg.toast.switchLangSuccess'))
}
</script>
<style lang="scss" scoped></style>
