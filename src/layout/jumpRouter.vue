<template>
  <div class="jump-router">
    <router-view class="inside" />
  </div>
</template>

<script>
export default {
  name: 'JumpRouter'
}
</script>

<style lang="scss" scoped>
.jump-router {
  height: 100%;
  box-sizing: border-box;

  > div:first-child {
    width: 100%;
    height: inherit;
    min-height: calc(100vh - $top-bar-height - 48px);
    box-sizing: border-box;
    transition: all 0.3s ease-in-out;
    position: relative;
  }
}
</style>
