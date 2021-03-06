<template>
  <div class="user-manage-container">
    <!-- excel按钮 -->
    <el-card class="header">
      <el-button
        type="primary"
        @click="onImportExcel"
        v-showPermission="'importUser'"
        >{{ $t('msg.excel.importExcel') }}</el-button
      >
      <el-button type="success" @click="onExportExcel">
        {{ $t('msg.excel.exportExcel') }}
      </el-button>
    </el-card>
    <el-card class="primary">
      <!-- table -->
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        v-loading="loading"
        element-loading-text="Loading..."
      >
        <el-table-column
          align="center"
          label="#"
          type="index"
        ></el-table-column>
        <el-table-column
          align="center"
          :label="$t('msg.excel.name')"
          prop="username"
        ></el-table-column>
        <el-table-column
          :label="$t('msg.excel.mobile')"
          prop="mobile"
          align="center"
        ></el-table-column>
        <el-table-column :label="$t('msg.excel.avatar')" align="center">
          <template v-slot="{ row }">
            <el-image
              :src="row.avatar"
              class="avatar"
              :preview-src-list="[row.avatar]"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column :label="$t('msg.excel.role')" align="center">
          <template #default="{ row }">
            <div v-if="row.role && row.role.length > 0">
              <el-tag v-for="tag in row.role" :key="tag.id" size="mini">{{
                tag.title
              }}</el-tag>
            </div>
            <div v-else>
              <el-tag size="mini">{{ $t('msg.excel.defaultRole') }}</el-tag>
            </div>
          </template>
          <!-- #default是v-solt的简写 -->
        </el-table-column>
        <el-table-column align="center" :label="$t('msg.excel.openTime')">
          <template #default="{ row }">
            {{ $filters.dateFilter(row.openTime) }}
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('msg.excel.action')"
          width="300px"
          align="center"
        >
          <template #default="{ row }">
            <el-button
              size="mini"
              type="success"
              @click="showUserDetail(row)"
              >{{ $t('msg.excel.show') }}</el-button
            >

            <el-button
              size="mini"
              v-showPermission="'distributePermission'"
              type="primary"
              @click="addClick1(row)"
              >{{ $t('msg.excel.showRole') }}</el-button
            >
            <el-button
              size="mini"
              type="warning"
              v-showPermission="'removeUser'"
              @click="removeData(row)"
              >{{ $t('msg.excel.remove') }}</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        class="pagination"
        @size-change="sizeChange"
        @current-change="currentChange"
        :currentpage="page"
        :page-sizes="[5, 10, 20, 50]"
        :page-size="size"
        layout="total,sizes,prev,pager,next,jumper"
        :total="total"
      ></el-pagination>
    </el-card>

    <!-- 模态框导出业务 -->
    <export-excel
      :dialogShow="dialogShow"
      @closeDialog="close"
      :dataFormate="dataFormate"
      :data="dataFormate(exportData)"
      :header="Object.keys(USER_RELATION)"
      :filename="filename"
      message="下载成功"
    >
      <!-- 选择当前页下载或者是全部下载 -->
      <el-select
        v-model="exportType"
        placeholder="Select"
        class="sel"
        @change="changeExportType"
      >
        <el-option :key="1" label="当前页" :value="1"> </el-option>
        <el-option :key="2" label="全部数据" :value="2"> </el-option>
      </el-select>
    </export-excel>
    <!-- 角色 模态框 -->
    <add-click
      :dialogVisible1="dialogVisible1"
      @closeDialog1="closeDialog1"
      :dataOne="dataOne"
      :apr="apr"
      :getManageUser="getManageUser"
    >
      <el-checkbox-group v-model="checkList" @change="ff">
        <el-checkbox
          v-for="item in res1"
          :label="item.title"
          :key="item.id"
          :value="item"
        />
      </el-checkbox-group>
    </add-click>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import ExportExcel from '@/components/ExportExcel/index.vue'
import { getUser, getAllUser, deleteUserById } from '@/api/user-manage.js'
import { USER_RELATION, ROLE } from '@/common/common.js'
import { watchLang } from '@/utils/i18n.js'
import dateFormate from '@/filters/dataFilter.js'
import { useI18n } from 'vue-i18n'
import { ElMessageBox, ElMessage } from 'element-plus'
import { deleteItem } from '@/utils/storage'

import { getAllRole } from '@/api/role.js'
// 角色
import addClick from './addClick/index.vue'
import { addremovetable } from '@/api/permission.js'
import { useStore } from 'vuex'
// 加载动画
const loading = ref(true)
const store = useStore()
const i18n = useI18n()
const router = useRouter()
// 默认的文件名
const filename = ref(i18n.t('msg.excel.defaultName'))
// 跳转页面 导入页面
const onImportExcel = () => {
  router.push({ path: '/user/import' })
}
const dialogShow = ref(false)
// 导出页面
const onExportExcel = () => {
  changeExportType(1)
  dialogShow.value = true
}
// 监听关闭模态框
const close = () => {
  dialogShow.value = false
  exportType.value = 1
}
// 表格数据
const tableData = ref([])

