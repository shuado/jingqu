<!--
 * @Author: 舒 shd_cn@163.com
 * @Date: 2023-10-18 15:38:58
 * @Description: charts底座
-->
<template>
    <div id="base-chart">
        <div :id="baseChartDomName" :class="`base-chart_main_view`"></div>
    </div>
</template>

<script setup>
import { defaultsDeep } from 'lodash-es';

import charts from './plugin';
import { getUuid } from '@/utils/common-tools.js';
import useBaseOption from './hooks/useBaseOption';

const baseOption = useBaseOption();
const baseChartDomName = 'base-chart-main__' + getUuid(8);

const props = defineProps({
    option: {
        type: Object,
        require: true,
    },
});
let myChart;
onMounted(() => {
    myChart && myChart.dispose();
    myChart = charts.init(document.getElementById(baseChartDomName));
    updateView(props.option);
    // myChart.resize();
});

// 进行监听
watch(
    () => props.option,
    (newValue, oldValue) => {
        if (myChart) {
            updateView(newValue);
        }
    },
    {
        deep: true,
    },
);

/**
 * @description: 更新视图
 * @param {*} option
 * @return {*}
 * @author: 舒
 */
function updateView(option) {
    myChart.showLoading();
    const allOption = defaultsDeep({}, option, baseOption);
    myChart.clear();
    if (option && option.series.length) {
        myChart.hideLoading();
    }
    myChart.setOption(allOption, true, true);
}

onBeforeUnmount(() => {
    myChart.dispose();
});
</script>

<style scoped lang="scss">
#base-chart {
    min-width: 100px;
    min-height: 100px;
    width: 100%;
    height: 100%;
    position: relative;

    .base-chart_main_view {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
    }
}
</style>
