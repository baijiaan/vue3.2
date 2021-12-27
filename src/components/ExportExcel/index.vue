<template>
  <el-dialog
    :title="$t('msg.excel.title')"
    :model-value="dialogShow"
    @close="close"
    width="30%"
  >
    <el-input
      :model-value="filename"
      :placeholder="$t('msg.excel.placeholder')"
    ></el-input>
    <!-- 插槽显示下载当前页还是全部页 -->
    <slot></slot>
    <!-- // #footer插槽 代表在布局的尾部 -->
    <template #footer>
      <el-button @click="close">{{ $t('msg.excel.close') }}</el-button>
      <el-button type="primary" @click="exportExcel">{{
        $t('msg.excel.confirm')
      }}</el-button>
    </template>
  </el-dialog>
</template>
<script setup>
import { defineProps, defineEmits, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { exportJsonToExcel } from '@/utils/Export2Excel.js'

const props = defineProps({
  dialogShow: {
    type: Boolean,
    required: true
  },
  data: {
    type: Array,
    required: true
  },
  header: {
    type: Array,
    required: true
  },
  filename: {
    type: String,
    required: true
  },
  message: {
    type: String,
    default: '下载成功' // default 是默认值的意思
  }
})

const emit = defineEmits(['closeDialog'])
const close = () => {
  emit('closeDialog')
}

// 导出业务执行
const exportExcel = () => {
  console.log(props.data, '::::')
  // 1.文件名不选的话应该有默认值 filename 做国际化处理
  // 2.导出全部数据 || 导出当前页数
  // 3. 将服务器返回的用户数据 转换成excel 数据 --
  // 4.形成excel文件 并下载改文件
  exportJsonToExcel({
    header: props.header,
    data: props.data,
    filename: props.filename,
    merges: true, // 合并的单元格
    autoWidth: true, // 是否自动列宽
    bookType: 'xlsx' // 文件名的后缀
  }).then((res) => {
    ElMessage.success(props.message)
  })
  // 关闭模态框
  close()
  // 6.提示模态框
}
</script>
<style lang="scss" scoped></style>
