<!--
 * @Author: shwado shd_cn@163.com
 * @Date: 2024-04-27 21:17:39
 * @Description: 高级筛选
-->
<template>
    <div class="advanced-search">
        <el-form ref="form" :inline="true" :model="formInline">
            <el-form-item label="下单日期" prop="value1">
                <el-date-picker v-model="formInline.value1" type="daterange" range-separator="-" start-placeholder="开始时间" format="YYYY-MM-DD" value-format="YYYY-MM-DD" end-placeholder="结束时间" />
            </el-form-item>
            <el-form-item label="产品" prop="value2">
                <el-select v-model="formInline.value2" placeholder="请选择产品" style="width: 140px" clearable>
                    <el-option v-for="item in value2Options" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="订单号" prop="value3">
                <el-input v-model="formInline.value3" style="width: 240px" placeholder="请输入订单号" clearable />
            </el-form-item>
            <el-form-item label="下单人手机号" prop="value4">
                <el-input v-model="formInline.value4" style="width: 240px" placeholder="请输入下单人手机号" maxlength="11" clearable />
            </el-form-item>
            <el-form-item label="渠道" prop="value5">
                <el-select v-model="formInline.value5" placeholder="请选择渠道" style="width: 140px" clearable>
                    <el-option v-for="item in value5Options" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="下单方式" prop="value6">
                <el-select v-model="formInline.value6" placeholder="请选择下单方式" style="width: 140px" clearable>
                    <el-option v-for="item in value6Options" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="收款方式" prop="value7">
                <el-select v-model="formInline.value7" placeholder="请选择收款方式" style="width: 140px" clearable>
                    <el-option v-for="item in value7Options" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="状态" prop="value8">
                <el-select v-model="formInline.value8" placeholder="请选择状态" style="width: 140px" clearable>
                    <el-option v-for="item in value8Options" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="营销活动" prop="value9">
                <el-select v-model="formInline.value9" placeholder="请选择营销活动" style="width: 140px" clearable>
                    <el-option v-for="item in value9Options" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="活动名称" prop="value10">
                <el-input v-model="formInline.value10" style="width: 240px" placeholder="请输入活动名称" clearable />
            </el-form-item>
            <el-form-item label="支付流水号" prop="value11">
                <el-input v-model="formInline.value11" style="width: 240px" placeholder="请输入支付流水号" clearable />
            </el-form-item>
            <el-form-item label="车牌号" prop="value12">
                <el-input v-model="formInline.value12" style="width: 240px" placeholder="请输入车牌号" clearable />
            </el-form-item>
            <el-form-item label="开票状态" prop="value13">
                <el-select v-model="formInline.value13" placeholder="请选择开票状态" style="width: 140px" clearable>
                    <el-option v-for="item in value13Options" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="外部订单号" prop="value14">
                <el-input v-model="formInline.value14" style="width: 240px" placeholder="请输入外部订单号" clearable />
            </el-form-item>
            <el-form-item label="取票号" prop="value15">
                <el-input v-model="formInline.value15" style="width: 240px" placeholder="请输入取票号" clearable />
            </el-form-item>
            <el-form-item label="售票员" prop="value16">
                <el-select v-model="formInline.value16" placeholder="请选择售票员" style="width: 140px" clearable>
                    <el-option v-for="item in value16Options" :key="item.value" :label="item.label" :value="item.value" />
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
    value1: '',
    value2: '',
    value3: '',
    value4: '',
    value5: '',
    value6: '',
    value7: '',
    value8: '',
    value9: '',
    value10: '',
    value11: '',
    value12: '',
    value13: '',
    value14: '',
    value15: '',
    value16: '',
});

// 选项
const value2Options = [
    {
        value: '选项1',
        label: '黄金糕',
    },
    {
        value: '选项2',
        label: '双皮奶',
    },
];

const value5Options = [
    {
        value: '选项1',
        label: '黄金糕',
    },
    {
        value: '选项2',
        label: '双皮奶',
    },
];

const value6Options = [
    {
        value: '选项1',
        label: '黄金糕',
    },
    {
        value: '选项2',
        label: '双皮奶',
    },
];
const value7Options = [
    {
        value: '选项1',
        label: '黄金糕',
    },
    {
        value: '选项2',
        label: '双皮奶',
    },
];
const value8Options = [
    {
        value: '选项1',
        label: '黄金糕',
    },
    {
        value: '选项2',
        label: '双皮奶',
    },
];
const value9Options = [
    {
        value: '选项1',
        label: '黄金糕',
    },
    {
        value: '选项2',
        label: '双皮奶',
    },
];
const value13Options = [
    {
        value: '选项1',
        label: '黄金糕',
    },
    {
        value: '选项2',
        label: '双皮奶',
    },
];

const value16Options = [
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
