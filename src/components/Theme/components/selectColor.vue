<template>
  <el-dialog
    :model-value="showDialogVariable"
    :title="$t('msg.theme.themeChange')"
    width="30%"
    @close="handleClose"
  >
    <!-- 取色器 -->
    <div class="content">
      <p class="title">{{ $t('msg.theme.themeColorChange') }}</p>
      <el-color-picker v-model="color" :predefine="predefineColors" />
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">{{
          $t('msg.universal.cancel')
        }}</el-button>
        <el-button type="primary" @click="confirm">{{
          $t('msg.universal.confirm')
        }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup>
import { defineProps, defineEmits, ref } from 'vue'
import { useStore } from 'vuex'
import { predefineColors } from '@/common/common.js'
import { generateNewStyle, writeStyleToHearTag } from '@/utils/theme.js'
const store = useStore()
defineProps({
  showDialogVariable: {
    type: Boolean,
    required: true
  }
})
const emits = defineEmits(['closeDialog'])
// 关闭模态框按钮
const handleClose = () => {
  // 触发自定义的事件 名为closeDialog
  emits('closeDialog')
}

// 取色器选中的颜色 主题色 其他组件也可能需要使用主题色 所以需要用到vuex 和 localstorage
const color = ref(store.getters.theme_color)

// 确认切换按钮
const confirm = async () => {
  // 1.保存主题色到vuex
  store.commit('theme/setMycolor', color.value)
  // 2.替换element 和 本地的样式让主题色生效
  /*
    1.获取所有element 的样式 不同版本的样式是不一样的
    2.将样式中的情景颜色替换成
    color 基本色 --> 生成一系列的和他们相近的情景色
    3.将替换完成的样式插入到header中,利用css的优先级让插入的样式生效
  */
  // 2-1 生成最终要替换的颜色
  const newStyle = await generateNewStyle(color.value)

  // 2-2将替换完的样式 插入到header中 ,利用css优先级让插入的样式生效
  writeStyleToHearTag(newStyle)

  console.log(newStyle)
  // 3.关闭模态框
  emits('closeDialog')
}
</script>
<style lang="scss" scoped>
.content {
  text-align: center;
  .title {
    margin-bottom: 12px;
  }
}
</style>
