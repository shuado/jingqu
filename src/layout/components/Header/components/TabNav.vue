<template>
  <div class="tabs">
    <a-tabs ref="tabsRef" class="tabs-list" :active-key="activeKey" @tab-click="tabsClick">
      <a-tab-pane v-for="item of tabList" :key="item.key">
        <template #title>{{ item.title }}</template>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useMenuStore } from '@/stores/modules/menu'
// 选中的一级导航
const activeKey = ref('')
const menuStore = useMenuStore()
const router = useRouter()
// 一级导航数据
const tabList = menuStore.topTabListGet

const tabsClick = key => {
  if (activeKey.value === key) return
  menuStore.setRefreshStatus(true)
  activeKey.value = key
}

// 监听一级导航key的改变
watch(
  () => activeKey.value,
  value => {
    const con = (tabList || []).find(item => value === item.key)
    if (!con) return
    // 判断是否不是刷新
    if (menuStore.isRefresh) {
      router.push({ path: con.path })
      menuStore.setRefreshStatus(false)
    }
    menuStore.setCurrentBar(con)
    menuStore.setMenuLeftDate()
  }
)

watch(
  () => router.currentRoute.value.path,
  value => {
    const tabKey = value.substring(0, value.indexOf('/', 1)).trim()
    if (tabKey && tabKey !== '' && activeKey.value !== tabKey) {
      activeKey.value = tabKey
    }
  },
  {
    immediate: true
  }
)
</script>
<style scoped lang="scss">
.tabs {
  flex: 1;
  width: 0;
  :deep(.arco-menu-inner) {
    overflow-y: hidden;
    padding: 0 20px;
    .arco-menu-overflow-wrap {
      height: 100%;
      display: flex;
      align-items: center;
    }
  }

  :deep(.arco-tabs-nav-button) {
    svg {
      font-size: 0.16rem;
      color: #fff;
    }
  }

  .arco-menu-light {
    background: none;
    height: 100%;

    .arco-menu-item {
      color: #fff;
      font-size: $menu-title-size;
      background: none;

      &:hover {
        background: none;
      }
    }
  }

  .arco-menu-horizontal .arco-menu-item:not(:first-child) {
    margin-left: 0.44rem;
    display: flex;
    align-items: center;
    height: 100%;
  }

  .arco-menu-light .arco-menu-item.arco-menu-selected {
    color: #fff;
    position: relative;

    :deep(.arco-menu-selected-label) {
      position: absolute;
      border-radius: 2px 2px 0 0;
      bottom: 0;
      height: 0.03rem;
      background-color: #fff;
    }
  }

  margin-left: 50px;

  .tabs-list {
    :deep(.arco-tabs-nav-tab) {
      height: $top-bar-height;
    }
    :deep(.arco-tabs-content) {
      display: none;
    }
    :deep(.arco-tabs-nav)::before {
      background-color: $theme-dark-color;
    }
    :deep(.arco-tabs-nav-ink) {
      height: 0.03rem;
      border-radius: 0.01rem 0.01rem 0 0;
      background-color: #ffffff;
    }
    :deep(.arco-tabs-nav-type-line) {
      .arco-tabs-tab {
        margin-left: 0.3rem;
        box-sizing: border-box;
        padding: 0;
        // line-height: $top-bar-height;

        &:first-child {
          margin-left: 0.2rem;
        }

        &:last-child {
          margin-right: 0.2rem;
        }

        &:hover {
          background-color: $theme-dark-color;
        }
      }

      .arco-tabs-tab-title {
        height: 100%;
        color: #fff;
        font-size: $menu-title-size;

        &:hover {
          &::before {
            background-color: $theme-dark-color;
          }
          background-color: $theme-dark-color;
        }
      }
    }
  }
}
</style>
