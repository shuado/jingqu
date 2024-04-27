<!--
 * @Author: shwado shd_cn@163.com
 * @Date: 2024-04-27 19:57:08
 * @Description: 
-->
<template>
    <el-row :gutter="20">
        <el-col :span="8">
            <el-radio-group v-model="seekData.value1">
                <el-radio-button label="今天" value="1" />
                <el-radio-button label="昨天" value="2" />
                <el-radio-button label="最近一周" value="3" />
                <el-radio-button label="最近一月" value="4" />
                <el-radio-button label="本周" value="5" />
                <el-radio-button label="本月" value="6" />
            </el-radio-group>
        </el-col>
        <el-col :span="8">
            <el-date-picker v-model="seekData.value2" type="daterange" range-separator="-" start-placeholder="开始时间" format="YYYY-MM-DD" value-format="YYYY-MM-DD" end-placeholder="结束时间" @change="handleCheckChange" />
        </el-col>
        <el-col :span="6">
            <el-input v-model="seekData.value3" style="margin-left: 24px" placeholder="订单号">
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
        <div class="seek-slot">
            <slot />
        </div>
    </el-row>
</template>
<script setup>
import { Search } from '@element-plus/icons-vue';
import { dayjs } from 'element-plus';

// 是否展开
const isExpand = ref(false);

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
            emit('seekClick', seekData.value);
        }
    },
);

const emit = defineEmits(['seekClick']);
const seekClick = () => {
    emit('seekClick', seekData.value);
};

const handleCheckChange = () => {
    seekData.value.value1 = '';
    emit('seekClick', seekData.value);
};
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
.seek-slot {
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
