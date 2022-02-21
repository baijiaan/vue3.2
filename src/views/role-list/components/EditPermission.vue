<template>
  <div>
    <el-dialog
      :title="$t('msg.role.assignPermissions')"
      :model-value="isShowDialog"
      @close="close"
    >
      <el-tree
        ref="tree"
        :props="defaultProps"
        show-checkbox="true"
        :data="PermissionList"
        node-key="id"
        :check-strictly="true"
      />
      <template #footer>
        <el-button type="info" @click="show">{{
          $t('msg.universal.cancel')
        }}</el-button>
        <el-button type="success" @click="confirm">{{
          $t('msg.universal.confirm')
        }}</el-button>
      </template>
    </el-dialog>
  </div>
</template>
<script setup>
import { defineProps, defineEmits, ref, nextTick } from 'vue'
import { getPermissionByRoleId } from '@/api/role.js'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'
import { Store, useStore } from 'vuex'
const store = useStore()
const i18n = useI18n()
const props = defineProps({
  isShowDialog: {
    type: Boolean,
    required: true
  },
  roleId: {
    type: String,
    required: true
  },
  id1: {
    type: Object,
    required: true
  }
})
// console.log(props.isShowDialog)
const emits = defineEmits(['close', 'checked'])
// 关闭模态
const close = () => {
  emits('close')
}

// 确认事件 点击确定通过把数据传给服务器完成更改权限信息
const confirm = async () => {
  // 修改该角色的权限
  const checkedArr = tree.value.getCheckedKeys()
  emits('checked', checkedArr)

  // 修改该角色的权限
  store.dispatch('roleAndPermission/updataPermission', {
    roleId: props.roleId,
    permissions: checkedArr
  })
  // tree.value.getCheckedKeys() 这个方法可以获取到选中的tree的checkbox
  // 实现更改权限不用重新刷新
  store.commit('roleAndPermission/updatePermissionToRole', {
    roleId: props.roleId,
    permissionArray: checkedArr
  })
  ElMessage.success(i18n.t('msg.role.updateRoleSuccess'))
  // emits('confirm')
  // 关闭dialog
  emits('close')
}
const show = () => {
  emits('close')
}
// 展示树形控件
const defaultProps = ref({
  label: 'permissionName', // 使用哪个属性名展示
  children: 'children' // 子节点的名字是什么
})

// 请求所有的权限列表数据
const PermissionList = ref([])
const tree = ref(null)
const getAllPermissions_ = async () => {
  // const res = await getAllPermissions()
  // PermissionList.value = res
  store.dispatch('roleAndPermission/initPermissions')
  PermissionList.value = store.state.roleAndPermission.Permissions
  // console.log(store.state.roleAndPermission.Permissions, '22222')
  // console.log(res, 'bjabjabaj')
}
getAllPermissions_()

// 请求该角色的默认权限
// 用于获取到从后端返回的数据,利用setCheckedKeys方法来使获取到的权限id所对应的checbox全部选中
const getPermissionByRoleId_ = async () => {
  const res = await getPermissionByRoleId(props.roleId)
  tree.value.setCheckedKeys(res) // element自带的的setCheckedKeys 方法 默认选中
}

getPermissionByRoleId_()
</script>
<style lang="scss" scoped></style>
