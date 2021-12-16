<template>
  <div class="user-info-container">
    <!-- 打印的card -->
    <el-card class="print-box">
      <el-button type="primary" v-print="printObj">{{
        $t('msg.userInfo.print')
      }}</el-button>
    </el-card>
    <!-- 用户详情 -->
    <el-card>
      <div class="user-info-box" id="user-print-box">
        <!-- 标题 -->
        <h2 class="title">{{ $t('msg.userInfo.title') }}</h2>
        <!-- 头部渲染 -->
        <div class="header">
          <!-- 头部表格数据 -->

          <el-descriptions :column="2" border empty-text="暂无数据">
            <el-descriptions-item :label="$t('msg.userInfo.name')">{{
              userData.username
            }}</el-descriptions-item>
            <el-descriptions-item :label="$t('msg.userInfo.sex')">
              {{ userData.gender || '暂无数据' }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('msg.userInfo.nation')">{{
              userData.nationality
            }}</el-descriptions-item>
            <el-descriptions-item :label="$t('msg.userInfo.mobile')">{{
              userData.mobile
            }}</el-descriptions-item>
            <el-descriptions-item :label="$t('msg.userInfo.province')">{{
              userData.province
            }}</el-descriptions-item>
            <el-descriptions-item :label="$t('msg.userInfo.date')">{{
              $filters.dateFilter(userData.openTime)
            }}</el-descriptions-item>
            <el-descriptions-item :label="$t('msg.userInfo.remark')">
              <el-tag
                v-for="(tag, index) in userData.remark"
                size="mini"
                :key="index"
              >
                {{ tag }}
              </el-tag>
            </el-descriptions-item>
          </el-descriptions>
          <!-- 用户头像 -->
          <el-image
            :src="userData.avatar"
            class="avatar"
            :preview-src-list="[userData.avatar]"
          ></el-image>
        </div>
        <!-- 主体 -->
        <div class="body">
          <el-descriptions :column="1" border>
            <el-descriptions-item :label="$t('msg.userInfo.experience')">
              <ul>
                <li v-for="(item, index) in userData.experience" :key="index">
                  <span
                    >{{ $filters.dateFilter(item.startTime, 'YYYY-MM') }}
                    --
                    {{ $filters.dateFilter(item.endTime, 'YYYY-MM') }}
                  </span>
                  <span>{{ item.title }}</span>
                  <span>{{ item.desc }}</span>
                </li>
              </ul>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('msg.userInfo.major')"
              ><span class="font">{{
                userData.major
              }}</span></el-descriptions-item
            >
            <el-descriptions-item :label="$t('msg.userInfo.glory')"
              ><span class="font">{{
                userData.glory
              }}</span></el-descriptions-item
            >
          </el-descriptions>
        </div>
        <!-- 结尾 -->
        <div class="foot">{{ $t('msg.userInfo.foot') }}</div>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { defineProps, ref, watch } from 'vue'
import { userDetailById } from '@/api/user-manage.js'

// 接收路由参数
const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

// console.log(props.id)
const userData = ref([])
const getUserDetail = async () => {
  const data = await userDetailById(props.id)
  console.log(data, '123123')
  userData.value = data
}
getUserDetail()

// 配置打印的参数
const printObj = {
  id: 'user-print-box', // 指定打印的区域
  popTitle: 'element andim' // 标题
}
// 监听参数变化,重新请求接口
watch(
  () => {
    return props.id
  },
  () => {
    getUserDetail()
  }
)
</script>

<style lang="scss" scoped>
.user-info-container {
  .print-box {
    text-align: right;
    margin-bottom: 20px;
  }
}
.user-info-box {
  width: 1024px;
  margin: 0 auto;
  .title {
    text-align: center;
    margin-bottom: 18px;
    font-size: 20px;
  }
  .header {
    display: flex;
    :deep(.el-descriptions) {
      flex: 1;
    }
    .avatar {
      width: 190px;
      box-sizing: border-box;
      padding: 20px 30px;
      border: 1px solid #ccc;
      border-left: none;
    }
    .remark {
      margin-right: 12px;
    }
  }
  .body {
    .font {
      font-size: 12px;
    }
    ul {
      list-style: none;
      li span {
        margin-right: 60px;
        font-size: 12px;
      }
    }
  }
  .foot {
    margin-top: 40px;
    text-align: right;
  }
}
</style>
