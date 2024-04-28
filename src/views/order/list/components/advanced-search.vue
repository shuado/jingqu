<!--
 * @Author: shwado shd_cn@163.com
 * @Date: 2024-04-27 21:17:39
 * @Description: 高级筛选
-->
<template>
    <div class="advanced-search">
        <el-form ref="form" :inline="true" :model="formInline">
            <el-form-item label="下单日期" prop="orderTime">
                <el-date-picker v-model="formInline.orderTime" type="daterange" range-separator="-" start-placeholder="开始时间" format="YYYY-MM-DD" value-format="YYYY-MM-DD" end-placeholder="结束时间" />
            </el-form-item>
            <el-form-item label="产品" prop="product">
                <el-select v-model="formInline.product" placeholder="请选择产品" style="width: 140px" clearable>
                    <el-option v-for="item in productOptions" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="订单号" prop="orderNum">
                <el-input v-model="formInline.orderNum" style="width: 240px" placeholder="请输入订单号" clearable />
            </el-form-item>
            <el-form-item label="下单人手机号" prop="ticketBuyerUserPhone">
                <el-input v-model="formInline.ticketBuyerUserPhone" style="width: 240px" placeholder="请输入下单人手机号" maxlength="11" clearable />
            </el-form-item>
            <el-form-item label="渠道" prop="channel">
                <el-select v-model="formInline.channel" placeholder="请选择渠道" style="width: 140px" clearable>
                    <el-option v-for="item in channelOptions" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="收款方式" prop="paymentMethod">
                <el-select v-model="formInline.paymentMethod" placeholder="请选择收款方式" style="width: 140px" clearable>
                    <el-option v-for="item in paymentMethodOptions" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="状态" prop="orderStatus">
                <el-select v-model="formInline.orderStatus" placeholder="请选择状态" style="width: 140px" clearable>
                    <el-option v-for="item in orderStatusOptions" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="营销活动" prop="marketingActivities">
                <el-select v-model="formInline.marketingActivities" placeholder="请选择营销活动" style="width: 140px" clearable>
                    <el-option v-for="item in marketingActivitiesOptions" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="活动名称" prop="activityName">
                <el-input v-model="formInline.activityName" style="width: 240px" placeholder="请输入活动名称" clearable />
            </el-form-item>
            <el-form-item label="支付流水号" prop="serialNum">
                <el-input v-model="formInline.serialNum" style="width: 240px" placeholder="请输入支付流水号" clearable />
            </el-form-item>
            <el-form-item label="开票状态" prop="invoiceStatus">
                <el-select v-model="formInline.invoiceStatus" placeholder="请选择开票状态" style="width: 140px" clearable>
                    <el-option v-for="item in invoiceStatusOptions" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="取票号" prop="ticketCollectionNum">
                <el-input v-model="formInline.ticketCollectionNum" style="width: 240px" placeholder="请输入取票号" clearable />
            </el-form-item>
        </el-form>
        <div style="width: 100%; text-align: right">
            <el-button type="primary" :icon="Search" @click="onSubmit">查询</el-button>
            <el-button :icon="Refresh" @click="onReset">清空</el-button>
        </div>
    </div>
</template>
<script setup>
import { Search, Refresh } from '@element-plus/icons-vue';
import { reactive } from 'vue';

// 数据
const formInline = reactive({
    orderTime: '',
    orderTimeStart: '',
    orderTimeEnd: '',
    product: '',
    orderNum: '',
    ticketBuyerUserPhone: '',
    channel: '',
    paymentMethod: '',
    orderStatus: '',
    marketingActivities: '',
    activityName: '',
    serialNum: '',
    invoiceStatus: '',
    ticketCollectionNum: '',
});
watch(
    () => formInline.orderTime,
    (val) => {
        if (val && val[0] && val[1]) {
            formInline.orderTimeStart = val[0] + ' 00:00:00';
            formInline.orderTimeEnd = val[1] + ' 23:59:59';
        } else {
            formInline.orderTimeStart = '';
            formInline.orderTimeEnd = '';
        }
    },
    {
        deep: true,
    },
);

// 选项
const productOptions = [
    {
        value: '选项1',
        label: '黄金糕',
    },
    {
        value: '选项2',
        label: '双皮奶',
    },
];

const channelOptions = [
    {
        value: '选项1',
        label: '黄金糕',
    },
    {
        value: '选项2',
        label: '双皮奶',
    },
];

const paymentMethodOptions = [
    {
        value: '选项1',
        label: '黄金糕',
    },
    {
        value: '选项2',
        label: '双皮奶',
    },
];
const orderStatusOptions = [
    {
        value: '选项1',
        label: '黄金糕',
    },
    {
        value: '选项2',
        label: '双皮奶',
    },
];
const marketingActivitiesOptions = [
    {
        value: '选项1',
        label: '黄金糕',
    },
    {
        value: '选项2',
        label: '双皮奶',
    },
];
const invoiceStatusOptions = [
    {
        value: '选项1',
        label: '黄金糕',
    },
    {
        value: '选项2',
        label: '双皮奶',
    },
];

const emit = defineEmits(['searchClick']);
const onSubmit = () => {
    if (formInline.orderTime && formInline.orderTime.length > 1) {
        formInline.orderTimeStart = formInline.orderTime[0];
        formInline.orderTimeEnd = formInline.orderTime[1];
    }
    emit('searchClick', formInline);
};

const form = ref(null);
const onReset = () => {
    form.value.resetFields();
};
</script>
<style lang="scss" scope>
.advanced-search {
    width: 100%;
    margin: 12px;
    height: fit-content;
    padding: 12px;
    box-sizing: border-box;
    border: 1px solid rgba(137, 137, 137, 0.5);
    border-radius: 8px;
    background-color: rgb(249, 249, 249);
}
</style>
