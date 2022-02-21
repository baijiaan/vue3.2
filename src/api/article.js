import axios from '@/utils/request.js'
// 获取所有的文章列表
export const getArticleList = (data) => {
  return axios.request({
    url: '/article/list',
    method: 'GET',
    params: data
  })
}
// 拖拽修改文章排名

export const updateArticleRanking = (data) => {
  return axios.request({
    url: '/article/sort',
    method: 'POST',
    data
  })
}

// 删除文章的

export const removeArticle = (id) => {
  return axios.request({
    url: '/article/delete/' + id,
    method: 'GET'
  })
}

// 获取文章详情

export const ArticleDerail = (id) => {
  return axios.request({
    url: '/article/' + id,
    method: 'GET'
  })
}

// 创建文章
export const Submitarticle = (data) => {
  return axios.request({
    url: '/article/create',
    method: 'POST',
    data
  })
}

// 编辑文章

export const editArticle = (data) => {
  return axios.request({
    url: '/article/edit',
    method: 'POST',
    data
  })
}
