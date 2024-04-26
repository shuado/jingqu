<!--
 * @Author: shwado shd_cn@163.com
 * @Date: 2024-04-26 20:18:06
 * @Description:
-->
<!--
 * @Author: hll hanlonglong_job@163.com
 * @LastEditors: Please set LastEditors
 * @Description: 全局弹窗
-->
<template>
    <div v-loading="showLoading">
        <el-dialog
            v-model="dialogVisble"
            :width="width"
            :fullscreen="isFullscreen"
            :append-to-body="appendToBody"
            :center="center"
            :show-close="false"
            :destroy-on-close="destroyOnClose"
            :close-on-click-modal="false"
            class="custom-dialog"
            :class="{ fullscreen: isFullscreen }"
            draggable
            @closed="close"
        >
            <template #header="{ close }">
                <div class="dialog-top">
                    <div class="dialog-title">{{ title }}</div>
                    <div class="dialog-right">
                        <el-icon v-if="isCopy" class="screen-icon icon" :size="14">
                            <CopyDocument v-if="isFullscreen" @click="toggleFullscreen" />
                            <FullScreen v-else @click="toggleFullscreen" />
                        </el-icon>
                        <el-icon v-if="!showClose" class="icon"><Close @click="close" /></el-icon>
                    </div>
                </div>
            </template>
            <!-- 内容部分 -->
            <div ref="dialogContentRef" class="dialog-content">
                <slot></slot>
            </div>
            <!-- 底部按钮 -->
            <template #footer="{ close }">
                <div class="dialog-bottom">
                    <slot name="footer"></slot>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
const props = defineProps({
    // 标题
    title: {
        type: String,
        default: '',
    },
    // 当关闭 Dialog 时，销毁其中的元素
    destroyOnClose: {
        type: Boolean,
        default: false,
    },
    //显示
    visible: {
        type: Boolean,
        default: false,
    },
    // 是否全屏
    isFullscreen: {
        type: Boolean,
        default: false,
    },
    // 是否可以缩小
    isCopy: {
        type: Boolean,
        default: true,
    },
    // 宽度
    width: {
        type: String,
        default: '50%',
    },
    appendToBody: {
        type: Boolean,
        default: true,
    },
    // 遮罩层是否加载中状态
    showLoading: {
        type: Boolean,
        default: false,
    },
    // 标题是否居中
    center: {
        type: Boolean,
        default: false,
    },
    // 是否显示关闭icon
    showClose: {
        type: Boolean,
        default: false,
    },
});
const dialogVisble = ref(false);
const isFullscreen = ref(props.isFullscreen);
const dialogContentRef = ref(null);
/**
 * @Description: 是否全屏
 * @author: hll
 * @return {*}
 */
const toggleFullscreen = () => {
    isFullscreen.value = !isFullscreen.value;
};
const emit = defineEmits(['update:visible']);

// 关闭弹窗
const close = () => {
    console.log('close');
    emit('update:visible', false);
};
watch(
    () => props.visible,
    (newValue) => {
        dialogVisble.value = newValue;
    },
);
</script>
<style lang="scss">
.custom-dialog {
    max-height: calc(100% - 200px);
    display: flex;
    flex-direction: column;
    .el-dialog__header {
        padding: 0;
    }
    .el-dialog__body {
        padding: 20px 20px 5px 10px;
        flex: 1;
        box-sizing: border-box;
        /* overflow: hidden; */
        overflow-y: auto;
    }
    .el-dialog__footer {
        padding: 0;
    }
}
</style>

<style scoped lang="scss">
.dialog-content {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    /* overflow-y: auto; */
}
.custom-dialog {
    .dialog-top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px 0px 10px 20px;
        border-bottom: 1px solid var(--el-border-color-dark);
        .dialog-title {
            color: var(--el-text-color-primary);
            font-weight: 500;
            word-wrap: break-word;
        }
        .dialog-right {
            display: flex;
            justify-content: flex-end;
            cursor: pointer;
            .screen-icon {
                margin-right: 5px;
            }
            .icon {
                color: rgba($color: var(--el-border-color-dark), $alpha: 0.4);
            }
            .icon:hover {
                color: rgba($color: #7783f0, $alpha: 1);
            }
        }
    }
    .dialog-bottom {
        text-align: right;
        padding: 10px 16px;
        border-top: 1px solid var(--el-border-color-dark);
    }
}
</style>
