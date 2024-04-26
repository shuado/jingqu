<!--
 * @Author: shwado shd_cn@163.com
 * @Date: 2024-04-26 19:58:03
 * @Description:
-->
<template>
    <div class="basic-container" :style="styleName" :class="{ 'basic-container--block': block }">
        <el-card class="basic-container__card">
            <slot></slot>
        </el-card>
    </div>
</template>

<script>
export default {
    name: 'BasicContainer',
    props: {
        radius: {
            type: [String, Number],
            default: 10,
        },
        background: {
            type: String,
        },
        block: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        styleName() {
            return {
                borderRadius: `${this.radius}px`,
                background: this.background,
            };
        },
    },
};
</script>

<style lang="scss">
.basic-container {
    padding: 0px 32px;
    box-sizing: border-box;

    &--block {
        height: 100%;
        .basic-container__card {
            height: 100%;
        }
    }

    &__card {
        width: 100%;
    }

    &:first-child {
        padding-top: 0;
    }
}
</style>
