<template>
  <div class="right-icon" @click="visibleNotice">
    <a-badge :count="9" class="notice-btn">
      <render-icon icon="icon-notification"></render-icon>
    </a-badge>

    <!--提示框-->
    <notice v-show="isShowNotice" ref="noticeRef" :show="isShowNotice" />
  </div>
</template>
<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import Notice from '@/components/notice/Notice'
// 弹框ref属性
const noticeRef = ref()
// 是否显示弹框
const isShowNotice = ref(false)
// 显示弹框
const showNoticeFunc = show => {
  noticeRef.value.showNoticeFunc(show)
}

const visibleNotice = () => {
  showNoticeFunc(true)
}

// 关闭通知弹框
const bodyCloseNotice = e => {
  if (isShowNotice.value && e.target.className.indexOf('notice-btn') === -1) {
    isShowNotice.value = false
    showNoticeFunc(false)
  }
}

onMounted(() => {
  document.addEventListener('click', bodyCloseNotice)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', bodyCloseNotice) // 销毁事件
})
</script>
<style scoped lang="scss"></style>
