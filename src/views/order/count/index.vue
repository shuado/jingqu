<!--
 * @Author: shwado shd_cn@163.com
 * @Date: 2024-04-25 13:56:53
 * @Description:
-->
<template>
    <basic-container>
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
                        <span v-if="item.middleLeft">{{ item.middleLeft }} </span>
                        <span v-if="item.middlRight">{{ item.middlRight }}</span>
                    </div>
                    <div v-if="item.bottomLeft || item.bottomRight" class="bottom-item">
                        <span v-if="item.bottomLeft">{{ item.bottomLeft }} </span>
                        <span v-if="item.bottomRight">{{ item.bottomRight }}</span>
                    </div>
                </div>
            </div>
        </div>
    </basic-container>
</template>
<script setup>
let tabData = ref([
    {
        id: 1,
        icon: new URL('../../../assets/img/order/1.png', import.meta.url).href,
        questionMark: '',
        title: '支付订单数',
        middleLeft: '',
        middlRight: '56',
        bottomLeft: '昨日：',
        bottomRight: '12333',
    },
    {
        id: 2,
        icon: '',
        questionMark: '',
        title: '支付金额（元）',
        middleLeft: '¥',
        middlRight: '1068.00',
        bottomLeft: '昨日：',
        bottomRight: '12333',
    },
    {
        id: 3,
        icon: new URL('../../../assets/img/order/2.png', import.meta.url).href,
        questionMark: '',
        title: '实售票数',
        middleLeft: '',
        middlRight: '253',
        bottomLeft: '昨日：',
        bottomRight: '12333',
    },
    {
        id: 4,
        icon: '',
        questionMark: '',
        title: '实收金额（元）',
        middleLeft: '',
        middlRight: '795.00',
        bottomLeft: '昨日：',
        bottomRight: '12333',
    },
    {
        id: 5,
        icon: new URL('../../../assets/img/order/3.png', import.meta.url).href,
        questionMark: '',
        title: '核销票数',
        middleLeft: '',
        middlRight: '253',
        bottomLeft: '昨日：',
        bottomRight: '12333',
    },
    {
        id: 6,
        icon: '',
        questionMark: '注意：核销金额是未打折的门票销售价。',
        title: '核销金额（元）',
        middleLeft: '',
        middlRight: '795.00',
        bottomLeft: '昨日：',
        bottomRight: '12333',
    },
    {
        id: 7,
        icon: new URL('../../../assets/img/order/4.png', import.meta.url).href,
        questionMark: '',
        title: '退票数',
        middleLeft: '',
        middlRight: '253',
        bottomLeft: '昨日：',
        bottomRight: '12333',
    },
    {
        id: 8,
        icon: '',
        questionMark: '',
        title: '退票金额（元）',
        middleLeft: '',
        middlRight: '795.00',
        bottomLeft: '昨日：',
        bottomRight: '12333',
    },
    {
        id: 9,
        icon: new URL('../../../assets/img/order/5.png', import.meta.url).href,
        questionMark: '',
        title: '景区入园人数',
        middleLeft: '',
        middlRight: '253',
        bottomLeft: '昨日:',
        bottomRight: '12333',
    },
    {
        id: 10,
        icon: '',
        questionMark: '',
        title: '景区出园人数',
        middleLeft: '',
        middlRight: '795.00',
        bottomLeft: '昨日：',
        bottomRight: '12333',
    },
    {
        id: 11,
        icon: '',
        questionMark: '景区在线人数 = 景区入园人数 - 景区出园人数',
        title: '景区在园人数',
        middleLeft: '',
        middlRight: '795.00',
        bottomLeft: '',
        bottomRight: '',
    },
]);
</script>
<style lang="scss" scoped>
.tab-data {
    width: 100%;
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
</style>
