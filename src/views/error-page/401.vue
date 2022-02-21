<template>
  <div class="">
    <input type="text" v-focus />
    <div class="d" v-pos:top="num">xxx</div>
    <button @click="change">点击变值</button>
  </div>
</template>
<script>
import { ref } from 'vue'
export default {
  directives: {
    focus: {
      mounted(el) {
        // el 是绑定这个自定义指令的自身dom
        // 让这个指令实现自动聚焦
        el.focus()
      }
    },
    top: {
      mounted(el, binding) {
        console.log(binding.value)
        // binding自定义指令传的参数  参数就是v-top='200' 200就相当于参数
        // 因为binding这个参数是响应式的所以需要加value才可以
        el.style.top = binding.value + 'px'
      },
      updated(el, binding) {
        // 这个钩子是在参数发生改变后触发的钩子
        el.style.top = binding.value + 'px'
      }
    }
  },
  setup() {
    const num = ref(200)
    const change = () => {
      num.value = 400
    }
    return {
      num,
      change
    }
  }
}
</script>

<style lang="scss" scoped>
.d {
  position: absolute;
  // top: ;
  width: 100px;
  height: 100px;
  background-color: aqua;
}
</style>
