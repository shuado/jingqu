<template>
  <div class="tap-bar">
    <div
      class="left-logo"
      :class="'theme-' + theme"
      :style="{
        width: menuWidth,
        minWidth: menuWidth
      }"
    >
      <img class="logo-big" src="@/assets/img/logo/logo.svg" alt="logo" />
    </div>

    <!--一级导航-->
    <div class="tabs">
      <a-menu v-model:selected-keys="activeKey.value" mode="horizontal" @menu-item-click="tabsClick">
        <a-menu-item v-for="item of tabList" :key="item.key">
          {{ item.title }}
        </a-menu-item>
      </a-menu>
    </div>

    <!--右侧头像等-->
    <div class="right-info">
      <!-- <div class="right-icon" @click="visibleNotice">
        <a-badge :count="9" class="notice-btn">
          <render-icon icon="icon-notification"></render-icon>
        </a-badge>
      </div> -->
      <!-- <a-dropdown trigger="hover">
        <div class="right-user">
          <a-avatar :size="24">
            <img
              alt="avatar"
              src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"
            />
          </a-avatar>
          <div class="user-name">{{ userName }}</div>
        </div>
        <template #content>
          <a-doption @click="outLogin">
            <template #icon>
              <render-icon icon="icon-export" />
            </template>
            退出登录
          </a-doption>
        </template>
      </a-dropdown> -->
    </div>

    <!--提示框-->
    <!--<notice v-show="isShowNotice" :show="isShowNotice" ref="noticeRef" />-->
  </div>
</template>

<script>
import { computed, watch, ref, onMounted, onBeforeUnmount, reactive } from 'vue'
import { menuLeftOpenWidth } from '@/config/menu'
// import RenderIcon from "@/utils/renderIcon";
import { useUserStore } from '@/stores/user'
import { useMenuStore } from '@/stores/menu'
import { useSettingStore } from '@/stores/setting'
import { useRouter } from 'vue-router'

export default {
  name: 'TopBar',
  emits: ['handleSettingsClick', 'tabsClick'],
  // components: { RenderIcon },
  setup(props, { emit }) {
    let menuStore = useMenuStore()
    let settingStore = useSettingStore()
    let userStore = useUserStore()
    let userName = ref(userStore.user.info.userName)
    let router = useRouter()

    // 侧栏是否伸缩
    let collapse = ref(false)
    // 侧栏宽度
    let menuWidth = computed(() => {
      // return collapse.value ? menuLeftShrinkWidth : menuLeftOpenWidth;
      return menuLeftOpenWidth
    })
    // 选中的一级导航
    let activeKey = reactive({
      value: []
    })
    // 一级导航数据
    const tabList = computed(() => {
      // 判断是否是页面刷新操作
      if (activeKey.value.length <= 0 && tabList.value.length > 0) {
        menuStore.setRefreshStatus(true)
        menuStore.setCurrentBar(tabList.value[0])
      }
      return menuStore.tabList
    })
    // 侧栏主题
    let theme = ref('')
    // 监听侧栏是否伸缩
    watch(
      () => menuStore.collapse,
      () => {
        collapse.value = menuStore.collapse
      },
      { immediate: true }
    )

    // 监听选中的导航栏
    watch(
      () => menuStore.currentBar,
      value => {
        if (!value.key) {
          return
        }
        if (activeKey.value.indexOf(value.key) < 0) {
          activeKey.value = [value.key]
          // 判断是否不是刷新
          if (menuStore.isRefresh) {
            router.push({ path: value.path })
            menuStore.setRefreshStatus(false)
          }
        }
        // 获取级导航数据
        menuStore.setMenuLeftDate()
      },
      {
        deep: true
      }
    )
    // 监听一级导航key的改变
    watch(
      () => activeKey.value,
      value => {
        let con = tabList.value.filter(item => {
          return value.indexOf(item.key) >= 0
        })[0]
        emit('tabsClick', con)
        if (con && con.path) {
          menuStore.setCurrentBar(con ? con : tabList.value[0])

          // 判断是否不是刷新
          if (menuStore.isRefresh) {
            router.push({ path: con.path })
            menuStore.setRefreshStatus(false)
          }
        }
      }
    )
    watch(
      () => router.currentRoute.value.path,
      value => {
        let tabKey = value.substring(0, value.indexOf('/', 1)).trim()
        if (tabKey && tabKey !== '' && activeKey.value.indexOf(tabKey) < 0) {
          activeKey.value = [tabKey]
        }
      },
      {
        immediate: true
      }
    )
    // 监听侧栏主题
    watch(
      () => settingStore.theme,
      () => {
        theme.value = settingStore.theme
      },
      {
        immediate: true
      }
    )
    // 选中的一级导航栏点击
    const tabsClick = () => {
      menuStore.setRefreshStatus(true)
    }

    // 是否显示弹框
    let isShowNotice = ref(false)
    // 弹框ref属性
    const noticeRef = ref(null)
    // 显示弹框
    const showNoticeFunc = show => {
      noticeRef.value.showNoticeFunc(show)
    }
    // 关闭通知弹框
    const bodyCloseNotice = e => {
      if (isShowNotice.value && e.target.className.indexOf('notice-btn') === -1) {
        isShowNotice.value = false
        showNoticeFunc(false)
      }
    }
    // 显示|隐藏通知弹框
    const visibleNotice = () => {
      if (!isShowNotice.value) {
        showNoticeFunc(true)
      } else {
        showNoticeFunc(false)
      }
      setTimeout(() => {
        isShowNotice.value = !isShowNotice.value
      }, 50)
    }

    // 设置抽屉
    const handleSettingsClick = () => {
      isShowNotice.value = false
      emit('handleSettingsClick')
    }

    // 退出登录
    const outLogin = () => {
      menuStore.setCurrentBar('')
      userStore.clearUser()
      sessionStorage.setItem('token', '')
      router.push({ path: '/login' })
    }

    // 地址跳转
    const goPath = path => {
      router.push({ path })
    }

    onMounted(() => {
      document.addEventListener('click', bodyCloseNotice)
    })
    onBeforeUnmount(() => {
      document.removeEventListener('click', bodyCloseNotice) // 销毁事件
    })

    return {
      activeKey,
      tabList,
      collapse,
      menuWidth,
      theme,
      isShowNotice,
      noticeRef,
      visibleNotice,
      handleSettingsClick,
      outLogin,
      tabsClick,
      userName,
      goPath
    }
  }
}
</script>

