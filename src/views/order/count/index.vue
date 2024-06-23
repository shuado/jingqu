<!--
 * @Author: shwado shd_cn@163.com
 * @Date: 2024-04-25 13:56:53
 * @Description:
-->
<template>
    <div>
        <basic-container style="margin-bottom: 12px">
            <Seek @seek-click="search" />
        </basic-container>
        <basic-container v-loading="loading" style="margin-bottom: 12px">
            <div class="contaniner-com">
                <div class="tab-data">
                    <div v-for="item in tabData" :key="item.id" class="tab-data-item">
                        <img v-if="item.icon" :src="item.icon" />
                        <div class="text-item">
                            <div v-if="item.title" class="title-item">
                                {{ item.title }}
                                <el-tooltip v-if="item.questionMark" class="box-item" effect="dark" :content="item.questionMark" placement="right">
                                    <img src="../../../assets/img/order/6.png" />
                                </el-tooltip>
                            </div>
                            <div v-if="item.middleLeft || item.middlRight" class="middle-item">
                                <span v-if="item.middleLeft">{{ item.middleLeft == 'null' ? '-' : item.middleLeft }} </span>
                                <span v-if="item.middlRight">{{ item.middlRight == 'null' ? '-' : item.middlRight }}</span>
                            </div>
                            <div v-if="item.bottomLeft || item.bottomRight" class="bottom-item">
                                <span v-if="item.bottomLeft">{{ item.bottomLeft == 'null' ? '-' : item.bottomLeft }} </span>
                                <span v-if="item.bottomRight">{{ item.bottomRight == 'null' ? '-' : item.bottomRight }}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="tab-echart">
                    <base-charts :option="option" />
                </div>
            </div>
        </basic-container>
    </div>
</template>
<script setup>
import Seek from './components/seek.vue';
import BaseCharts from '@/components/base-charts/index.vue';
import { dayjs } from 'element-plus';

import { getData } from '@/api/order/count.js';

let data = ref({
    enterUserNum: null,
    inUserNum: null,
    lastEnterUserNum: null,
    lastOutUserNum: null,
    lastPaymentOrderNum: 0,
    lastPaymentPrice: 0,
    lastReceiptsPrice: 0,
    lastRefundAmount: 0,
    lastRefundsNum: 0,
    lastTicketsNum: 0,
    lastWriteOffNum: 0,
    lastWriteOffPrice: 0,
    outUserNum: null,
    paymentOrderNum: 0,
    paymentPrice: 0,
    receiptsPrice: 0,
    refundAmount: 0,
    refundsNum: 0,
    ticketsNum: 0,
    writeOffNum: 0,
    writeOffPrice: 0,
});

const loading = ref(false);

const getList = (params) => {
    loading.value = true;
    getData({ ...params })
        .then((res) => {
            data.value = res.data;
        })
        .finally(() => {
            loading.value = false;
        });
};

const search = (val) => {
    getList(val);
};

let tabData = ref([
    {
        id: 1,
        icon: new URL('../../../assets/img/order/1.png', import.meta.url).href,
        questionMark: '',
        title: '支付订单数',
        middleLeft: '',
        middlRight: data.value.paymentOrderNum + '',
        bottomLeft: '昨日：',
        bottomRight: data.value.lastPaymentOrderNum + '',
    },
    {
        id: 2,
        icon: '',
        questionMark: '',
        title: '支付金额（元）',
        middleLeft: '¥',
        middlRight: data.value.paymentPrice + '',
        bottomLeft: '昨日：',
        bottomRight: data.value.lastPaymentPrice + '',
    },
    {
        id: 5,
        icon: new URL('../../../assets/img/order/3.png', import.meta.url).href,
        questionMark: '',
        title: '核销票数',
        middleLeft: '',
        middlRight: data.value.writeOffNum + '',
        bottomLeft: '昨日：',
        bottomRight: data.value.lastWriteOffNum + '',
    },
    {
        id: 6,
        icon: '',
        questionMark: '注意：核销金额是未打折的门票销售价。',
        title: '核销金额（元）',
        middleLeft: '',
        middlRight: data.value.writeOffPrice + '',
        bottomLeft: '昨日：',
        bottomRight: data.value.lastWriteOffPrice + '',
    },
    {
        id: 7,
        icon: new URL('../../../assets/img/order/4.png', import.meta.url).href,
        questionMark: '',
        title: '退票数',
        middleLeft: '',
        middlRight: data.value.refundsNum + '',
        bottomLeft: '昨日：',
        bottomRight: data.value.lastRefundsNum + '',
    },
    {
        id: 8,
        icon: '',
        questionMark: '',
        title: '退票金额（元）',
        middleLeft: '',
        middlRight: data.value.refundAmount + '',
        bottomLeft: '昨日：',
        bottomRight: data.value.lastRefundAmount + '',
    },
    // {
    //     id: 9,
    //     icon: new URL('../../../assets/img/order/5.png', import.meta.url).href,
    //     questionMark: '',
    //     title: '景区入园人数',
    //     middleLeft: '',
    //     middlRight: data.value.enterUserNum + '',
    //     bottomLeft: '昨日:',
    //     bottomRight: data.value.lastEnterUserNum + '',
    // },
    // {
    //     id: 10,
    //     icon: '',
    //     questionMark: '',
    //     title: '景区出园人数',
    //     middleLeft: '',
    //     middlRight: data.value.outUserNum + '',
    //     bottomLeft: '昨日：',
    //     bottomRight: data.value.lastOutUserNum + '',
    // },
    // {
    //     id: 11,
    //     icon: '',
    //     questionMark: '景区在线人数 = 景区入园人数 - 景区出园人数',
    //     title: '景区在园人数',
    //     middleLeft: '',
    //     middlRight: data.value.inUserNum + '',
    //     bottomLeft: '',
    //     bottomRight: '',
    // },
]);

