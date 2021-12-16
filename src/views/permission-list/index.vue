<template>
  <div>
    <!--权限列表 -->
    <el-card class="toggle">
      <el-button type="success" @click="toggle">{{
        isShowChildren
          ? $t('msg.role.toggleTitle1')
          : $t('msg.role.toggleTitle2')
      }}</el-button>
    </el-card>

    <el-card>
      <el-table
        ref="table"
        :data="permissionData"
        style="width: 100%; margin-bottom: 20px"
        border
        row-key="id"
        max-height="400px"
        :default-expand-all="isShowChildren"
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
        :header-cell-style="{
          background: store.getters.cssVar['light-3'],
          color: '#eee',
          fontWeight: 900
        }"
      >
        <el-table-column
          prop="permissionName"
          :label="$t('msg.permission.name')"
          width="200"
        ></el-table-column>
        <el-table-column
          prop="permissionMark"
          :label="$t('msg.permission.mark')"
        ></el-table-column>
        <el-table-column
          highlight-current-row
          prop="permissionDesc"
          :label="$t('msg.permission.desc')"
        ></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const permissionData = ref([])
// await getAllPermissions()
const initPermission = async () => {
  store.dispatch('roleAndPermission/initPermissions').then((res) => {
    permissionData.value = store.state.roleAndPermission.Permissions
  })
}
initPermission()

// 全部展开和收起二级菜单
// 展开和关闭二级菜单
const table = ref(true)
const isShowChildren = ref(false)
const toggle = () => {
  isShowChildren.value = !isShowChildren.value
  permissionData.value.forEach((row) => {
    table.value.toggleRowExpansion(row, isShowChildren.value)
  })
}

// 修改二级菜单的背景色
const childrenBgColor = ref(store.getters.cssVar['light-6'])
// // 修改hover 状态的背景
const hoverBgColor = ref(store.getters.cssVar['light-3'])
watch(
  () => {
    return store.getters.cssVar
  },
  () => {
    childrenBgColor.value = store.getters.cssVar['light-6']
    hoverBgColor.value = store.getters.cssVar['light-3']
  }
)
// 如果语言切换了 重新请求接口
watch(
  () => {
    return store.getters.language
  },
  () => {
    initPermission()
  }
)
</script>

<style lang="scss" scoped>
:deep(.el-table__row--level-1 > td) {
  background-color: v-bind(childrenBgColor);
}
:deep(.el-table__body tr:hover > td) {
  background-color: v-bind(hoverBgColor) !important;
  color: #fff;
}
.toggle {
  text-align: right;
  margin-bottom: 20px;
}
</style>
