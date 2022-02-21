import { getAllPermissions } from '@/api/permission.js'
import {
  getAllRole,
  getPermissionByRoleId,
  updataPermissionByRoleId
} from '@/api/role.js'
import { getItem, setItem } from '@/utils/storage.js'
import { ROLE, PERMISSION, PERMISSION_ } from '@/common/common.js'
const state = {
  roles: getItem(ROLE) || [],
  Permissions: getItem(PERMISSION) || [],
  premissions_: getItem(PERMISSION_) || [],
  arrId: [] // 修改权限的id
}
/* eslint-disable */
// 将权限的id 转换为title 用于在角色列表下循环出当前角色所对应的信息
const permissionIdToTitle = (id_arr, per_arr) => {
  // 接收当前角色所拥有的权限 注意:现在的权限并不是值 而是一个字符串id数组
  // id_arr:[1,1-1,1-2,1-3]等等等 per_arr : 所有的权限信息
  const res = [] // 定义一个空数组 用于存储数据平级化的处理
  id_arr.forEach((id) => {
    // 循环出每一个权限id
    per_arr.forEach((per) => {
      // 将所有的权限信息循环出来
      if (per.id === id) {
        // 通过权限id字符串 和 所有的权限信息父级id做对比  如果相等就给res添加一个对象 , 因为要处理数据平视化 所以不需要顾虑子集数据
        res.push({ _id: per._id, id: id, title: per.permissionName })
      }
      if (per.children.length > 0) {
        // 判断所有的权限信息是否有子集 如果有执行下去 没有跳过
        per.children.forEach((c_per) => {
          // 循环所有的权限信息的子集数据
          if (c_per.id === id) {
            // 如果子集数据的id 和 所有有的权限id 匹配 那就继续添加进res 数组
            res.push({
              _id: c_per._id,
              id: c_per.id,
              title: c_per.permissionName
            })
          }
        })
      }
    })
  })
  // console.log(res, 'vuevuex')
  return res
}
/* eslint-enable */
const mutations = {
  initRoles: (state, roles) => {
    state.roles = roles // 异步发送的数据 roles 就是所有的角色列表数据
    setItem(ROLE, roles)
  },
  initPermissions: (state, permissions) => {
    state.Permissions = permissions // 所有的权限信息
    /* eslint-disable */

    //  这个循环的作用是在角色列表下渲染有的权限以及没有的权限
    const tem_arr = []
    // 循环所有的权限信息
    permissions.forEach((item) => {
      // 将所有的权限信息添加给临时的数据ten_arr 因为还是要做数据平视化
      tem_arr.push({ id: item.id, title: item.permissionName })
      // 判断当前的权限信息每一级是否有子集 如果有则执行
      if (item.children && item.children.length > 0) {
        // 循环子集拿到所有的子集对象
        item.children.forEach((item) => {
          // 将所拿到的子集数据设置自己想要拿到的数据 多余的不要 并且单独取出来添加到tem_arr临时数据种 和父级保持同级
          tem_arr.push({ id: item.id, title: item.permissionName })
        })
      }
    })
    state.premissions_ = tem_arr

    /* eslint-enable */
    setItem(PERMISSION, permissions)
  },
  updatePermissionToRole: (state, { roleId, permissionArray }) => {
    state.roles.forEach((role) => {
      if (role.id === roleId) {
        // 让数据中的id 和我传入的id做对比 如果相同在执行
        // 如果判断是true 的话 就给当前的这条数据 加上一个children 命名就为permissions
        //  因为在角色列表点击的话需要tag循环出所对应的权限 所以添加在permissions 的数据 需要做一些转换 将数据转换成同级的存在 并且添加一个title 并赋值为需要给el-tag标签做循环的数据 就是item.title
        role.permissions = permissionIdToTitle(
          permissionArray, // permissionArray 是当前用户所对应的权限id
          state.Permissions
        )
      }
    })
  },
  editPermission: (state, editPermissions) => {
    // state.editPermissions = editPermissions

    // console.log(temArr)
    state.editPermissions = editPermissions
    setItem('edit', editPermissions)
  },
  unti: (state, permissions) => {
    state.arrId = permissions
  }
}
const actions = {
  // 初始化角色列表
  initRles: async ({ commit }, row) => {
    let RoleList = getItem(ROLE) // 从本地获取所有的角色列表数据
    // console.log(RoleList, 'sssss')
    if (Array.isArray(RoleList) && RoleList.length <= 0) {
      // 如果RoleList没有获取到数据 就是false 那取反就是true 就执行判断的语句 发送接口请求 获取所有的角色列表数据
      RoleList = await getAllRole()
      // return
    }
    console.log(RoleList, 'baonima')
    if (RoleList !== null) {
      RoleList.forEach(async (role) => {
        const res = await getPermissionByRoleId(role.id) // 通过调用接口传入id 获取执行的用户所对应的权限id 得到的值是字符串数据
        // 优化弹框的请求
        if (row) {
          if (role.id === row.id) {
            commit('editPermission', res)
          }
        }
        // commit('editPermission')
        // 将数据传给同步在 因为是异步不能直接传给state
        commit('updatePermissionToRole', {
          roleId: role.id, // 每一个数据的父级的id
          permissionArray: res // 每一个角色所拥有的权限id [1,2,2-1,2-1] 这样的数据
        })
      })
    }
    // 遍历每一个角色 所对应的权限
    // 通过循环将每一个角色所对应的id全出同步方法中去 每一次循环都传一次对应的数据

    commit('initRoles', RoleList) // 将原始的数据通过发给同步然后同步在处理保存在state的roles中
  },
  // 初始化权限列表
  initPermissions: async ({ commit }) => {
    let permissionList = getItem(PERMISSION)
    if (Array.isArray(permissionList) && permissionList.length <= 0) {
      permissionList = await getAllPermissions() // 和初始化列表一致的业务 不同的是获取到的是所有的权限列表数据
    }
    // console.log(permissionList, '权限列表')
    commit('initPermissions', permissionList) // 发送给同步做一些处理在通过同步操作保存在state 中
  },
  // 修改用户权限
  updataPermission: async ({ commit }, { roleId, permissions }) => {
    // const temArrId = [...permissions]
    // console.log(temArrId, 'CUE')
    commit('unti', permissions)
    await updataPermissionByRoleId({ roleId, permissions })
  },
  // 清除权限和角色的想关缓存
  clearRoleAmdPermission: ({ commit }) => {
    //
    commit('initRoles', [])
    commit('initPermissions', [])
  }
}

export default {
  namespaced: true, // 每一个子集模块都要添加这个属性,声明是子集模块
  state,
  mutations,
  actions
}