let option = ref({
    tooltip: {
        trigger: 'item',
    },
    legend: {
        top: '5%',
        left: 'center',
    },
    series: [
        {
            name: '渠道订单量',
            type: 'pie',
            radius: ['35%', '75%'],
            avoidLabelOverlap: false,
            itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 2,
            },
            label: {
                position: 'inner',
                formatter: '{c} \n (占比 {d}%)',
                textStyle: {
                    color: '#343434',
                    // fontWeight: 'bold',
                    fontSize: 14,
                },
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: 20,
                    fontWeight: 'bold',
                },
            },
            labelLine: {
                show: false,
            },
            data: [],
        },
    ],
});

watch(
    () => data.value,
    (newVal, oldVal) => {
        tabData.value = [
            {
                id: 1,
                icon: new URL('../../../assets/img/order/1.png', import.meta.url).href,
                questionMark: '',
                title: '支付订单数',
                middleLeft: '',
                middlRight: newVal.paymentOrderNum + '',
                bottomLeft: '昨日：',
                bottomRight: newVal.lastPaymentOrderNum + '',
            },
            {
                id: 2,
                icon: '',
                questionMark: '',
                title: '支付金额（元）',
                middleLeft: '¥',
                middlRight: newVal.paymentPrice + '',
                bottomLeft: '昨日：',
                bottomRight: newVal.lastPaymentPrice + '',
            },
            {
                id: 5,
                icon: new URL('../../../assets/img/order/3.png', import.meta.url).href,
                questionMark: '',
                title: '核销票数',
                middleLeft: '',
                middlRight: newVal.writeOffNum + '',
                bottomLeft: '昨日：',
                bottomRight: newVal.lastWriteOffNum + '',
            },
            {
                id: 6,
                icon: '',
                questionMark: '注意：核销金额是未打折的门票销售价。',
                title: '核销金额（元）',
                middleLeft: '',
                middlRight: newVal.writeOffPrice + '',
                bottomLeft: '昨日：',
                bottomRight: newVal.lastWriteOffPrice + '',
            },
            {
                id: 7,
                icon: new URL('../../../assets/img/order/4.png', import.meta.url).href,
                questionMark: '',
                title: '退票数',
                middleLeft: '',
                middlRight: newVal.refundsNum + '',
                bottomLeft: '昨日：',
                bottomRight: newVal.lastRefundsNum + '',
            },
            {
                id: 8,
                icon: '',
                questionMark: '',
                title: '退票金额（元）',
                middleLeft: '',
                middlRight: newVal.refundAmount + '',
                bottomLeft: '昨日：',
                bottomRight: newVal.lastRefundAmount + '',
            },
        ];

        console.log(newVal);
        option.value.series[0].data = newVal.channels.map((item) => {
            return {
                name: item.channelCn,
                value: item.channelOrderNum,
            };
        });
    },
    {
        deep: true,
    },
);
</script>
<style lang="scss" scoped>
.contaniner-com {
    width: 100%;
    height: fit-content;
    display: flex;

    .tab-data {
        width: 60%;
        height: fit-content;
        display: flex;
        flex-wrap: wrap;
        .tab-data-item {
            width: 25%;
            padding: 12px;
            box-sizing: border-box;
            height: 160px;
            // background-color: aliceblue;
            display: flex;
            align-items: center;
            .text-item {
                color: #666;
                margin-left: 12px;
                font-size: 12px;
                .title-item {
                    position: relative;
                    img {
                        width: 12px;
                        cursor: pointer;
                    }
                }
                .middle-item {
                    color: #333;
                    font-size: 24px;
                }
                .bottom-item {
                    color: #999;
                    font-size: 12px;
                }
            }
        }
    }
    .tab-echart {
        width: 40%;
        min-height: 100px;
    }
}
</style>
