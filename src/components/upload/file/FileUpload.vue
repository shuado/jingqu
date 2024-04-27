<template>
    <a-upload action="/">
        <template v-if="custom" #upload-button>
            <div class="custom-upload">
                <img src="@/assets/img/upload.png" alt="" />
                <p><slot name="use"></slot></p>
                <span><slot name="limit"></slot></span>
            </div>
        </template>
    </a-upload>
</template>

<script>
export default {
    props: {
        // 是否使用自定义上传样式
        custom: {
            type: Boolean,
            default: false,
        },
    },
};
</script>

<style lang="scss" scoped>
:deep(.arco-btn-primary) {
    border: 1px solid rgb(229, 230, 235);
    background-color: #ffffff;
    color: #333333;
}
.custom-upload {
    width: 397px;
    height: 174px;
    background: rgb(245, 248, 251);
    border-radius: 4px;
    border: 2px dashed rgb(16, 142, 233);
    text-align: center;
    padding: 30px 0;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    & > img {
        width: 44px;
        height: 44px;
        margin-bottom: 10px;
    }
    & > span {
        color: rgba(0, 0, 0, 0.447);
    }
}
</style>
