<template>
  <div class="frame" :style="{ paddingLeft }">
    <!--顶部导航-->
    <LayoutHeader />
    <!-- <top-bar></top-bar> -->

    <!--侧栏导航栏-->
    <LeftMenu v-show="isShowMenu" />

    <el-scrollbar ref="scrollbarBoxRef" class="scrollbar-box" @scroll="containerScroll">
      <div class="container">
        <router-view v-slot="{ Component }" class="inside" style="position: relative">
          <keep-alive :include="menuStore.keepAliveName">
            <component :is="Component" :key="route.fullPath" />
          </keep-alive>
        </router-view>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
import mitt from '@/utils/eventbus'
import LayoutHeader from './components/Header'
import LeftMenu from './components/Menu'
import { menuLeftOpenWidth, menuLeftShrinkWidth } from '@/config/menu'
import { useMenuStore } from '@/stores/modules/menu'
import { computed, ref, watch } from 'vue'
import { ElScrollbar } from 'element-plus'
import 'element-plus/dist/index.css'
import { useRoute } from 'vue-router'

export default {
  name: 'Index',
  components: { LeftMenu, ElScrollbar, LayoutHeader },
  setup() {
    // 获取当前侧栏状态
    const menuStore = useMenuStore()
    const route = useRoute()

    const paddingLeft = computed(() => {
      if (!isShowMenu.value) {
        return '0px'
      }
      return menuStore.collapse ? menuLeftShrinkWidth : menuLeftOpenWidth
    })

    // 侧栏导航状态
    const isShowMenu = ref(true)

    watch(
      () => route.meta,
      value => {
        if (value.hiddenMenu) {
          isShowMenu.value = false
        } else {
          isShowMenu.value = true
        }
      },
      {
        deep: true,
        immediate: true
      }
    )

    const scrollbarBoxRef = ref(null)

    function containerScroll(e) {
      e.wrap = scrollbarBoxRef.value.wrap$
      mitt.emit('ContainerScroll', e)
    }

    return {
      route,
      isShowMenu,
      paddingLeft,
      scrollbarBoxRef,
      menuStore,
      containerScroll
    }
  }
}
</script>

<style lang="scss" scoped>
.frame {
  width: 100%;
  min-height: 100vh;
  overflow: hidden;
  box-sizing: border-box;
  transition: padding 0.3s ease-in-out;
  background: $default-background;
  padding-top: calc($top-bar-height);

  .scrollbar-box {
    width: 100%;
    margin: auto;
    overflow: hidden;
    max-height: calc(100vh - $top-bar-height);
    background: $default-background;
    // min-height: 720px;
    :deep(.el-scrollbar__wrap) {
      width: 100%;
      margin: auto;
      max-height: calc(100vh - $top-bar-height);
      background: $default-background;
    }

    :deep(.el-scrollbar__view) {
      height: inherit;
    }
  }

  .container {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 0.24rem;
    overflow-x: hidden;
    transition: padding 0.3s ease-in-out;
  }
}
</style>

<style lang="scss">
.inside {
  height: 100%;
  min-height: calc(100vh - $top-bar-height - 0.48rem) !important;
  box-sizing: border-box;
  transition: width 0.3s ease-in-out;
  position: relative;
}
</style>