// 分页相关
// 控制一页显示多少条数据
const size = ref(5)
// 页数跳转
const page = ref(1)
const total = ref(10)
// 改变页数大小
const sizeChange = (currentSize) => {
  size.value = currentSize
  getManageUser()
}
// 改变当前页码
const currentChange = (currentPage) => {
  page.value = currentPage
  getManageUser()
}
// 获取用户数据
const getManageUser = async () => {
  await getUser({
    page: page.value,
    size: size.value
  }).then((res) => {
    tableData.value = exportData.value = res.list
    total.value = res.total
    // 关闭动画
    loading.value = false
  })
}
getManageUser()

const exportType = ref(1)
const exportData = ref([])

const changeExportType = async (value) => {
  if (value === 1) {
    // genju select下拉框选择当前是下载当前页还是全部页
    // 下载当前页数
    exportData.value = tableData.value
    filename.value = `${i18n.t('msg.excel.defaultName')}(${page.value})`
  } else {
    // 下载所有数据
    filename.value = `${i18n.t('msg.excel.defaultName')}`
    const { list } = await getAllUser()
    exportData.value = list
  }
}

// 转换数据格式
const dataFormate = (data) => {
  return data.map((item) => {
    return Object.keys(USER_RELATION).map((key) => {
      if (USER_RELATION[key] === 'role') {
        // 处理用户角色
        const roles = item[USER_RELATION[key]]
        if (roles.length > 0) {
          return JSON.stringify(roles.map((item) => item.title))
        } else {
          return '[]'
        }
      } else if (USER_RELATION[key] === 'openTime') {
        // 处理时间
        return dateFormate(item[USER_RELATION[key]])
      } else {
        return item[USER_RELATION[key]]
      }
    })
  })
}
// 删除数据
const removeData = (row) => {
  // console.log(row)
  ElMessageBox.confirm(
    `${i18n.t('msg.excel.dialogTitle1')} :${row.username} ${i18n.t(
      'msg.excel.dialogTitle2'
    )}`,
    i18n.t('msg.excel.remove'),
    {
      confirmButtonText: i18n.t('msg.excel.remove'),
      cancelButtonText: i18n.t('msg.excel.close'),
      type: 'warning'
    }
  )
    .then(async () => {
      await deleteUserById(row._id).then(() => {
        ElMessage({
          type: 'success',
          message: '删除成功'
        })
        getManageUser()
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '删除失败'
      })
    })
}

// 跳转用户详情
const showUserDetail = (row) => {
  router.push({ path: '/user/info/' + row._id })
}

// 多选框
// 更改角色
const dialogVisible1 = ref(false)
// 点击角色触发模态框选中的模态框内的checkbox的指定数据
const checkList = ref([])
// 整行数据
const dataOne = ref([])
// 数剧
const res1 = ref(store.state.roleAndPermission.roles)
const addClick1 = async (row) => {
  // 在下次点击之前清空之前点击的值
  checkList.value = []
  dialogVisible1.value = true
  dataOne.value = row
  const res = await addremovetable(row._id)
  res.role.forEach((item) => {
    checkList.value.push(item.title)
  })
  // 因为每次退出都会清空vuex 所以如果清空的话就发送请求重新调用接口
  if (Array.isArray(res1.value) && res1.value.length <= 0) {
    // 调用请求接口的方法
    getAllRoles()
  }
  ff()
}
const getAllRoles = async () => {
  const res = await getAllRole()
  res1.value = res
  console.log(res)
}
// 传给子组件的值
const apr = ref([])

const ff = async () => {
  // console.log(res)
  // 利用map 返回新数组的方法 获取到当前点击和所有的角色所匹配的身份
  // 并保存在新数组中
  // 之前写的复杂的方法太过于繁琐 所以优化成这种的
  const result = checkList.value.map((item) => {
    return res1.value.find((key) => key.title === item)
  })
  apr.value = result
}

const closeDialog1 = () => {
  dialogVisible1.value = false
}

// 监听语言变化
watchLang(
  (lang) => {
    filename.value = i18n.t('msg.excel.defaultName')
  },
  () => {
    getManageUser()
  },
  () => {
    // 当语言发生改变 重新调用接口
    getAllRoles()
  }
)
watch(
  () => {
    return store.getters.language
  },
  () => {
    deleteItem(ROLE)
    store.dispatch('roleAndPermission/initRles')
  }
)
</script>

<style lang="scss" scoped>
.header {
  text-align: center;
  margin-bottom: 22px;
}
.pagination {
  text-align: center;
  margin-top: 20px;
}
.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
}

.sel {
  margin-top: 20px;
  width: 100%;
}
</style>
