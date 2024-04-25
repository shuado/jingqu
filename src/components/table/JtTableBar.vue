<template>
  <div class="jt-table-bar">
    <div v-if="props.tools.indexOf('left') > -1" class="left">
      <slot name="left"></slot>
      <a-alert v-if="props.selectCount">
        已选择
        <span class="count">{{ props.selectCount }}</span>
        项
        <template #action>
          <a-button type="text" class="btnType" @click="handleEmptyClick">清空</a-button>
        </template>
      </a-alert>
    </div>
    <div v-if="props.tools.indexOf('center') > -1" class="center">
      <slot name="center"></slot>
    </div>
    <div v-if="props.tools.indexOf('right') > -1" class="right">
      <slot name="right">
        <a-input-search
          v-model.trim="name"
          :placeholder="props.placeholder"
          allow-clear
          @search="props.search"
          @clear="reset"
          @keyup.enter="props.search"
        />
      </slot>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
let props = defineProps({
  // 表格数据
  modelValue: {
    type: String,
    default: ''
  },

  // 使用的模块
  tools: {
    type: String,
    default: 'left, right'
  },

  // 搜索框的搜索事件
  search: {
    type: Function,
    default: () => {}
  },

  // 选中的数量
  selectCount: {
    type: Number || String,
    default: 0
  },
  // 选中的数量
  placeholder: {
    type: String,
    default: '模糊搜索'
  }
})
let emit = defineEmits(['update:modelValue', 'clear', 'handleEmptyClick'])
// 表格数据
let name = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})

// 输入框清空事件
const reset = () => {
  emit('clear')
}
const handleEmptyClick = () => {
  emit('handleEmptyClick')
}
</script>

<style lang="scss" scoped>
.jt-table-bar {
  display: flex;
  flex-flow: wrap;
  padding: 16px 0;

  .left,
  .center,
  .right {
    flex: 1;
  }

  .left {
    display: flex;

    .arco-alert {
      width: 300px;
      padding: 0 8px;
      margin-left: 24px;
      background-color: rgba(24, 144, 255, 0.047);
      border: 1px solid rgb(186, 231, 255);
      border-radius: 4px;

      :deep(.arco-alert-body) {
        flex: none;
        max-width: calc(100% - 80px);

        .arco-alert-content {
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;

          .count {
            color: #1890ff;
          }
        }
      }

      :deep(.arco-alert-action) {
        min-width: 32px;
        margin-right: 0;
      }
    }
  }

  .right {
    .arco-input-wrapper {
      width: 282px;
      float: right;
    }
  }
}
.btnType {
  padding: 0 4px !important;
  margin: 0;
  min-width: 40px;
}
</style>
