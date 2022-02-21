<template>
  <div class="upload-excel-container">
    <!-- 文件上传 -->
    <div class="btn-upload">
      <el-button type="primary" @click="handleUpload">{{
        $t('msg.uploadExcel.upload')
      }}</el-button>

      <!-- 文件上传的隐藏域 -->
      <input
        ref="tagUploadInput"
        type="file"
        autocomplete="off"
        class="upload-excel-input"
        :accept="accept[type]"
        @change="handleChange"
      />
    </div>
    <!-- 拖拽上传 -->
    <div
      class="drop"
      @drop.prevent.stop="onDrop"
      @dragenter.prevent.stop="onDropEnter"
      @dragover.prevent.stop="onDropEnter"
    >
      <el-image :src="url" style="width: 100px; height: 100px"></el-image>
      {{ $t('msg.uploadExcel.drop') }}
    </div>
  </div>
</template>
<script setup>
import url from '@/assets/3.png'
import { ref, defineProps } from 'vue'
import { ElMessage } from 'element-plus'
import { isExcel, isJs, readFileAsExcel } from '@/utils/xlsx.js'
import { useI18n } from 'vue-i18n'
const i18n = useI18n()
const type = ref('')
const props = defineProps({
  beforeUpload: {
    type: Function,
    required: true
  },
  onSuccess: Function
})

const { type: fileType, doUpload } = props.beforeUpload()
if (fileType) {
  type.value = fileType
  // 读取文件
} else {
  ElMessage.error('必须设定对应的文件 ')
}
const accept = ref({ excel: '.xlsx,xls', js: '.js', txt: '.txt' })

const tagUploadInput = ref(null)
// 点击了文件上传按钮
const handleUpload = () => {
  // 触发input的点击事件
  tagUploadInput.value.click()
}

// 选择了文件触发的事件
const handleChange = (e) => {
  // 获取到文件
  const files = e.target.files
  const rawFile = files[0]
  console.log(rawFile, '222')
  if (!rawFile) {
    return false
  }
  // 上传文件
  upload(rawFile)
  // 使用插件解析excel文件的表格数据
  // props.onSuccess('解析完成的数据')
}

// 执行上传方法 如果存在 beforeUpload 并且返回的是true 才执行读取操作,如果没有beforeUpload 直接执行读取操作
const upload = (rawFile) => {
  if (doUpload) {
    readFile(rawFile)
  } else {
    ElMessage.error('取消文件读取操作')
  }
}

// 读取文件方法
const readFile = (rawFile) => {
  console.log('开始读取')
  // 1.创建读取对象
  const reader = new FileReader()
  // 2.读取完毕回调
  reader.onload = (event) => {
    // 2-1-1 获取读取完毕后的文件内容
    const data = event.target.result

    if (type.value === 'excel') {
      // 调用方法
      const result = readFileAsExcel(data)
      console.log(result, '白家安-->')
      // 2-2 解析完毕后 调用父组件的onSuccess()
      generateData(result)
    } else if (type.value === 'js') {
      // 解析其他类型文件 ...
      console.log('解析js文件')
    }
  }

  // 3.异步读取
  reader.readAsArrayBuffer(rawFile)
}

// 通知父组件解析完成
const generateData = (result) => {
  // 之所以加下边这个东西 是因为在路由使用了keepalive 如果不加 点击导入只能够执行一次点击导入 加了就可以解决这个问题
  tagUploadInput.value.value = null
  props.onSuccess(result)
}

// 拖拽上传文件业务
// 选中的文件在可以释放的目标上释放时触发
// 释放后会触发
const onDrop = (e) => {
  // 获取文件的内容
  const files = e.dataTransfer.files
  if (files.length <= 0) {
    ElMessage.error('必须拖拽一个有效的文件!')
    return false
  }
  const rawFile = files[0]
  console.log(rawFile, '22222')
  if (!checkFileType(rawFile)) {
    return false
  }

  upload(rawFile)
}

// 验证文件类型
const checkFileType = (rawFile) => {
  if (type.value === 'excel') {
    if (!isExcel(rawFile)) {
      ElMessage.error(
        rawFile.name + ':' + i18n.t('msg.excel.noExcelFile') + '!'
      )
      return false
    } else {
      return true
    }
  } else if (type.value === 'js') {
    if (!isJs(rawFile)) {
      ElMessage.error(rawFile.name + ':不是一个js文件!')
      return false
    } else {
      return true
    }
  }
}

// 将文件移动到可释放区域内触发
const onDropEnter = (e) => {
  // 在新位置生成源项的副本
  e.dataTransfer.dropEffect = 'copy' // 释放时触发onDrop事件
}
</script>
<style lang="scss" scoped>
.upload-excel-container {
  display: flex;
  justify-content: center;
  margin-top: 100px;
  .upload-excel-input {
    display: none;
    z-index: -1000;
  }
  .btn-upload .drop {
    border: 1px dashed #cccccc;
    width: 350px;
    height: 160px;
    text-align: center;
    line-height: 160px;
  }
  .btn-upload {
    width: 350px;
    border: 1px dashed #cccccc;
    line-height: 8;
    text-align: center;
  }
  .drop {
    width: 350px;
    text-align: center;
    // line-height: 60px;

    border: 1px dashed #cccccc;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #bbb;
    .el-image__inner {
      font-size: 60px;
      // display: inline-block;
      display: block;
      // text-align: center;
    }
  }
}
</style>
