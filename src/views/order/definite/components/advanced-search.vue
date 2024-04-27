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
            <el-form-item label="游玩日期" prop="value2">
                <el-date-picker v-model="formInline.value2" type="daterange" range-separator="-" start-placeholder="开始时间" format="YYYY-MM-DD" value-format="YYYY-MM-DD" end-placeholder="结束时间" />
            </el-form-item>
            <el-form-item label="核销日期" prop="value3">
                <el-date-picker v-model="formInline.value3" type="daterange" range-separator="-" start-placeholder="开始时间" format="YYYY-MM-DD" value-format="YYYY-MM-DD" end-placeholder="结束时间" />
            </el-form-item>
            <el-form-item label="退款日期" prop="value4">
                <el-date-picker v-model="formInline.value5" type="daterange" range-separator="-" start-placeholder="开始时间" format="YYYY-MM-DD" value-format="YYYY-MM-DD" end-placeholder="结束时间" />
            </el-form-item>
            <el-form-item label="产品类型" prop="value5">
                <el-select v-model="formInline.value5" placeholder="请选择产品类型" style="width: 140px" clearable>
                    <el-option v-for="item in value5Options" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="售票员" prop="value6">
                <el-select v-model="formInline.value6" placeholder="请选择售票员" style="width: 140px" clearable>
                    <el-option v-for="item in value6Options" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="渠道" prop="value7">
                <el-select v-model="formInline.value7" placeholder="请选择渠道" style="width: 140px" clearable>
                    <el-option v-for="item in value7Options" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="收款方式" prop="value8">
                <el-select v-model="formInline.value8" placeholder="请选择收款方式" style="width: 140px" clearable>
                    <el-option v-for="item in value8Options" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="订单状态" prop="value9">
                <el-select v-model="formInline.value9" placeholder="请选择订单状态" style="width: 140px" clearable>
                    <el-option v-for="item in value9Options" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="门票状态" prop="value10">
                <el-select v-model="formInline.value10" placeholder="请选择门票状态" style="width: 140px" clearable>
                    <el-option v-for="item in value10Options" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="分销商" prop="value11">
                <el-select v-model="formInline.value11" placeholder="请选择分销商" style="width: 140px" clearable>
                    <el-option v-for="item in value11Options" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="产品" prop="value12">
                <el-select v-model="formInline.value12" placeholder="请选择产品" style="width: 140px" clearable>
                    <el-option v-for="item in value12Options" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </el-form-item>

            <el-form-item label="订单号" prop="value13">
                <el-input v-model="formInline.value13" style="width: 240px" placeholder="请输入订单号" clearable />
            </el-form-item>
            <el-form-item label="票号" prop="value14">
                <el-input v-model="formInline.value14" style="width: 240px" placeholder="请输入票号" clearable />
            </el-form-item>
            <el-form-item label="游客姓名" prop="value15">
                <el-input v-model="formInline.value15" style="width: 240px" placeholder="请输入游客姓名" clearable />
            </el-form-item>
            <el-form-item label="下单人手机号" prop="value16">
                <el-input v-model="formInline.value16" style="width: 240px" placeholder="请输入下单人手机号" maxlength="11" clearable />
            </el-form-item>
            <el-form-item label="绑定卡号" prop="value17">
                <el-input v-model="formInline.value17" style="width: 240px" placeholder="请输入绑定卡号" maxlength="32" clearable />
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
    value17: '',
});

// 选项
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
const value10Options = [
    {
        value: '选项1',
        label: '黄金糕',
    },
    {
        value: '选项2',
        label: '双皮奶',
    },
];
const value11Options = [
    {
        value: '选项1',
        label: '黄金糕',
    },
    {
        value: '选项2',
        label: '双皮奶',
    },
];

const value12Options = [
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
