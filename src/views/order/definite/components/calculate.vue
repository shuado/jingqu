<!--
 * @Author: shwado shd_cn@163.com
 * @Date: 2024-04-28 13:48:03
 * @Description: 总数
-->
<template>
    <div class="calculate">
        <el-card class="box-card" shadow="hover">
            <template #header>
                <span class="card-title">总数</span>
            </template>
            <div class="box-content">
                <p>
                    <span>票价：</span>
                    <span class="data-num"> {{ totalData.fare }}</span>
                </p>
                <p>
                    <span>折后价：</span>
                    <span class="data-num">{{ totalData.discountedPrice }}</span>
                </p>
                <p>
                    <span>结算价：</span>
                    <span class="data-num">{{ totalData.settlementPrice }}</span>
                </p>
            </div>
        </el-card>
        <el-card class="box-card" shadow="hover">
            <template #header>
                <span class="card-title">本页统计</span>
            </template>
            <div class="box-content">
                <p>
                    <span>票价：</span>
                    <span class="data-num">{{ pageData.fare }}</span>
                </p>
                <p>
                    <span>折后价：</span>
                    <span class="data-num">{{ pageData.discountedPrice }}</span>
                </p>
                <p>
                    <span>结算价：</span>
                    <span class="data-num">{{ pageData.settlementPrice }}</span>
                </p>
            </div>
        </el-card>
    </div>
</template>
<script setup>
import { getTotal } from '@/api/order/definite.js';
let params = ref({});

const totalData = reactive({
    fare: 0,
    discountedPrice: 0,
    settlementPrice: 0,
});

const pageData = reactive({
    fare: 0,
    discountedPrice: 0,
    settlementPrice: 0,
});

const getData = () => {
    // getTotal(params.value).then(({ data: res }) => {
    //     pageData.fare = res.fare;
    //     pageData.discountedPrice = res.discountedPrice;
    //     pageData.settlementPrice = res.settlementPrice;
    // });

    getTotal({}).then(({ data: res }) => {
        totalData.fare = res.fare;
        totalData.discountedPrice = res.discountedPrice;
        totalData.settlementPrice = res.settlementPrice;
    });
};

defineExpose({
    getData,
    params,
    pageData,
});
</script>
<style lang="scss" scoped>
.calculate {
    width: calc(100% - 24px);
    margin: 12px;
    height: fit-content;
    box-sizing: border-box;
    // border: 1px solid rgba(137, 137, 137, 0.5);
    // border-radius: 8px;
    // background-color: rgb(249, 249, 249);
    display: flex;
    :deep(.el-card__header) {
        padding: 4px 12px;
    }
    :deep(.el-card__body) {
        padding: 8px 12px;
    }
    .box-card {
        margin-right: 12px;
        .card-title {
            font-size: 14px;
            font-weight: bold;
            color: var(--el-color-primary);
        }
        .data-num {
            font-size: 16px;
            color: var(--el-color-warning);
            font-weight: bold;
        }
        .box-content {
            display: flex;
            p {
                margin-right: 24px;
            }
        }
    }
}
</style>
