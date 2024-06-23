<!--
 * @Author: shwado shd_cn@163.com
 * @Date: 2024-04-27 19:57:08
 * @Description: 
-->
<template>
    <div class="seek-text">
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
            <el-col :span="8">
                <el-date-picker v-model="seekData.value2" :clearable="false" type="daterange" range-separator="-" start-placeholder="开始时间" format="YYYY-MM-DD" value-format="YYYY-MM-DD" end-placeholder="结束时间" @change="handleCheckChange" />
            </el-col>
        </el-row>
    </div>
</template>
<script setup>
import { dayjs } from 'element-plus';

// 值
const seekData = ref({
    value1: '',
    value2: '',
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
                    seekData.value.value2 = [dayjs().subtract(1, 'day').format('YYYY-MM-DD 00:00:00'), dayjs().subtract(1, 'day').format('YYYY-MM-DD 23:59:59')];
                    break;

                case '3':
                    // 获取最近一周时间
                    seekData.value.value2 = [dayjs().subtract(7, 'day').format('YYYY-MM-DD 00:00:00'), dayjs().subtract(1, 'day').format('YYYY-MM-DD 23:59:59')];
                    break;

                case '4':
                    // 获取最近一个月时间
                    seekData.value.value2 = [dayjs().subtract(30, 'day').format('YYYY-MM-DD 00:00:00'), dayjs().subtract(1, 'day').format('YYYY-MM-DD 23:59:59')];
                    break;
                case '5':
                    // 获取本周时间
                    seekData.value.value2 = [dayjs().day(1).format('YYYY-MM-DD 00:00:00'), dayjs().day(7).format('YYYY-MM-DD 23:59:59')];
                    break;
                case '6':
                    // 获取本月时间
                    seekData.value.value2 = [dayjs().startOf('month').format('YYYY-MM-DD 00:00:00'), dayjs().endOf('month').format('YYYY-MM-DD 23:59:59')];
                    break;
                default:
                    break;
            }
            deliverEmit();
        }
    },
);

onMounted(() => {
    // 默认选中
    seekData.value.value1 = '1';
});

const emit = defineEmits(['seekClick']);

const handleCheckChange = () => {
    seekData.value.value1 = '';
    seekData.value.value2[0] = seekData.value.value2[0] + ' 00:00:00';
    seekData.value.value2[1] = seekData.value.value2[1] + ' 23:59:59';
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
    };
    emit('seekClick', params);
};
defineExpose({
    seekData,
});
</script>

<style scoped lang="scss">
.seek-text {
    width: calc(100% - 24px);
    padding: 8px 24px;
    margin: 12px;
    height: fit-content;
    padding: 12px;
    box-sizing: border-box;
    border: 1px solid rgba(137, 137, 137, 0.5);
    border-radius: 8px;
    background-color: rgb(249, 249, 249);
}
</style>
