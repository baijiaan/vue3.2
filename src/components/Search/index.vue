<template>
  <div class="header-search" :class="{ show: isShow }">
    <!-- 图标 -->
    <svg-icon
      iconName1="search"
      className="search-icon"
      @click.stop="toggleShow"
    />
    <!-- 下拉选项 -->
    <el-select
      v-model="search"
      placeholder="Select"
      class="header-search-select"
      ref="searchSelectRef"
      filterable
      remote
      default-first-option
      :remote-method="querySearch"
      @change="onSelectChange"
    >
      <el-option
        v-for="option in searchResult"
        :key="option.item.path"
        :label="option.item.title.join('>>')"
        :value="option.item"
      >
      </el-option>
    </el-select>
  </div>
</template>
<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { filterRouter, generateFuse } from '@/utils/router.js'
import Fuse from 'fuse.js'
import { watchLang } from '@/utils/i18n.js'
const router = useRouter()
const isShow = ref(false)
const searchSelectRef = ref(null)
// console.log(searchSelectRef.value)
const toggleShow = () => {
  if (isShow.value) {
    // 收起
    isShow.value = false
    search.value = ''
    searchResult.value = []
    // 缩起自动获取视角
    searchSelectRef.value.blur()
  } else {
    // 展开
    isShow.value = true
    search.value = ''
    searchResult.value = []

    // 展开自动获取焦点
    searchSelectRef.value.focus()
  }
}
// 用户输入检索的字符串
const search = ref('')

const searchResult = ref([])
// 检索方法  根据输入的值检索已经处理好的数据源 并将准备的数据源通过插件在页面进行模拟查询展示  借助一个插件 进行模糊匹配
// 点击input的时候将输入的值传入配置的fuse内进行匹配  将匹配到的值传给searchResult 在页面上进行遍历展示
const querySearch = (query) => {
  console.log(query)
  searchResult.value = fuse.search(query) // search是fuse.js的值
  // console.log(query)
}

// 选中option 触发的方法
// 点击下拉列表的时候触发
const onSelectChange = (value) => {
  console.log(value, '222222222222222222222222222-')
  // 点击清空value
  search.value = value.title.join('>')
  // 跳转
  router.push({ path: value.path })
}
// 准备数据源
let lists = computed(() => {
  // 去除重复的路由
  const filterRoutes = filterRouter(router.getRoutes())
  // 格式化路由 1.具备meta && meta.title 2.过滤掉动态路由
  // console.log(filterRoutes, '状态树')
  // console.log(generateFuse(filterRoutes), '状态树2')
  // console.log(router.getRoutes(), '初始路由')
  return generateFuse(filterRoutes)
})
// console.log(lists.value)
// 初始化 fuse.js  作用:模糊搜索的工具
let fuse
const initFuse = (list) => {
  fuse = new Fuse(list, {
    shouldSort: true, // 搜索的结果是否按照优先级排序
    minMatchCharLength: 2, // 最少输入两个值才开始查找   (根据输入多少字符进行模糊查询)比如 [asd adq pla] 如果你只输入一个a那么这个数组里的值都会出现 但如果你输入ad那么久只有前边两个出现
    keys: [
      {
        name: 'path', // 搜索的字段
        weight: 0.7 // 如果多条搜索方式命中同一条数据按照权重高的记录 (会按照数值大的先搜索)
      },
      {
        name: 'title',
        weight: 0.3
      }
    ]
  })
}
initFuse(lists.value) // 把准备好的数据源传进去
// console.log(fuse)

// 监听中英文问切换
watchLang((lang) => {
  lists = computed(() => {
    // 去除重复的路由
    const filterRoutes = filterRouter(router.getRoutes())
    // 格式化路由 1.具备meta && meta.title 2.过滤掉动态路由
    return generateFuse(filterRoutes)
  })
  initFuse(lists.value)
})

// 问题1 收起的时候 清空内容和下拉列表的数据
// 问题2 点击其他位置  搜索框收起来
const onClose = () => {
  isShow.value = false
  search.value = ''
  searchResult.value = []
}

watch(isShow, (val) => {
  if (val) {
    // console.log('2222222', val)
    document.body.addEventListener('click', onClose)
  } else {
    // 解除绑定事件
    document.body.removeEventListener('click', onClose)
  }
})
</script>
<style lang="scss" scoped>
.header-search {
  .search-icon {
    cursor: pointer;
    font-size: 18px;
    vertical-align: middle;
    fill: currentColor;
    color: #393755;
  }
  .header-search-select {
    font-size: 18px;
    transition: width 0.2s;
    width: 0;
    overflow: hidden;
    background: transparent; // 透明度
    border-radius: 0;
    display: inline-block;
    vertical-align: middle; // 将该元素放在父元素的中间

    :deep(.el-input__inner) {
      border-radius: 0;
      border: 0;
      box-shadow: none !important;
      border-bottom: 1px solid #d9d9d9;
      vertical-align: middle;
      padding-left: 0;
      padding-right: 0;
    }
  }
  &.show {
    .header-search-select {
      width: 210px;
      margin-left: 10px;
    }
  }
}
</style>
