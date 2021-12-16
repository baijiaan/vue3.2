<template>
  <div class="">
    <theme-table :cbs="cbs">
      <template #default="{ headerStyleObj }">
        <el-table
          :data="tableData"
          border
          style="width: 100%"
          :header-cell-style="headerStyleObj"
          ref="table"
          row-key="id"
        >
          <!-- 展开行显示角色下边的权限 -->
          <el-table-column type="expand" label=">">
            <template #default="{ row }">
              <div class="tags">
                <el-tag
                  id="list"
                  type="success"
                  size="mini"
                  v-for="(item, index) in getAllPermissions_"
                  :key="item.id"
                  :closable="isbool(item, row)"
                  :class="isActive(item, row)"
                  @click.stop="fn(item, row)"
                  @close.stop="close1(item, row, index)"
                >
                  {{ item.title }}
                </el-tag>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('msg.role.index')"
            type="index"
            width="170"
          ></el-table-column>
          <el-table-column
            :label="$t('msg.role.name')"
            prop="title"
            width="200"
          ></el-table-column>
          <el-table-column
            :label="$t('msg.role.desc')"
            prop="describe"
          ></el-table-column>
          <el-table-column :label="$t('msg.role.action')">
            <template #default="{ row }">
              <el-badge
                v-if="row.permissions && row.permissions.length >= 0"
                :value="row.permissions.length"
                class="item"
                type="primary"
              >
                <el-button
                  type="primary"
                  size="mini"
                  @click="showeditPermission(row)"
                  >{{ $t('msg.role.assignPermissions') }}</el-button
                >
              </el-badge>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </theme-table>

    <!-- 角色修改权限的模态框 -->
    <!-- 加判断的作用是只有当isShowDialog为true时才渲染
    而它成为true的唯一办法就是点击事件
    -->
    <edit-permission
      v-if="isShowDialog"
      :isShowDialog="isShowDialog"
      @close="isShowDialog = false"
      :roleId="selectRoleId"
      @confirm="confirm"
      :id1="id1"
    ></edit-permission>

    <!-- 确定更改权限的模态框 -->
    <el-dialog
      v-model="dialogVisible"
      title="Tips"
      width="30%"
      :before-close="handleClose"
    >
      <span>是否要添加权限</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="dialogVisible1">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import ThemeTable from '@/components/ThemeTable/index.vue'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'
import EditPermission from './components/EditPermission.vue'
const store = useStore()

// 初始化角色列表
const tableData = ref([])
const getAllRoles = () => {
  // const RoleList = await getAllRole() // 得到的是所有的角色列表的数据
  // console.log(RoleList.value, 'HHHHH')
  //  获取所有的的 roles
  store.dispatch('roleAndPermission/initRles')

  // 获取所有的权限列表
  // 得到的是权限列表所有的数据
  store.dispatch('roleAndPermission/initPermissions').then((res) => {
    tableData.value = store.state.roleAndPermission.roles
  })
}
getAllRoles()
// :Array
// 语言切换
const cbs = [
  () => {
    // 清空本地存储
    store.dispatch('roleAndPermission/clearRoleAmdPermission')
  },
  getAllRoles
]
// 修改权限
const isShowDialog = ref(false)
const selectRoleId = ref('')
const id1 = ref({})
const showeditPermission = (row) => {
  isShowDialog.value = true
  selectRoleId.value = row.id
  id1.value = row
}

// 获取所有的权限
const getAllPermissions_ = computed(() => {
  return store.state.roleAndPermission.premissions_
})

// 该权限是否选中
const isActive = (item, row) => {
  const finda = row.permissions.findIndex((per) => {
    return item.id === per.id
  })
  if (finda === -1) {
    return ''
  } else {
    return 'no-active'
  }
}
// 点击已有的权限实现新增和删除
// 判断模态框
const dialogVisible = ref(false)
const fn = async (item1, row) => {
  const checkArr = [] // 当前的权限
  row.permissions.map((item) => {
    if (item.id !== item1.id) {
      checkArr.push(item.id)
      // dialogVisible.value = true
    }
  })
  checkArr.push(item1.id)

  const a = row.permissions.findIndex((item) => item.id === item1.id)
  if (a === -1) {
    ElMessage.success('添加成功')
    store.dispatch('roleAndPermission/updataPermission', {
      roleId: row.id,
      permissions: checkArr
    })
    store.commit('roleAndPermission/updatePermissionToRole', {
      roleId: row.id,
      permissionArray: checkArr
    })
  }
}
// 点击模态框的确定添加值
const dialogVisible1 = async () => {
  dialogVisible.value = false
}
// 判断关闭键是否存在
const isbool = (item, row) => {
  if (row !== {}) {
    const finda = row.permissions.findIndex((per) => {
      return item.id === per.id
    })
    if (finda === -1) {
      return false
    } else {
      return true
    }
  }
}
// 点击关闭发送请求取消权限
const close1 = (item1, row, index1) => {
  const checkArr = []
  // 当前的权限
  const arr = row.permissions.map((item) => {
    if (item.id !== item1.id) {
      checkArr.push(item.id)
    }
  })
  checkArr.push(item1.id)
  const ind = checkArr.findIndex((item) => item === item1.id)
  if (ind !== -1) {
    checkArr.splice(ind, 1)
  }
  store.dispatch('roleAndPermission/updataPermission', {
    roleId: row.id,
    permissions: checkArr
  })
  store.commit('roleAndPermission/updatePermissionToRole', {
    roleId: row.id,
    permissionArray: checkArr
  })
}

// 处理徽章已经tag标签改变时重新渲染
watch(
  () => {
    return store.state.roleAndPermission.roles
  },
  () => {
    tableData.value = store.state.roleAndPermission.roles
  },
  {
    immediate: true
  }
)
</script>

<style lang="scss" scoped>
.tags {
  text-align: center;
  width: 100%;
  span {
    margin: left 10px;
  }
  .no-active {
    background-color: rgb(0, 255, 106) !important;
    color: #fff;
    margin: left 10px;
  }
}
</style>
