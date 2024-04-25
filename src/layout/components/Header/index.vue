<template>
  <div class="tap-bar">
    <Logo />
    <!--一级导航-->
    <TabNav />
    <!--右侧头像等-->
    <div class="right-info">
      <Avatar />
    </div>
  </div>
</template>

<script setup>
import TabNav from './components/TabNav.vue'
import Logo from './components/Logo.vue'
import Avatar from './components/Avatar.vue'
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
  background-color: $theme-dark-color;

  .right-info {
    display: flex;
    align-items: center;
    min-width: 1.5rem;
    max-width: 3rem;
    height: $top-bar-height;
  }
}

@media only screen and (max-width: $device-notebook) {
  .tap-bar {
    .tabs {
      flex: 1;
      .tabs-list {
        :deep(.arco-tabs-nav-type-line) {
          .arco-tabs-tab {
            margin-left: 0.7rem;
          }
        }
      }
    }

    .right-info {
      min-width: 2rem;
      margin-left: 1.2rem;
    }
  }
}

@media only screen and (min-width: 2000px) {
  .tap-bar {
    .tabs {
      flex: 1;
    }
  }
}
</style>
