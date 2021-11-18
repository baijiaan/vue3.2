<template>
  <div>
    <div class="login-container" :style="backgroundimg">
      <el-form
        ref="loginRef"
        class="login-form"
        :model="loginFrom"
        :rules="loginRules"
      >
        <div class="title-container">
          <h3 class="title">用户登录</h3>

          <el-form-item prop="username">
            <span class="svg-container">
              <svg-icon iconName1="user" />
            </span>
            <el-input
              name="username"
              placeholder="user.name"
              type="text"
              v-model="loginFrom.username"
            ></el-input>
          </el-form-item>

          <el-form-item prop="password">
            <span class="svg-container">
              <svg-icon iconName1="password" />
            </span>
            <el-input
              placeholder="password"
              name="password"
              :type="flag ? 'password' : 'text'"
              v-model.number="loginFrom.password"
            ></el-input>
            <span class="svg-container" @click="toggleIcon()">
              <svg-icon :iconName1="flag ? 'f' : 't'" />
            </span>
          </el-form-item>

          <el-button type="primary" style="width: 100%" @click="handleLogin"
            >登录{{ store.state.user.token }}</el-button
          >
        </div>
      </el-form>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive } from 'vue'
import { useStore } from 'vuex'
// 存放的点击事件方法
import { passwordValidator } from './rules.js'

// 引入路由
import { useRouter } from 'vue-router'
// 初始化input的内容
const loginFrom = ref({
  username: 'super-admin',
  password: '123456'
})

//  眼睛的闭合(密码的显示与隐藏)
const flag = ref(true)
const toggleIcon = () => {
  flag.value = !flag.value
}

const loginRules = ref({
  username: [
    {
      required: true, // 表示必填
      trigger: 'blur', // 表示失去焦点
      message: '账号必须填写' // 提示消息
    }
  ],
  password: [
    {
      // required: true, 表示必填
      // message: '密码必须填写', // 提示消息
      trigger: 'blur', // 表示失去焦点
      validator: passwordValidator
    }
  ]
})

const store = useStore()
// 给整个表单设置ref 从而达到获取表单的目的
/*
  知识点:
   引用dom 
*/
const router = useRouter()
const loginRef = ref(null)
// 点击登录对表单进行判断
const handleLogin = () => {
  // 点击登录对表单在进行一次检查是否合法
  // console.log(loginRef.value, '')
  loginRef.value.validate((validate) => {
    if (!validate) {
      return // 有值没有通过验证则返回
    }
    // 验证通过执行登录逻辑 调用定义的actions 因为是子模块需要在加一个路径才能调用的到

    store.dispatch('user/login', loginFrom.value)
    router.push({
      name: 'Index'
    })
  })
}

// 背景图片的设置
// import Svglcon from '../../icons/svglcon.vue'
const backgroundimg = ref({
  backgroundImage: 'url(' + require('../../assets/2.jpeg') + ')',
  width: ' 100%',
  height: '100vh',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center center',
  backgroundSize: '100% 100%'
})
</script>
<style scoped lang="scss">
$b1: black;
$dark_gray: #889aa4;
$light_gray: #eee;
$cursor: #fff;
@import '@/styles/variables.scss';

.login-container {
  min-height: 100%;
  width: 100%;
  height: 100vh;
  // background-color: $bg;
  overflow: hidden;
  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;

    .title-container {
      .title {
        text-align: center;
        font-size: 26px;
        color: $light_gray;
        margin: 0px auto 40px auto;
        font-weight: bold;
      }
    }
    :deep(.el-form-item) {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;

      .el-input {
        height: 47px;
        width: 85%;
        .el-input__inner {
          background: transparent; //透明
          border: 0px;
          border-radius: 0px;
          padding: 12px 5px 12px 15px;
          color: $cursor;
          height: 47px;
          cursor: help;
          caret-color: red; //修改光标颜色
        }
      }
    }

    .svg-containe {
      padding: 6px 5px 5px 15px;
      color: $dark_gray;
      vertical-align: middle;
      display: inline-block;
    }
  }
}
</style>
