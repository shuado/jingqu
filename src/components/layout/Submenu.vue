<template>
  <div class="submenu">
    <template v-for="(item, index) in menuList" :key="item.path + '~' + index">
      <!--多级导航-->
      <a-sub-menu v-if="isNotEmpty(item.children) && item.meta.show" :key="item.pathAddress">
        <template v-if="item.meta.icon" #icon>
          <i class="arco-icon" :class="item.meta.icon"></i>
          <render-icon :icon="item.meta.icon" />
        </template>
        <template #title>{{ item.name }}</template>
        <submenu :menu-data="item.children" />
      </a-sub-menu>
      <!--单个导航-->
      <a-menu-item v-else-if="isParentShow(item)" :key="item.pathAddress" @click="goPage(item)">
        <template v-if="item.meta.icon" #icon>
          <i class="arco-icon" :class="item.meta.icon"></i>
          <!--<render-icon :icon="item.meta.icon" />-->
        </template>
        {{ item.name }}
      </a-menu-item>
    </template>
  </div>
</template>

<script>
import { computed } from 'vue'
import RenderIcon from '@/utils/renderIcon'
import { useRouter } from 'vue-router'

export default {
  name: 'Submenu',
  components: { RenderIcon },
  props: {
    // 侧栏导航数据
    menuData: {
      type: Array,
      default: () => []
    }
  },
  setup(props) {
    let router = useRouter()
    let menuList = computed(() => {
      return props.menuData
    })

    // 判断是否存在多级路由
    const isNotEmpty = children => {
      return children && children.length > 0
    }

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

    // 是否显示
    const isParentShow = menuItem => {
      // 显示则直接返回
      if (menuItem.meta.show) return true

      let isParent = false
      // 循环获取
      for (let item of props.menuData) {
        if (menuItem.meta.selectPath) {
          if (menuItem.meta.selectPath === item.path) {
            isParent = true
          }
        }
      }

      if (!isParent) {
        menuItem.name = menuItem.meta.selectName
        menuItem.meta.show = true
        return true
      }

      return menuItem.meta.show
    }

    return {
      menuList,
      isParentShow,
      isNotEmpty,
      goPage
    }
  }
}
</script>

<style scoped></style>
