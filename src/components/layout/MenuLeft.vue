<template>
  <div class="menu-left">
    <div class="top" @click="handleCollapseMenu">
      <render-icon v-if="!collapse" icon="icon-menu-fold"></render-icon>
      <render-icon v-else icon="icon-menu-unfold"></render-icon>
      <span v-if="!collapse">收起</span>
    </div>
    <a-menu
      v-model:open-keys="openRouter.openKeys"
      v-model:collapsed="collapse"
      class="a-menu"
      :style="{ width: menuLeftOpenWidth }"
      theme="light"
      :selected-keys="openRouter.selectedKeys"
      :default-selected-keys="openRouter.selectedKeys"
      :default-open-keys="openRouter.openKeys"
      :collapsed-width="shrinkWidth"
      :auto-open-selected="true"
      accordion
    >
      <el-scrollbar class="scrollbar">
        <submenu :menu-data="menuList" />
      </el-scrollbar>
    </a-menu>
  </div>
</template>

<script>
import Submenu from '@/components/layout/Submenu'
import { menuLeftOpenWidth, menuLeftShrinkWidth } from '@/config/menu'
import { useMenuStore } from '@/stores/menu'
import { useSettingStore } from '@/stores/setting'
import { computed, reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { ElScrollbar } from 'element-plus'
import 'element-plus/dist/index.css'
import RenderIcon from '@/utils/renderIcon'

export default {
  name: 'MenuLeft',
  components: { Submenu, ElScrollbar, RenderIcon },
  setup() {
    let router = useRouter()
    let menuStore = useMenuStore()
    let settingStore = useSettingStore()

    let shrinkWidth = parseInt(menuLeftShrinkWidth.replace(/px/g, ''))

    // 侧栏状态
    let collapse = ref(false)

    watch(
      () => menuStore.collapse,
      value => {
        collapse.value = value
      },
      {
        immediate: true
      }
    )

    let openRouter = reactive({
      selectedKeys: [],
      openKeys: []
    })
    // 监听用户的路由地址集合,分离出相应的地址数据
    watch(
      () => menuStore.userRoutes,
      value => {
        let oneMenuList = [] // 一级导航数据
        let menuData = [] // 侧栏数据

        value.forEach(item => {
          let tab = {
            title: item.name,
            key: item.path,
            path: item.path,
            header: item.showLeftMenu ? true : false // 是否隐藏侧边栏 默认不隐藏
          }

          oneMenuList.push(tab)

          // 侧栏数据
          let menu = {
            path: item.path,
            menuList: item.children
          }

          menuData.push(menu)
        })

        // 保存侧栏数据
        menuStore.setMenuList(menuData)
        // 保持顶栏数据
        menuStore.setTabList(oneMenuList)
      },
      {
        deep: true,
        immediate: true
      }
    )
    //
    watch(
      () => router.currentRoute.value.path,
      value => {
        // 获取/的次数
        let count = value.split('/')
        // 超过1次后说明为多级表单，设置默认打开的列表
        if (count.length - 1 > 1) {
          // 去除最后一个
          count.splice(count.length - 1, 1)
          openRouter.openKeys = [count.join('/')]
        } else {
          openRouter.openKeys = []
        }
        if (router.currentRoute.value.meta.selectPath) {
          let selectPath = count + '/' + router.currentRoute.value.meta.selectPath
          openRouter.selectedKeys = ['/' + selectPath.split(',')[1]]
        } else {
          openRouter.selectedKeys = [value]
        }
      },
      {
        deep: true,
        immediate: true
      }
    )

    // 侧栏主题
    let theme = computed(() => {
      console.log(settingStore.theme)
      return settingStore.theme
    })

    let menuList = computed(() => {
      return menuStore.currentLeftMenu || []
    })

    // 展开或收起按钮
    const handleCollapseMenu = () => {
      collapse.value = !collapse.value
      // 设置侧栏数据
      menuStore.setMenuCollapse(collapse.value)
    }

    return {
      collapse,
      openRouter,
      menuList,
      theme,
      menuLeftOpenWidth,
      shrinkWidth,
      handleCollapseMenu
    }
  }
}
</script>

<style lang="scss">
.menu-left {
  // 浅色主体
  .arco-menu-light {
    .arco-menu-inline-header.arco-menu-selected {
      color: #fff;
      background-color: rgba(22, 93, 255, 1);
      box-shadow: 0 2px 6px 0 rgba(22, 93, 255, 0.22);
      border-radius: 4px;

      .arco-menu-icon {
        .arco-icon {
          color: #fff !important;
        }
      }

      .arco-menu-inline-content {
        padding-left: 20px;
      }
    }

    .arco-menu-pop-header.arco-menu-selected,
    .arco-menu-item.arco-menu-selected {
      color: #fff;
      background-color: rgba(22, 93, 255, 1);
      box-shadow: 0 2px 6px 0 rgba(22, 93, 255, 0.22);
      border-radius: 4px;

      .arco-menu-icon {
        .arco-icon {
          color: rgba(255, 255, 255, 1) !important;
        }
      }
    }
  }
}
</style>

<style lang="scss" scoped>
.menu-left {
  position: fixed;
  height: calc(100vh - $top-bar-height);
  user-select: none;
  z-index: 1;
  top: $top-bar-height;
  left: 0;
  box-shadow: 5px 5px 8px 0 rgba(29, 35, 41, 0.05);
  transition: all 0.3s ease-in-out;
  background: #fff;

  .top {
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 12px;
    font-weight: 500;
    color: #999999;
    cursor: pointer;

    span {
      margin-left: 12px;
    }
  }

  .scrollbar {
    height: 100%;
  }

  .a-menu {
    height: 100%;
    border-radius: 0 !important;
    transition: width 0.3s ease-in-out;

    :deep(.arco-menu-inner) {
      padding: 0 12px;

      .arco-menu-item,
      .arco-menu-inline-header {
        font-size: 14px;
        margin-bottom: 14px;
        cursor: pointer;
        height: $menu-left-menu-item-height;
        line-height: $menu-left-menu-item-height;
        padding-left: 16px;
        font-weight: 500;

        .arco-menu-icon {
          margin-right: 16px;

          .arco-icon {
            font-size: 18px;
            color: rgba(196, 199, 208, 1);
          }
        }

        &:not(.arco-menu-has-icon) {
          .arco-menu-item-inner {
            // margin-left: 14px !important;
          }
        }
      }
    }

    :deep(.arco-menu-pop-header) {
      margin-bottom: 14px;
      :deep(.arco-menu-icon) {
        font-size: 16px;
        margin-right: 3px !important;
        text-align: center;
      }
    }
    :deep(.arco-menu-inline) {
      .arco-menu-selected {
        background-color: rgba(22, 93, 255, 1);
        .arco-icon {
          color: #fff;
        }
      }
    }
    :deep(.arco-menu-inline-content) {
      padding-left: 20px;
      .submenu {
        position: relative;
        &:before {
          content: '';
          position: absolute;
          top: 0;
          height: 100%;
          border-right: 1px solid rgba(196, 199, 208, 0.7);
        }

        .arco-menu-selected {
          background: rgba(245, 246, 252, 1);
          color: rgba(22, 93, 255, 1);
          box-shadow: none;
        }

        .arco-menu-item {
          margin-left: 8px;
        }
      }
    }
  }

  .arco-menu-collapsed {
    :deep(.arco-menu-pop-header) {
      height: 38px;
      line-height: 38px;
    }

    :deep(.arco-menu-icon) {
      font-size: 16px;
      margin-right: 3px !important;
      text-align: center;
    }

    :deep(.arco-menu-title) {
      display: none;
    }

    :deep(.arco-menu-pop-header) {
      padding-right: 12px;
      padding-left: 16px;
      justify-content: center;

      .arco-menu-icon {
        .arco-icon {
          color: rgba(196, 199, 208, 1);
        }
      }
    }

    :deep(.arco-menu-item.arco-menu-has-icon) {
      justify-content: center;
    }
  }
}
</style>
