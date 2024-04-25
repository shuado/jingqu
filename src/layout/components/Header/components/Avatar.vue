<template>
  <a-dropdown trigger="hover">
    <div class="avatar">
      <a-avatar :size="32">
        <img alt="avatar" :src="AvatarIcon" />
      </a-avatar>
      <div class="user-name">管理员</div>
    </div>
    <template #content>
      <!-- <a-doption @click="goPath('/user/info')">
        <template #icon>
          <render-icon icon="icon-user" />
        </template>
        个人中心
      </a-doption> -->
      <a-doption @click="outLogin">
        <template #icon>
          <render-icon icon="icon-export" />
        </template>
        退出登录
      </a-doption>
    </template>
  </a-dropdown>
</template>
<script setup>
import RenderIcon from '@/utils/renderIcon'
import { useRouter } from 'vue-router'
import { GlobalStore } from '@/stores/modules/global'
import AvatarIcon from '@/assets/img/logo/环保.png'

const router = useRouter()
const globalStore = GlobalStore()

// 地址跳转
// const goPath = (path) => {
//   router.push({ path });
// };

// 退出登录
const outLogin = () => {
  // 移除主题
  let el = document.getElementsByTagName('html')[0]
  el.removeAttribute('class')
  // 设置退出状态
  globalStore.clearUser()
  router.replace({ path: '/login' })
}
</script>
<style scoped lang="scss">
.avatar {
  flex: 1;
  // width: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-left: 12px;
  margin-right: 24px;
  color: #fff;

  .arco-avatar {
    line-height: 0;
  }

  &:hover {
    cursor: pointer;
  }

  .arco-avatar-circle {
    margin-right: 8px;
  }

  .user-name {
    flex: 1;
    display: inline-block;
    font-size: $menu-title-size;
    color: #fff;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
</style>
