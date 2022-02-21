import axios from '@/utils/request.js'
// 获取所有的权限列表
export const getAllPermissions = () => {
  return axios.request({
    url: '/permission/list',
    method: 'GET'
  })
}

// 获取指定员工当前角色
export const addremovetable = (data) => {
  return axios.request({
    url: '/user-manage/role/' + data,
    method: 'GET'
  })
}
// 更改当前用户的角色
export const matchingrole = (userId, data) => {
  return axios.request({
    url: '/user-manage/update-role/' + userId,
    method: 'POST',
    data
  })
}
