<!--
 * @Author: shwado shd_cn@163.com
 * @Date: 2024-04-27 19:57:08
 * @Description: 
-->
<template>
    <el-row :gutter="20">
        <el-col :span="8">
            <el-radio-group v-model="seekData.value1" @click="isExpand = false">
                <el-radio-button label="今天" value="1" />
                <el-radio-button label="昨天" value="2" />
                <el-radio-button label="最近一周" value="3" />
                <el-radio-button label="最近一月" value="4" />
                <el-radio-button label="本周" value="5" />
                <el-radio-button label="本月" value="6" />
            </el-radio-group>
        </el-col>
        <el-col :span="8">
            <el-date-picker v-model="seekData.value2" type="daterange" range-separator="-" start-placeholder="开始时间" format="YYYY-MM-DD" value-format="YYYY-MM-DD" end-placeholder="结束时间" @click="isExpand = false" @change="handleCheckChange" />
        </el-col>
        <el-col :span="6">
            <el-input v-model="seekData.value3" style="margin-left: 24px" placeholder="订单号" @click="isExpand = false">
                <template #append>
                    <el-button :icon="Search" @click="seekClick" />
                </template>
            </el-input>
        </el-col>
    </el-row>

    <el-row :gutter="20">
        <div class="seek-text">
            <div class="text-expand" @click="isExpand = !isExpand">
                <el-icon :class="isExpand ? 'icon-expand' : 'icon-expand_no'"><ArrowDown /></el-icon>
                <span> 高级查询 </span>
            </div>
        </div>
    </el-row>
    <el-row v-show="isExpand" :gutter="20">
        <slot />
    </el-row>
</template>
<script setup>
import { Search } from '@element-plus/icons-vue';
import { dayjs } from 'element-plus';

// 是否展开
const isExpand = ref(false);

// 值
const seekData = ref({
    value1: '',
    value2: '',
    value3: '',
});

watch(
    () => seekData.value.value1,
    (val) => {
        if (val) {
            switch (val) {
                case '1':
                    // 获取当前时间
                    seekData.value.value2 = [dayjs().format('YYYY-MM-DD 00:00:00'), dayjs().format('YYYY-MM-DD 23:59:59')];
                    break;

                case '2':
                    // 获取昨天时间
                    seekData.value.value2 = [dayjs().subtract(1, 'day').format('YYYY-MM-DD 00:00:00'), dayjs().subtract(1, 'day').format('YYYY-MM-DD  23:59:59')];
                    break;

                case '3':
                    // 获取最近一周时间
                    seekData.value.value2 = [dayjs().subtract(7, 'day').format('YYYY-MM-DD 00:00:00'), dayjs().subtract(1, 'day').format('YYYY-MM-DD   23:59:59')];
                    break;

                case '4':
                    // 获取最近一个月时间
                    seekData.value.value2 = [dayjs().subtract(30, 'day').format('YYYY-MM-DD 00:00:00'), dayjs().subtract(1, 'day').format('YYYY-MM-DD  23:59:59')];
                    break;
                case '5':
                    // 获取本周时间
                    seekData.value.value2 = [dayjs().day(1).format('YYYY-MM-DD 00:00:00'), dayjs().day(7).format('YYYY-MM-DD  23:59:59')];
                    break;
                case '6':
                    // 获取本月时间
                    seekData.value.value2 = [dayjs().startOf('month').format('YYYY-MM-DD 00:00:00'), dayjs().endOf('month').format('YYYY-MM-DD  23:59:59')];
                    break;
                default:
                    break;
            }
            deliverEmit();
        }
    },
);

const emit = defineEmits(['seekClick']);
const seekClick = () => {
    deliverEmit();
};

const handleCheckChange = () => {
    isExpand.value = false;
    seekData.value.value1 = '';
    deliverEmit();
};

const deliverEmit = () => {
    let orderTime = ['', ''];
    if (seekData.value.value2 && seekData.value.value2.length > 1) {
        orderTime = seekData.value.value2;
    }
    const params = {
        orderTimeStart: orderTime[0],
        orderTimeEnd: orderTime[1],
        orderNum: seekData.value.value3,
    };
    emit('seekClick', params);
};
defineExpose({
    isExpand,
    seekData,
});
</script>

<style scoped lang="scss">
.seek-text {
    width: 100%;
    padding: 8px 24px;
    .text-expand {
        float: right;
        display: flex;
        align-items: center;
        color: var(--el-color-primary);
        .icon-expand_no {
            cursor: pointer;
            margin-right: 4px;
            transition: all 0.3s;
        }
        .icon-expand {
            transition: all 0.3s;
            cursor: pointer;
            margin-right: 4px;
            transform: rotateX(180deg);
        }
        span {
            cursor: pointer;
        }
    }
}
</style>
