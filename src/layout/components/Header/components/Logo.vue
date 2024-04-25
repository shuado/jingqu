<!--
 * @Description:
 * @Date: 2023-08-22 21:03:26
-->
<template>
  <div class="logo-box">
    <div v-if="userConfig" class="logo-config">
      <img class="logo" :src="userConfig.logoFileURL" alt="" />
      <span class="org-name" :title="userConfig.title">{{ userConfig.title }}</span>
    </div>
    <!-- <img v-else class="logo-big" src="@/assets/img/logo/logo.svg" alt="logo" /> -->
    <div v-else class="logo-title">
      <img src="@/assets/img/logo/cockpit.png" alt="" />
      <span>峰林布依景区智慧管理平台</span>
    </div>
  </div>
</template>
<script setup>
import { GlobalStore } from '@/stores/modules/global'
import { useRouter } from 'vue-router'
import { computed } from 'vue'

const globalStore = GlobalStore()
const router = useRouter()

// 自定义图片
const userConfig = computed(() => {
  return globalStore.user.selectBySysType
})

// 地址跳转
const goPath = path => {
  router.push({ path })
}
</script>
<style scoped lang="scss">
.logo-box {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4rem;
  height: $top-bar-height;
  background-color: $theme-dark-color;
  transition: all 0.3s ease-in-out;
  // padding-left: 16px;
  // box-sizing: border-box;
  cursor: pointer;
  .logo-big {
    width: 100%;
    height: 100%;
    transition: opacity 1s ease-in-out;
  }

  .logo-config {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0.16rem;
    box-sizing: border-box;
    cursor: pointer;

    img {
      width: 0.3rem;
      min-width: 0.3rem;
      height: 0.3rem;
      margin-right: 0.1rem;
    }

    .org-name {
      flex: 1;
      width: 100%;
      font-size: 0.18rem;
      color: #fff;
      @include omit();
    }
  }
  .logo-title {
    font-size: 0.22rem;
    color: #fff;
    display: flex;
    align-items: center;
    img {
      width: 0.4rem;
      height: 0.4rem;
      margin-right: 0.1rem;
    }
  }
}
</style>
