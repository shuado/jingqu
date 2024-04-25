<template>
  <router-view />
</template>

<script setup>
import { flushToken } from '@/api/login'
import { GlobalStore } from '@/stores/modules/global'

const globalStore = GlobalStore()

// 定时器
let timer = null

// 刷新方法
const fulsh = () => {
  timer && clearInterval(timer)
  // 20分钟刷新token
  timer = setInterval(() => {
    flushToken().then(res => {
      if (res.code < 0) return
      globalStore.setToken(res.data.token)
      globalStore.setTime(res.data.expirationTime)
    })
  }, 1000 * 60 * 20)
}

watch(
  () => globalStore.isLogin,
  val => {
    if (val) return fulsh()
    clearInterval(timer)
    timer = null
  }
)

onMounted(() => {
  window.addEventListener('load', () => {
    if (globalStore.isLogin) fulsh()
  })
})

onBeforeUnmount(() => {
  window.removeEventListener('load', () => {
    if (globalStore.isLogin) fulsh()
  })
  clearInterval(timer)
  timer = null
})
</script>

<style>
@import '@/assets/styles/arco.scss';

body {
  position: relative;
  color: #333;
  height: 100vh;
}
/*禁止浏览器对账户和密码框进行样式劫持*/
input:-webkit-autofill,
textarea:-webkit-autofill,
select:-webkit-autofill {
  color: #666 !important;
  -webkit-text-fill-color: #666 !important;
  background-image: none;
  -webkit-box-shadow: 0 0 0 1000px transparent inset !important;
  background-color: transparent;
  transition: background-color 50000s ease-in-out 0s;
}
</style>
