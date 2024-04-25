<template>
  <div class="submenu">
    <template v-for="(item, index) in menuData" :key="item.path + '~' + index">
      <!--多级导航-->
      <a-sub-menu v-if="item.children && item.children.length > 0" :key="item.pathAddress">
        <template #icon>
          <render-icon :icon="item.meta.icon" />
        </template>
        <template #title>{{ item.meta.title }}</template>
        <SubMenu :menu-data="item.children" />
      </a-sub-menu>
      <!--单个导航-->
      <template v-else>
        <a-menu-item :key="item.pathAddress" @click="goPage(item)">
          <template v-if="item.meta.icon" #icon>
            <render-icon :icon="item.meta.icon" />
          </template>
          {{ item.meta.title }}
        </a-menu-item>
      </template>
    </template>
  </div>
</template>

<script setup name="SubMenu">
import RenderIcon from '@/utils/renderIcon'
import { useRouter } from 'vue-router'
defineProps({
  // 侧栏导航数据
  menuData: {
    type: Array,
    default: () => []
  }
})

const router = useRouter()

// 地址跳转
const goPage = item => {
  let { pathAddress } = item
  // 获取当前路由地址
  let currentPath = router.currentRoute.value.path
  // 判断是否为超连接
  let isNewSite = pathAddress.indexOf('http') !== -1 ? true : false

  // 打开新窗口
  if (isNewSite) {
    window.open(pathAddress, '_blank')
    return
  }

  // 判断地址是否相同
  if (currentPath !== pathAddress) {
    router.push({ path: pathAddress })
  }
}
</script>

<style lang="scss" scoped>
.submenu {
  :deep(.arco-menu-indent-list) {
    display: none;
  }
}
</style>