<style lang="scss" scoped>
.tap-bar {
  display: flex;
  justify-content: space-between;
  position: fixed;

  width: 100%;
  top: 0;
  right: 0;
  z-index: 1;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.16);
  height: $top-bar-height;
  line-height: $top-bar-height;
  transition: all 0.3s ease-in-out;
  box-sizing: border-box;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  // background-color: rgba(22, 93, 255, 1);

  .theme-dark {
    background-color: $theme-menu-dark-color;
  }

  .theme-light {
    background-color: $theme-menu-color;
  }

  .left-logo {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: $menu-left-shrink-width;
    height: $top-bar-height;
    background-color: $theme-menu-dark-color;
    transition: all 0.3s ease-in-out;

    .logo-big {
      width: 207px;
      height: 30px;
      transition: opacity 1s ease-in-out;
    }
  }

  .tabs {
    flex: 1;

    .arco-menu-light {
      background: none;

      .arco-menu-item {
        color: #fff;
        background: none;

        &:hover {
          background: none;
        }
      }
    }

    .arco-menu-horizontal .arco-menu-item:not(:first-child) {
      margin-left: 44px;
    }

    .arco-menu-light .arco-menu-item.arco-menu-selected {
      color: #fff;

      :deep(.arco-menu-selected-label) {
        border-radius: 2px 2px 0 0;
        bottom: -12px;
        background-color: #fff;
      }
    }

    margin-left: 50px;

    .a-tabs {
      :deep(.arco-tabs-nav)::before {
        display: none;
      }

      :deep(.arco-tabs-content) {
        display: none;
      }

      :deep(.arco-tabs-tab) {
        min-width: 120px;
        height: 100%;
        justify-content: center;
        text-align: center;
        font-size: 16px;
        background: none;
        border: none;
        margin-left: 0;
        padding-left: 16px !important;
        color: #fff;
      }
    }
  }

  .right-info {
    display: flex;
    align-items: center;
    justify-content: space-between;

    min-width: 125px;
    max-width: 150px;

    height: $top-bar-height;

    .right-icon {
      width: 42px;
      min-width: 42px;
      height: $top-bar-height;
      font-size: 18px;
      text-align: center;
      color: #fff;

      &:hover {
        cursor: pointer;
        background-color: rgba(24, 144, 255, 0.1);

        .arco-icon {
          color: #fff;
        }
      }

      :deep(.arco-badge-number) {
        top: -4px;
        right: 1px;
      }
    }

    .right-user {
      flex: 1;
      width: 0;
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
        font-size: 14px;
        color: #fff;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>
