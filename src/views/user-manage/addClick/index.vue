<template>
  <div>
    <el-dialog
      :model-value="dialogVisible1"
      title="配置角色"
      width="50%"
      :before-close="handleClose"
      @close="close"
    >
      <slot></slot>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="close">{{ $t('msg.universal.cancel') }}</el-button>
          <el-button type="primary" @click="dialogVisible">{{
            $t('msg.universal.confirm')
          }}</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script setup>
import { defineProps, defineEmits } from 'vue'
import { matchingrole } from '@/api/permission.js'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'
const i18n = useI18n()
const props = defineProps({
  dialogVisible1: {
    type: Boolean,
    required: true
  },
  dataOne: {
    type: String,
    required: true
  },
  apr: {
    type: Array
  },
  getManageUser: {
    type: Function,
    required: true
  }
})
const emit = defineEmits(['closeDialog1'])
const close = () => {
  emit('closeDialog1')
}
// 确定事件
const dialogVisible = async () => {
  matchingrole(props.dataOne._id, { roles: props.apr }).then((res) => {
    ElMessage.success(i18n.t('msg.role.updateRoleSuccess'))
  })
  // 在更改完成后直接重新请求数据
  props.getManageUser()
  emit('closeDialog1')

  return false
}
</script>
V
<style lang="scss" scoped></style>
