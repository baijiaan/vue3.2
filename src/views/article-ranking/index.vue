<template>
  <div class="">
    <el-card class="header">
      <div class="dynamic-box">
        <span class="title">{{ $t('msg.article.dynamicTitle') }}</span>
        <el-checkbox-group v-model="selectDynamicLabel" :min="2">
          <el-checkbox
            v-for="(item, index) in dynamicData"
            :key="index"
            :label="item.label"
            >{{ item.label }}</el-checkbox
          >
        </el-checkbox-group>
      </div>
    </el-card>
    <el-card>
      <theme-table :cbs="[]">
        <template #default="{ headerStyleObj }">
          <el-table
            v-loading="loading"
            element-loading-text="Loading..."
            border
            ref="tableRef"
            :data="tableData"
            :header-cell-style="headerStyleObj"
          >
            <el-table-column
              align="center"
              v-for="(item, index) in tableLabels"
              :key="index"
              :label="item.label"
              :prop="item.prop"
              :show-overflow-tooltip="true"
            >
              <template #default="{ row }" v-if="item.prop === 'publicDate'">
                {{ $filters.relative(row.publicDate) }}
              </template>
              <template #default="{ row }" v-else-if="item.prop === 'action'">
                <el-button
                  type="primary"
                  size="mini"
                  @click="showArticle(row)"
                  >{{ $t('msg.article.show') }}</el-button
                >
                <el-button
                  type="info"
                  @click="removeArticel(row)"
                  size="mini"
                  >{{ $t('msg.article.remove') }}</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </template>
      </theme-table>
      <!-- 分页功能 -->

      <el-pagination
        class="pagination"
        @size-change="sizeChange"
        @current-change="pageChange"
        :current-page="page"
        :page-size="size"
        :page-sizes="[5, 3, 10, 20, 50]"
        :total="totals"
        layout="total,sizes,prev,pager,next,jumper"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onActivated, onMounted } from 'vue'
import ThemeTable from '@/components/ThemeTable/index.vue'
import { getArticleList, removeArticle } from '@/api/article.js'
import { watchLang } from '@/utils/i18n.js'
import { ElMessageBox, ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

// ---------------动态列业务-----------------
import {
  selectDynamicLabel,
  dynamicData,
  tableLabels
} from './hooks/dynamic.js'

// ----------拖拽重新排名业务------------
// 引入绑定的dom元素
import { tableRef, initSortable } from './hooks/sortable.js'
// 之所以加这个钩子是因为setup代替beforecreate 和 created 如果不加在初始化时dom元素还没有加载好 会有问题
onMounted(() => {
  // tableData是当前页面的数据 因为更改排名需要操作服务器返回数据的排名数字
  // 在钩子函数中使用ref数据尽量直接拿响应式 而不直接拿value值 因为取不到 理论上可以拿到 但实际确是没有拿到
  initSortable(tableData, getArticle)
})
// -------------表格基本渲染-------------------
const tableData = ref([])
const router = useRouter()
// 加载动画
const loading = ref(true)
// 分页相关数据
const page = ref(1)
const size = ref(5)
const totals = ref(0)
// 改变当前页数
const pageChange = (pages) => {
  page.value = pages
  getArticle()
  // console.log(pages, '当前页数')
}
// 改变页大小
const sizeChange = (sizes) => {
  size.value = sizes
  getArticle()
  // console.log(sizes, '页数大小')
}

const getArticle = async () => {
  await getArticleList({
    page: page.value,
    size: size.value
  }).then((res) => {
    tableData.value = res.list
    totals.value = res.total
    // 关闭动画
    loading.value = false
  })
  // console.log(list, total)
  // tableData.value = list
  // totals.value = total
  // if(list)
}
getArticle()

const i18n = useI18n()

// 查看文章
const showArticle = (row) => {
  router.push({ path: '/article/' + row._id })
}
// 删除文章
const removeArticel = (row) => {
  ElMessageBox.confirm(
    `${i18n.t('msg.article.dialogTitle1')} ${row.title} ${i18n.t(
      'msg.article.dialogTitle2'
    )}`,
    '删除',
    {
      confirmButtonText: `${i18n.t('msg.excel.remove')}`,
      cancelButtonText: `${i18n.t('msg.excel.close')}`,
      type: 'warning'
    }
  )
    .then(async () => {
      await removeArticle(row._id).then((res) => {
        ElMessage({
          type: 'success',
          message: `${i18n.t('msg.article.removeSuccess')}`
        })
        getArticle()
      })
    })
    .catch(() => {})
}

// 进入keep-alive组件  执行onActivated这个钩子函数
// keepalice 就是具有缓存性
// 如果使用了keepAlive的话在每次进入页面时可能不会请求数据
// 但是如果配合onActivted这个钩子的话在每次进入页面都会执行一次请求
// 每次进入页面请求数据
onActivated(getArticle)

// 切换语言时重新请求数据
watchLang(getArticle)
</script>

<style lang="scss" scoped>
.header {
  margin-bottom: 20px;
  .dynamic-box {
    // display: flex;
    margin-left: 20px;
    align-items: center;
    .title {
      // margin-left: 20px;
      font-size: 14px;
      font-weight: bold;
    }
  }
}
.pagination {
  margin-top: 20px;
  text-align: center;
}
</style>
