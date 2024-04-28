<!--
 * @Author: shwado shd_cn@163.com
 * @Date: 2024-04-27 21:52:46
 * @Description: 
-->
<!--
 * @Author: shwado shd_cn@163.com
 * @Date: 2024-04-27 21:17:39
 * @Description: 高级筛选
-->
<template>
    <div class="advanced-search">
        <el-form ref="form" :inline="true" :model="formInline">
            <el-form-item label="退票日期" prop="value1">
                <el-date-picker v-model="formInline.refundTime" type="daterange" range-separator="-" start-placeholder="开始时间" format="YYYY-MM-DD" value-format="YYYY-MM-DD" end-placeholder="结束时间" />
            </el-form-item>

            <el-form-item label="订单号" prop="orderNum">
                <el-input v-model="formInline.orderNum" style="width: 240px" placeholder="请输入订单号" clearable />
            </el-form-item>
            <el-form-item label="票号" prop="ticketCollectionNum">
                <el-input v-model="formInline.ticketCollectionNum" style="width: 240px" placeholder="请输入票号" clearable />
            </el-form-item>
            <el-form-item label="退款号" prop="refundNum">
                <el-input v-model="formInline.refundNum" style="width: 240px" placeholder="请输入退款号" clearable />
            </el-form-item>
            <el-form-item label="渠道" prop="channel">
                <el-select v-model="formInline.channel" placeholder="请选择渠道" style="width: 140px" clearable>
                    <el-option v-for="item in channelOptions" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
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
    refundTime: '',
    refundTimeStart: '',
    refundTimeEnd: '',
    orderNum: '',
    ticketCollectionNum: '',
    refundNum: '',
    channel: '',
});
watch(
    () => formInline.refundTime,
    (val) => {
        if (val && val[0] && val[1]) {
            formInline.refundTimeStart = val[0] + ' 00:00:00';
            formInline.refundTimeEnd = val[1] + ' 23:59:59';
        } else {
            formInline.refundTimeStart = '';
            formInline.refundTimeEnd = '';
        }
    },
    {
        deep: true,
    },
);

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

const emit = defineEmits(['searchClick']);
const onSubmit = () => {
    if (formInline.refundTime && formInline.refundTime.length > 1) {
        formInline.refundTimeStart = formInline.refundTime[0];
        formInline.refundTimeEnd = formInline.refundTime[1];
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
    margin: 12px;
    width: 100%;
    height: fit-content;
    padding: 12px;
    box-sizing: border-box;
    border: 1px solid rgba(137, 137, 137, 0.5);
    border-radius: 8px;
    background-color: rgb(249, 249, 249);
    margin-bottom: 16px;
}
</style>
