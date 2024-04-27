<!--
 * @Author: shwado shd_cn@163.com
 * @Date: 2024-04-27 19:57:08
 * @Description: 
-->
<template>
    <el-row :gutter="20">
        <el-col :span="10">
            <el-radio-group v-model="seekData.value1">
                <el-radio-button label="今天" value="1" />
                <el-radio-button label="昨天" value="2" />
                <el-radio-button label="最近一周" value="3" />
                <el-radio-button label="最近一月" value="4" />
                <el-radio-button label="本周" value="5" />
                <el-radio-button label="本月" value="6" />
            </el-radio-group>
        </el-col>
        <el-col :span="6">
            <el-date-picker v-model="seekData.value2" type="daterange" range-separator="To" start-placeholder="开始时间" end-placeholder="结束时间" />
        </el-col>
        <el-col :span="6">
            <el-input v-model="seekData.value3" style="margin-left: 24px" placeholder="订单号">
                <template #append>
                    <el-button :icon="Search" />
                </template>
            </el-input>
        </el-col>
    </el-row>
</template>
<script setup>
import { Search } from '@element-plus/icons-vue';

const seekData = ref({
    value1: '',
    value2: '',
    value3: '',
});
</script>
