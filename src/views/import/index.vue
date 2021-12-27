<template>
  <div class="">
    <upload-excel
      :onSuccess="uploadExcelSuccess"
      :beforeUpload="beforeUpload"
    />
  </div>
</template>

<script setup>
import {} from 'vue'
import UploadExcel from '@/components/UploadExcel/index.vue'
import { addUserByExcel } from '@/api/user-manage.js'
import { USER_RELATION } from '@/common/common.js'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { formatDate } from '@/utils/xlsx.js'
const router = useRouter()
const i18n = useI18n()
const uploadExcelSuccess = async ({ headers, bodys }) => {
  // console.log(headers, '---')
  // console.log(bodys, 'bodys')
  const data = generateExcelData(bodys)
  // console.log(bodys, '22111122')
  // console.log(data, '啦啦啦啦啦啦')
  // 插入数据
  await addUserByExcel(data).then((res) => {
    ElMessage.success(data.length + i18n.t('msg.excel.importSuccess'))
  })
  // 跳转到用户列表
  router.push({ path: '/user/manage' })
}
const beforeUpload = () => {
  return { type: 'excel', doUpload: true }
}

// 格式化sexcel
const generateExcelData = (arr) => {
  // console.log(arr, 'arr')
  const arr_ = []
  arr.forEach((item) => {
    const obj = {}
    Object.keys(USER_RELATION).forEach((key) => {
      if (USER_RELATION[key] === 'openTime') {
        obj[USER_RELATION[key]] = formatDate[item[key]]
        console.log(formatDate[item[key]], '2222')
      } else {
        obj[USER_RELATION[key]] = item[key]
      }
    })
    arr_.push(obj)
  })
  console.log(arr_, '处理')
  return arr_
}

// const arr_ = []
//   arr.forEach((item) => {
//     const obj = {}
//     Object.keys(USER_RELATION).forEach((key) => {
//       if (USER_RELATION[key] === 'openTime') {
//         obj[USER_RELATION[key]] = formatDate(item[key])
//       } else {
//         obj[USER_RELATION[key]] = item[key]
//       }
//       console.log(key)
//     })
//     arr_.push(obj)
//   })

//   return arr_
</script>

<style lang="scss" scoped></style>
